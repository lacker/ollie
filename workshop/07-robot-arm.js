'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let pot = new five.Sensor('A2');
  let servo = new five.Servo(9);

  pot.on('data', function() {
    // this.value is in the range 0-1023
    // servo angle should be in 0-179
    let angle = five.Fn.map(this.value, 0, 1023, 0, 179);
    servo.to(angle);
  });
});
