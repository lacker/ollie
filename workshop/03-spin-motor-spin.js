'use strict';

let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let motor = new five.Motor(9);
  
  function loop() {
    motor.start(200);
    board.wait(2000, () => {
      motor.stop();
      board.wait(1000, loop);
    });
  }

  loop();
});
