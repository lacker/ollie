'use strict';

let dnode = require('dnode');
let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let temperature = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  });

  let info = {celsius: 0};

  temperature.on('data', function() {
    info.celsius = this.celsius;
  });

  let server = dnode({
    getTemperature: (callback) => {
      callback(info.celsius);
    }});
  server.listen(1337);
});
