var ds = require('./sqliteDb'); 
var schema = require('./schema');

var database = {};

database.init = (callback) => {
	ds.init(callback); 
}

database.addEntry = (entry, callback) => {
	ds.addEntry(entry, callback); 
}

module.exports = database; 