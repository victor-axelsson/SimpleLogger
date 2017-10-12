var schema = {};

/**
	Schemas are created at the bottom of this file.
*/

var getEntriesTable = function() {
    var sql = " CREATE TABLE IF NOT EXISTS entries ( ";
    sql += "id INTEGER PRIMARY KEY NOT NULL, ";
    sql += "namespace TEXT NOT NULL, ";
    sql += "key TEXT NOT NULL, ";
    sql += "val TEXT NOT NULL, ";
    sql += "created_at DATETIME DEFAULT CURRENT_TIMESTAMP "; 
    sql += "); ";
    return sql;
};

/**
* @author Victor Axelsson
* This create schema is highly bound to the documented database schema for the application. 
* It will return the create clauses for the tables with the database structure. 
*/
schema.create = function() {
    var sql = "";
    sql += getEntriesTable();
    
    return sql;
}


module.exports = schema; 