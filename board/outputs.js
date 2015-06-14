module.exports = function(_config) {
    var LEDBar = require("jsupm_my9221");
    var groveSensor = require('jsupm_grove');
    this._relay = new groveSensor.GroveRelay(_config.digitalRelayPin);
    this._ledBar = new LEDBar.MY9221(_config.digitalLEDBarPin, _config.digitalLEDBarClockPin);
    this._directionBool = true;
    this._barLevel = 0;

    this.incrementLED = function()
    {
        if (this._barLevel <10)
        {
            this._ledBar.setBarLevel(++this._barLevel, this._directionBool);
        }
    };
    
    this.decrementLED = function()
    {
        if (this._barLevel >0)
        {
            this._ledBar.setBarLevel(--this._barLevel, this._directionBool);
        }
    };
    
    this.rampUpLed = function(self, interval)
    {
        self.incrementLED();
        if (self._barLevel < 10)
            setTimeout(self.rampUpLed, interval, self, interval);
    };
    
    this.rampDownLed = function(self, interval)
    {
        self.decrementLED();
        if (self._barLevel > 0)
            setTimeout(self.rampDownLed, interval, self, interval);
    };
    
    this.turnRelayOn = function()
    {
        if (this._relay.isOff())
            this._relay.on();
        this.rampUpLed(this, 25);
    };
    
    this.turnRelayOff = function()
    {
        if (this._relay.isOn())
            this._relay.off();
        this.rampDownLed(this, 25);
    };
    
    this.isRelayOn = function()
    {
        return this._relay.isOn();
    };
    
    this.printHi = function()
    {
        console.log('outputs shibe checking in!');
    };

};