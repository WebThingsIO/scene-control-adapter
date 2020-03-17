/**
 *
 * SceneControlAdapter - an adapter for controlling multiple devices.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const {Adapter, Database, Device, Event} = require('gateway-addon');
const manifest = require('./manifest.json');

class SceneControlDevice extends Device {
  constructor(adapter, config) {
    super(adapter, `scene-controller`);

    this.name = 'Scene Controller';

    for (const scene of config.scenes) {
      this.addAction(scene, {title: scene});
      this.addEvent(scene, {title: scene});
    }
  }

  performAction(action) {
    action.start();
    this.eventNotify(new Event(this, action.name));
    action.finish();
    return Promise.resolve();
  }
}

class SceneControlAdapter extends Adapter {
  constructor(addonManager) {
    super(addonManager, manifest.id, manifest.id);
    addonManager.addAdapter(this);

    const db = new Database(manifest.id);
    db.open().then(() => {
      return db.loadConfig();
    }).then((config) => {
      this._device = new SceneControlDevice(this, config);
      this.handleDeviceAdded(this._device);
    }).catch(console.error);
  }

  startPairing() {
    if (!this.devices.hasOwnProperty(this._device.id)) {
      this.handleDeviceAdded(this._device);
    }
  }
}

module.exports = (addonManager) => {
  new SceneControlAdapter(addonManager);
};
