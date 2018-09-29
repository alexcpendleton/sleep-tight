const ipcMain = require('electron').ipcMain;
const SleepModeSleeper = require('./sleepers/SleepModeSleeper');
const PowerOffPowerSwitcher = require('./powerOffPowerSwitcher');
const Commands = require('./commands');

class MainThreadReceiver {
  constructor() {
    this.main = ipcMain;
    this.commands = new Commands();
    this.sleeper = new SleepModeSleeper();
    this.powerSwitch = new PowerOffPowerSwitcher();

    this.invokeSleeper = this.invokeSleeper.bind(this);
    this.invokePowerSwitch = this.invokePowerSwitch.bind(this);
  }
  setup() {
    this.main.on(this.commands.sleep, this.invokeSleeper);
    this.main.on(this.commands.shutdown, this.invokePowerSwitch);
  }
  invokeSleeper() {
    this.sleeper.sleepNow();
  }
  invokePowerSwitch() {
    this.powerSwitch.powerOff();
  }
}
module.exports = MainThreadReceiver;
