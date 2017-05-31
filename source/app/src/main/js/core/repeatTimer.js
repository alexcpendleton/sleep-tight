'use strict'
const Repeat = require('repeat');

class RepeatTimer {
  constructor() {
    this.activeTimer = null;
    this.tickInterval = 1000;
    this.timeoutClearer = clearTimeout;
    this.activeInterval = null;
    this.intervalClearer = clearInterval;
    this.ticks = 0;

    this.remainingMilliseconds = 0;

    this.startNew = this.startNew.bind(this);
    this.stopActive = this.stopActive.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this._onTick = this._onTick.bind(this);
    this.onTick = this.onTick.bind(this);
  }
  startNew(callback, milliseconds) {
    this.stopActive();

    this.activeInterval = this.startInterval();
    this.remainingMilliseconds = milliseconds;

    this.activeTimer = Repeat(this._onTick);
    this.activeTimer
      .every(this.tickInterval, 'ms')
      .for(milliseconds, 'ms')
      .start.now()
      .then(
        function onSuccess(){callback()},
        function onFailure(){},
        function onProgress(){});

    this.timeoutClearer = function() { };
    this.intervalClearer = function() { };

    return this.activeTimer;
  }
  stopActive() {
    if(this.activeTimer && this.activeTimer.pause) {
      try {
        this.activeTimer.pause();
      } catch(ignoreThis){}
    }
  }
  startInterval() { }
  _onTick() {
    this.remainingMilliseconds -= this.tickInterval;
    
    this.onTick(this.remainingMilliseconds);
    if(this.remainingMilliseconds <= 0) {
      this.stopActive();
    }
  }
  onTick(){}
}
module.exports = RepeatTimer;
