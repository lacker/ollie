'use strict';

let Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", module: "cylon-ble" }
  },

  connectBLE: function(peripheral) {
    console.log('connectBLE', peripheral);
    if (this.connected) {
      return;
    }

    this.bluetooth.connectPeripheral(peripheral.uuid, peripheral, () => {
      console.log(peripheral.advertisement.localName, peripheral.uuid);
      this.connected = true;
      this.device('blething', {
        connection: 'bluetooth',
        driver: 'ble-device-information'
      });
      this.startDevice(this.devices.blething, () => {
        this.devices.blething.getManufacturerName((err, data) => {
          if (err) {
            console.log('error: ', err);
            return;
          }
          console.log('data: ', data);
        });
      });
    });
  },

  work: function(my) {
    this.connected = false;

    console.log('waiting to discover bluetooth connections...');

    my.connections.bluetooth.on('discover', (peripheral) => {
      my.connectBLE(peripheral);
    });
  }
}).start();
