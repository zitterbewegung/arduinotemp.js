var influx = require('influx')

var client = influx({

  //cluster configuration
  /*hosts : [
    {
      host : 'localhost',
      port : 8086, //optional. default 8086
      protocol : 'http' //optional. default 'http'
    }
  ],*/
  // or single-host configuration
  host : 'localhost',
  port : 8086, // optional, default 8086
  protocol : 'http', // optional, default 'http'
  username : 'jherman',
  password : 'arduinotemp',
  database : 'arduinotemp.js'
})
var five = require("johnny-five");

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
  var multiplexer = new Multiplexer({
    pins: [ 18, 19, 20, 21 ],
    io: this.io
  });
  multiplexer.select(6);
    this.io.analogRead(4, function(rawT) {
	
      console.log((rawT * 450 / 512 ) - 58);
      //write a single point, providing a Date object. Precision is set to default 'ms' for milliseconds.
	client.writePoint(info.series.name, {time: new Date(), value: ((rawT * 450 / 512 ) - 58) }, null,  done)

  });
});
