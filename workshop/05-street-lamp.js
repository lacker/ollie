'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let sensor = new five.Sensor('A0');
  let led = new five.Led(9);
  
  sensor.on('change', function() {
    if (this.value > 600) {
      led.on();
    } else {
      led.off();
    }
  });
});
