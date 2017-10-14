var ds = require('./sqliteDb'); 
var schema = require('./schema');

var database = {};

database.init = (callback) => {
	ds.init(callback); 
}

database.addEntry = (entry, callback) => {
	ds.addEntry(entry, callback); 
}

database.getAllEntries = (callback) => {
	ds.getAllEntries(callback); 
}

database.getAllNamespaces = (callback) => {
	ds.getAllNamespaces(callback)
}

database.getEntriesByNamespace = (namspace, callback) => {
	ds.getEntriesByNamespace(namspace, callback)
}

module.exports = database; 