var express = require('express'),
    app = express(),
    cors = require('cors');


//var flash = require('connect-flash');
//var cookieParser = require('cookie-parser'),session = require('cookie-session');
var bodyParser = require('body-parser');
//var GLOBAL = require('./global.js');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws_config.json');

var moisture = [];
var temp = [];
var uv = [];

app.use(bodyParser.json());
app.use(cors());

var dataRecord = require('./dataRecord.js');
var MOISTRUE = new dataRecord('MOISTRUE');
var TEMP = new dataRecord('TEMP');
var UV = new dataRecord('UV');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/moisture/record', function (req, res) {
    //console.log(req.body);
    MOISTRUE.push(req.body.stat);
    res.send('moisture recorded!');
    console.log(new Date().getTime());
});

app.post('/temp/record', function (req, res) {
    //console.log(req.body);
    TEMP.push(req.body.stat);
    res.send('temp recorded!');
     console.log(new Date().getTime());
});
app.post('/uv/record', function (req, res) {
    //console.log(req.body);
    UV.push(req.body.stat);
    res.send('uv recorded!');
     console.log(new Date().getTime());
});
app.get('/moisture/read/10', function (req, res) {
    //console.log(req.body);
    MOISTRUE.list(10, function (err, results) {
        if (!err) {
            res.send(results);
        }
    });
});

app.get('/temp/read/10', function (req, res) {
    //console.log(req.body);
    TEMP.list(10, function (err, results) {
        if (!err) {
            res.send(results);
        }
    });
});

app.get('/uv/read/10', function (req, res) {
    //console.log(req.body);
    UV.list(10, function (err, results) {
        if (!err) {
            res.send(results);
        }
    });
});

app.get('/water', function (req, res) {
    res.send(100);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);

});