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
  let alarmOn = false;

  function turnOff() {
    if (alarmOn) {
      console.log('turning off');
      piezo.off();
      led.off();
      alarmOn = false;
    }
  }

  temperature.on('data', function() {
    if (this.celsius > 50) {
      if (!buttonPressed && !alarmOn) {
        console.log('turning on');
        alarmOn = true;
        piezo.frequency(587, 1000000);
        led.on();
      }
    } else {
      turnOff();
      if (buttonPressed) {
        console.log('temp < 50, canceling button-mode');
        buttonPressed = false;
      }
    }
  });

  button.on('press', () => {
    buttonPressed = true;
    turnOff();
  });
});
