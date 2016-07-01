var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbConnection = require('./dbConfig/dbConfig');
var BookRoute = require('./routes/books');
var port = 8080;

mongoose.connect(dbConnection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/books', BookRoute);

app.get('/', function( req, res ){
    res.send('Happy to be here');
});

app.listen( port, function(){
    console.log("***********************************************************************");
    console.log( "Server listening on port : " + port );
    console.log("***********************************************************************");
});