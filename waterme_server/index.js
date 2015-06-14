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
var MOISTURE = new dataRecord('MOISTURE');
var TEMP = new dataRecord('TEMP');
var UV = new dataRecord('UV');

var pumpOn = false;


var msg=['I am thirsty','What a nice day'];
var msgFlag=0;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/moisture/record', function (req, res) {
    //console.log(req.body);
    MOISTURE.push(req.body.stat);
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

app.get('/all/read/10', function (req, res) {
    //console.log(req.body);
    var results = {};
    getUV();
    function getUV() {
        UV.list(10, function (err, data) {
            if (!err) {
                results.uv = data;
                getMoisture();
            }
        });
    }

    function getMoisture() {
        MOISTURE.list(10, function (err, data) {
            if (!err) {
                results.moisture = data;
                getTemp();
            }
        });
    }

    function getTemp() {
        TEMP.list(10, function (err, data) {
            if (!err) {
                results.temp = data;
                 getMsg();
            }
        });
    }
    function getMsg(){
        results.msg=msg[msgFlag];
        sendData(results);
    }
    function sendData(){
        res.send(results);
    }

});


app.get('/moisture/read/10', function (req, res) {
    //console.log(req.body);
    MOISTURE.list(10, function (err, results) {
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

app.get('/pump', function (req, res) {
    res.send(pumpOn);
    if (pumpOn) {
        pumpOn = false;
    }
});


app.get('/pump/on', function (req, res) {
    pumpOn = true;
    console.log('turn on the pump');
    res.send(pumpOn);
}); 

app.get('/pump/toggle', function (req, res) {
    pumpOn = !pumpOn;
    res.send(pumpOn);
});


app.get('/msg/', function (req, res) {
    res.send(msg[msgFlag]);
});

app.get('/msg/switch', function (req, res) {
    msgFlag=msgFlag+1;
    if(msgFlag>=msg.length){
        msgFlag=0;
    }
    res.send(msgFlag);
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);

});