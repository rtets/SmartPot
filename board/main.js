GLOBAL.deviceId = '6a-ae-18-12-3a-59'
GLOBAL.analogLightComponentName = "analogLight";
GLOBAL.moistureComponentName = "moisture";

console.log('Initialising...');
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var client = require('./client.js');
var sercli = new client();
sercli.printHi();
    
var grove_moisture = require('jsupm_grovemoisture');
var myMoistureObj = new grove_moisture.GroveMoisture(0);
    
var groveSensor = require('jsupm_grove');
var light = new groveSensor.GroveLight(1);
var temp = new groveSensor.GroveTemp(2);


function takeAnalogLightReading()
{
    return light.value();
}

function takeTempReading()
{
    return temp.value();
}

function takeMoistureReading()
{
	return parseInt(myMoistureObj.value());
}

function submitReadingData()
{
    var lightReading = takeAnalogLightReading();
    var moistureReading = takeMoistureReading();
    var tempReading = takeTempReading();
    
    console.log('submitting moisture: ' + moistureReading + '  temp: ' + tempReading + '  and light: ' + lightReading);
    
    sercli.submitUv(lightReading);
    console.log('submitted light');
    sercli.submitMoisture(moistureReading);
    console.log('submitted moisture');
    sercli.submitTemp(tempReading);
    console.log('submitted temp');
}

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});

    
//this.http=require('http');
setInterval(submitReadingData, 1000);