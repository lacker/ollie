'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let temperature = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  });

  let piezo = new five.Piezo(9);
  let led = new five.Led(13);
  let button = new five.Button(5);
  
  let buttonPressed = false;

  temperature.on('data', function() {
    if (this.celsius > 50) {
      console.log('temp > 50');
      if (!buttonPressed) {
        console.log('piezo on');
        piezo.play({
          song: 'C E G E C E G E',
          tempo: 100,
        });
        led.on();
      }
    } else {
      console.log('temp < 50');
      buttonPressed = false;
      console.log('piezo off');
      piezo.off();
      led.off();
    }
  });

  button.on('press', () => {
    buttonPressed = true;
    console.log('piezo off');
    piezo.off();
    led.off();
  });
});
