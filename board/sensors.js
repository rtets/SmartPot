module.exports = function(_config) {
    var grove_moisture = require('jsupm_grovemoisture');
    var myMoistureObj = new grove_moisture.GroveMoisture(_config.analogMoisturePin);
    
    var groveSensor = require('jsupm_grove');
    var light = new groveSensor.GroveLight(_config.analogLightPin);
    var temp = new groveSensor.GroveTemp(_config.analogTempPin);

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