var express = require('express');
var bodyParser = require('body-parser');

//Start up and init the database
var db = require('./database')
db.init(() => {
	console.log("DB is initialized")
});

var cors = require('cors'); 
var v1 = require('./v1/'); 

var app = express();
app.use(bodyParser.json({limit: '50mb'})); 
app.use(cors()); 
app.use(v1); 

app.use(express.static(__dirname + '/public'));

app.listen(3000); 
