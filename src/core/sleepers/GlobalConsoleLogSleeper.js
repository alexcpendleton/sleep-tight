'use strict';

class GlobalConsoleLogSleeper {
  constructor() {}
  sleepNow() {
    console.log("Pseudo going to sleep now.");
  }
  sleepIn(milliseconds) {
    console.log(`Pseudo going to sleep after '${milliseconds}' milliseconds.`);
  }
}
module.exports = GlobalConsoleLogSleeper;
