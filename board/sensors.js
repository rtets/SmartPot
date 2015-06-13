module.exports = function(args) {
    var grove_moisture = require('jsupm_grovemoisture');
    var myMoistureObj = new grove_moisture.GroveMoisture(0);
    
    var groveSensor = require('jsupm_grove');
    var light = new groveSensor.GroveLight(1);
    var temp = new groveSensor.GroveTemp(2);

    this.takeAnalogLightReading = function ()
    {
        return light.value();
    }

    this.takeTempReading = function ()
    {
        return temp.value();
    };

    this.takeMoistureReading = function()
    {
        return parseInt(myMoistureObj.value());
    };
    
    this.takeAllReadings = function ()
    {
        return {
            moisture: parseInt(myMoistureObj.value()),
            temp: temp.value(),
            light: light.value()
        };
    };
    
    this.printHi = function()
    {
        console.log('sensors shibe checking in!');
    };
};