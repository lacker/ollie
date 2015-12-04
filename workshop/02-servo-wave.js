'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let servo = new five.Servo(9);
  servo.sweep();

  board.wait(3000, () => {
    servo.stop();
    servo.center();
  });
});
