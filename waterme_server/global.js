//var crypto = require('crypto');
var GLOBAL = {
    ORIGINS: ['http://localhost:9000', 'http://127.0.0.1:9000', 'http://192.168.1.70:9000',
              'http://hellouni.mobi', 'http://glaamb.azurewebsites.net', 'http://gla.hellouni.mobi', 'http://hellouni.mobi'],
    USERTABLE: 'GLA-AmbUser',
    PROFILE_PICTURE_BUCKET: 'gla-amb',
    S3_CACHE_BUCKET: 'gla-cache',
    validateDataField: function (required) {
        return function (req, res, next) {
            function fail() {
                res.json({
                    err: 'Missing required field'
                });
            }
            console.log('validating request body');
            if (req.body) {
                var data = req.body;
            } else {
                fail();
            }

            var objLength = Object.keys(required).length;
            var validated = 0;
            //console.log(required);
            //console.log(Object.keys(data));
            for (var name in required) {
                if (Object.keys(data).indexOf(name) > -1) {
                    //console.log('found');
                    validated++;
                    if (validated == objLength) {
                        next();
                    }
                    continue;
                } else {
                    //console.log('not found');
                    fail();
                }
            }
        }
    }
//    ,
//    doCipher: function (str) {
//        var cipher = crypto.createCipher('aes-256-cbc', 'Y-O-Y-U');
//        cipher.update(str, 'utf8', 'base64');
//        return cipher.final('base64');
//    },
//
//    doDecipher: function (str) {
//        var decipher = crypto.createDecipher('aes-256-cbc', 'Y-O-Y-U');
//        decipher.update(str, 'base64', 'utf8');
//        return decipher.final('utf8');
//    }
}

module.exports = GLOBAL;