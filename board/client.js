module.exports = function(args) {
    this._http=require('http');
    this._fs=require('fs');
    var _config = require('./config.json');
    
    this._hostname = _config.host;
    this._port = _config.port;
    this._http.globalAgent.maxSockets = _config.http_globalAgent_maxSockets;
    this._moistureEndpoint = _config.moistureEndpoint;
    this._tempEndpoint = _config.tempEndpoint;
    this._uvEndpoint = _config.uvEndpoint;
    
    console.log(JSON.stringify(_config));
    
    this.doSubmit = function (input, endpoint) { 
        var stat = {stat: input};    
        var data = JSON.stringify(stat);    
        
        var options = {
              hostname: this._hostname,
              port: this._port,
              path: endpoint,
              method: 'POST',
              //body: 'stat:' + stat,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length 
              }
            };
                        
        var req = this._http.request(options, function(res) {
            
            if (res.statusCode != 200)
            {
                console.log('oops! response: ' + res.statusCode);
            }   
        
            res.resume();
            
        });
        
        try{
            req.end(data);
        }
        catch (e)
        {
            req.abort();
        }
        
        
    };
        
    this.submitMoisture = function(stat) { 
            this.doSubmit(stat, this._moistureEndpoint);
        };
        
    this.submitTemp = function(stat) { 
            this.doSubmit(stat, this._tempEndpoint);
        };

    this.submitUv = function(stat) { 
            this.doSubmit(stat, this._uvEndpoint);
        };
    
    this.printHi = function()
    {
        console.log('client shibe checking in!');
    };
};


/*
var http=require('http');
var client = 
    function(args) {
        this.hostname = 'http://192.168.50.158';
        this.moistureEndpoint = '/moisture/record';
        this.tempEndpoint = '/temp/record';
        this.uvEndpoint = '/uv/record';

        this.doSubmit = function(stat, host, endpoint) { 
            var options = {
              hostname: this.hostname,
              port: 3000,
              path: endpoint,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            };
            
            var postData ={
                'stat' : stat
                };
            
            var req = http.request(options, function(res) {
                console.log('POST RESULT: ' + options.hostname + options.endpoint + ' - stat=' + options.stat);
            });
        }
        
        this.submitMoisture = function(stat) { 
            doSubmit(stat, this.hostname, this.moistureEndpoint);
        }
        
        this.submitTemp = function(stat) { 
            doSubmit(stat, this.hostname, this.tempEndpoint);
        }

        this.submitUv = function(stat) { 
            doSubmit(stat, this.hostname, this.uvEndpoint);
        }
    }
}

*/