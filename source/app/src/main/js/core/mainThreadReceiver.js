var ipcMain = require('electron').ipcMain;
var SleeperFacade = require('./sleepers/GlobalConsoleLogSleeper');
//var SleeperFacade = require('./sleepers/SleepModeSleeper');
var PowerOffPowerSwitcher = require('./powerOffPowerSwitcher')
var Commands = require('./commands');

class MainThreadReceiver {
  constructor() {
    this.main = ipcMain;
    this.commands = new Commands();
    this.sleeper = new SleeperFacade();
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