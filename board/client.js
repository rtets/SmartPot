module.exports = function(args) {
    this._http=require('http');
    this._http.globalAgent.maxSockets = 100;
    this._hostname = '192.168.50.158';
    this._moistureEndpoint = '/moisture/record';
    this._tempEndpoint = '/temp/record';
    this._uvEndpoint = '/uv/record';
    
    this.doSubmit = function (input, host, endpoint) { 
        var stat = {stat: input};    
        var data = JSON.stringify(stat);    
        
        var options = {
              hostname: host,
              port: 3000,
              path: endpoint,
              method: 'POST',
              //body: 'stat:' + stat,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length 
              }
            };
                        
            var req = this._http.request(options, function(res) {
                console.log('POST RESULT: ' + options.hostname + options.path + ' - stat=' + stat.stat);
                res.resume();
            });
        
            req.end(data);
    };
        
    this.submitMoisture = function(stat) { 
            this.doSubmit(stat, this._hostname, this._moistureEndpoint);
        };
        
    this.submitTemp = function(stat) { 
            this.doSubmit(stat, this._hostname, this._tempEndpoint);
        };

    this.submitUv = function(stat) { 
            this.doSubmit(stat, this._hostname, this._uvEndpoint);
        };
    
    this.printHi = function()
    {
        console.log('hi!');
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