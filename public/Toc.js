var React = require('react');
var {Link, RouteHandler} = require('react-router');

var Toc = React.createClass({
	statics: {
		// this one will callen before render
		// "params" is object of router params. In this case {}
		// cb(err, asyncProps) awating for erorr or async props
		// asyncProps will be merged with original props into single object
		// and will be accessable via this.props.*
		loadProps(params, cb) {
			fetch('https://nodejs.org/api/index.json')
				.then(res => res.json())
				.then(data => {
					// this.props.data in "render" function
					cb(null, {data: data});
				});
		}
	},

	render: function() {
		var items = this.props.data.desc.filter(function (item) {
			return item.type === 'text';
		});

		return <div>
			<div className="col-md-4" ><ul>
				{items.map(function (item) {
					return <li>
						<Link to={'/toc/' + item.text}>{item.text}</Link>
					</li>;
				})}
			</ul></div>
			<div className="col-md-4">
				{this.props.children}
			</div>
		</div>;

	}

});

module.exports = Toc;
