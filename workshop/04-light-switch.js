'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let button = new five.Button(5);
  let led = new five.Led(9);

  button.on('press', () => {
    led.toggle();
  });
});
