"use strict";
const NanoTimer = require("nanotimer");

class NanoTimerTimer {
  constructor() {
    this.activeTimer = new NanoTimer();
    this.startNew = this.startNew.bind(this);
    this.stopActive = this.stopActive.bind(this);
    this._onTick = this._onTick.bind(this);
  }
  startNew(opts) {
    this.stopActive();
    this.remainingMilliseconds = opts.milliseconds;
    var x = this;
    this.activeTimer.setTimeout(
      function() {
        opts.callback();
        x.stopActive();
      },
      "",
      opts.milliseconds + "m"
    );
    var intervalText = opts.tickInterval + "m";
    this.activeTimer.setInterval(
      function() {
        x._onTick(opts);
      },
      "",
      intervalText
    );
    return this.activeTimer;
  }
  stopActive() {
    this.activeTimer.clearTimeout();
    this.activeTimer.clearInterval();
  }
  _onTick(opts) {
    this.remainingMilliseconds -= opts.tickInterval;
    opts.onTick(this.remainingMilliseconds);
  }
}
module.exports = NanoTimerTimer;
