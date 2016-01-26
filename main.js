var five = require("johnny-five");
//Create statsd and initialize for telegraf.
//Using default settings for ports.
var StatsD = require('hot-shots'),
    client = new StatsD({telegraf: true});
//Below code from
//https://github.com/rwaldron/johnny-five/issues/181
var board = new five.Board();

function Multiplexer(options) {
  this.pins = options.pins;
  this.io = options.io;

  // Setup these "analog" pins as digital output.
  this.io.pinMode(this.pins[0], this.io.MODES.OUTPUT);
  this.io.pinMode(this.pins[1], this.io.MODES.OUTPUT);
  this.io.pinMode(this.pins[2], this.io.MODES.OUTPUT);
  this.io.pinMode(this.pins[3], this.io.MODES.OUTPUT);
}

Multiplexer.prototype.select = function(channel) {
  this.io.digitalWrite(this.pins[0], channel & 1 ? this.io.HIGH : this.io.LOW);
  this.io.digitalWrite(this.pins[1], channel & 2 ? this.io.HIGH : this.io.LOW);
  this.io.digitalWrite(this.pins[2], channel & 4 ? this.io.HIGH : this.io.LOW);
  this.io.digitalWrite(this.pins[3], channel & 8 ? this.io.HIGH : this.io.LOW);
};

board.on("ready", function() {
  //Set sampling interval to 1 second.
  this.samplingInterval(1000);  
  var multiplexer = new Multiplexer({
    pins: [ 18, 19, 20, 21 ],
    io: this.io
  });
  multiplexer.select(6);
    this.io.analogRead(4, function(rawT) {
	
	console.log((rawT * 450 / 512 ) - 58);
	//var temp = ;
	// Gauge: Gauge a stat by a specified amount.
	//Inserts temperature to telegraf as a gauge.
	//Wait every second
	client.gauge('temperature', ((rawT * 450 / 512 ) - 58));

	
  });
});
