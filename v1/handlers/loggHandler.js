var logHandler = {};
var logEntryModel = require('../models/logEntry'); 
var db = require('../../database')

logHandler.addLog = (req, res) => {

	logEntryModel.build(req.body, (err, entry) => {
		if(err){
			res.status(400).send({
				status: 400, 
				message: err
			}); 
		}else{
			db.addEntry(entry, (_err, _res) => {
				if(_err) throw _err; 

				res.status(200).send({
					status: 200, 
					message: "Entry added"
				});
			})
		}
	}); 
}


logHandler.getEntryFromNamespace = (req, res) => {
	db.getEntriesByNamespace(req.params.namespace, (err, entries) => {
		if(err) throw err; 

		res.status(200).send(entries)
	});
}


module.exports = logHandler; 