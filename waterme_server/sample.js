var http = require('http');

var HOST = 'http://192.168.50.158';
var postData = {
    'stat': 123
};

var endpoint = '/moisture/record';
//var endpoint= '/temp/record';
//var endpoint= '/uv/record';


var options = {
    hostname: HOST,
    port: 3000,
    path: endpoint,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
});



//get
http.get(HOST + '/water', function (res) {
    console.log("Got response: " + res.statusCode);
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
});