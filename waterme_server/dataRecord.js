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
    }).limit(10).exec(callback);
}

module.exports=dataRecord;