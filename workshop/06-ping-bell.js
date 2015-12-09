'use strict';

let dgram = require('dgram');
let five = require('johnny-five');
let board = new five.Board();

board.on('ready', () => {
  let piezo = new five.Piezo(8);
  let socket = dgram.createSocket('udp4');

  socket.bind(1337);
  
  socket.on('message', (msg, rinfo) => {
    piezo.play({
      song: 'C E G E C E G E',
      tempo: 100,
    });
  });
});
