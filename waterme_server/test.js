var http = require('http');
http.globalAgent.maxSockets = 100;
var HOST = 'http://192.168.50.158';
var postData = {
    "stat": 123
};

var endpoint = '/moisture/record';
//var endpoint= '/temp/record';
//var endpoint= '/uv/record';
var i=1;
setInterval(makeTheRequest,1000);

function makeTheRequest() {
    console.log('makeTheRequest '+i);
    i++;
    var stringData = JSON.stringify({
        "stat": 123
    });
    var options = {
        host: '192.168.50.158',
        port: 3000,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': stringData.length
        }
    };

    var req = http.request(options, function (res) {
        //console.log('STATUS: ' + res);
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(stringData);
    req.end();
    
}