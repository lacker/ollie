'use strict';

let noble = require('noble');

noble.on('stateChange', (state) => {
  console.log('noble state =', state);
  if (state != 'poweredOn') {
    return;
  }
  
  noble.startScanning();
});

noble.on('discover', (peripheral) => {
  let localName = peripheral.advertisement.localName;
  console.log('discovered', localName, peripheral.id);

  if (localName !== '2B-12F4') {
    // Not an Ollie
    console.log('ignoring the', localName);
    return;
  }

  // We found our Ollie so we're done scanning
  noble.stopScanning();
});
