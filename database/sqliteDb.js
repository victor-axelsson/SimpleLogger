var sqlite = {}; 
var env = require('../env'); 
var schema = require('./schema');
var sqlite3 = require('sqlite3')

var db = new sqlite3.Database(env.DATABASE_PATH + 'logger.sqlite3', function() {
    db.run('PRAGMA foreign_keys=on');
});

var initialized = false; 

var getDB = function(callback) {
    if (!initialized) {

        sqliteDataSource.init(callback);
        initialized = true;
    } else {
        callback();
    }
}

var runQuery = function(query) {
    getDB(function() {
        db.serialize(query);
        return;
    });
}

sqlite.init = function(callback) {

    db.serialize(function() {
        console.log("Running create scripts");

        var createTables = schema.create();
        db.exec(createTables);
        initialized = true; 
        callback();

        return;
    });
}

sqlite.addEntry = (entry, callback) => {
	runQuery(function() {
        var stmt = db.prepare("INSERT INTO entries (namespace, key, val) VALUES (?,?,?)");
        stmt.run(entry.namespace, entry.key, entry.val)
        stmt.finalize(callback);
    });
}

sqlite.getAllEntries = (callback) => {
    runQuery(function() {
        db.all("SELECT * from entries", callback);
    });
}

sqlite.getAllNamespaces = (callback) => {
    runQuery(function() {
        db.all("SELECT DISTINCT namespace from entries", callback);
    });
}

sqlite.getEntriesByNamespace = (namespace, callback) => {
    console.log(namespace)
    runQuery(function() {
        db.all("SELECT * FROM entries WHERE namespace LIKE ?", namespace + "%", callback);
    });
}

module.exports = sqlite;