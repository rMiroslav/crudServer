var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var app     = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// //connect to db
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/users');

app.use('/_api', require('./app/routes/users'));

app.listen(port, function(){
    console.log('Running on port: 3000');
})