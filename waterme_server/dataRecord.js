var Datastore = require('nedb');
var dataRecord = function (name) {
    this.db = new Datastore({
        filename: name.toString(),
        autoload: true
    });
    this.name=name;
}

dataRecord.prototype.push = function (reading) {
    var doc = {
        stat: reading,
        datetime: new Date().getTime()
    };
    this.db.insert(doc);
}
dataRecord.prototype.list = function (num,callback) {
    this.db.find({}).sort({
        datetime: -1
    }).limit(num).exec(function(err,docs){
        var results=[];
        //console.log(docs);
        for(i=0;i<docs.length;i++){
            results.push(docs[i].stat);
            if(i==(docs.length-1)){
                callback(err,results);
            }
        }
       
    });
}

dataRecord.prototype.getLatest = function (num,callback) {
    this.db.find({}).sort({
        datetime: -1
    }).limit(1).exec(function(err,docs){
         callback(err,docs[0].stat);   
    });
}
module.exports=dataRecord;