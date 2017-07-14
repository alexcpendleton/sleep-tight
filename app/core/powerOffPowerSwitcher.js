class PowerOffPowerSwitcher {
  constructor() {
    this.switch = require('power-off');
  }
  powerOff() {
    console.log("powering off");
    this.switch((err, stderr, stdout)=>{
      console.log(arguments);
    });
  }
}
module.exports = PowerOffPowerSwitcher;