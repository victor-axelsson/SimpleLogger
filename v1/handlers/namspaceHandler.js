var db = require('../../database')

var namespaceHandler = {};

namespaceHandler.getAllNamespaces = (req, res) => {
	db.getAllNamespaces((err, entries) => {
		if(err) throw err; 

		var formatted = {};

		var into = (pts, obj) => {
			var key = pts.shift();

			if(!key){
				return {};
			}

			if(!obj[key]){
				obj[key] = {}
			}

			obj[key] = into(pts, obj[key]); 

			return obj;
		}

		entries.forEach((entry) => {
			formatted = into(entry.namespace.split("/"), formatted);
		})

		res.status(200).send(formatted)
	});
}

module.exports = namespaceHandler; 
