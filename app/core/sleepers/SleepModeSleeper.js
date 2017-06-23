var sleepmode = require('sleep-mode');

class SleepModeSleeper {
  constructor() {
  }
  sleepNow() {
    try {
      console.log("sleepNow");
      sleepmode(function (err, stderr, stdout) {
          /* At least on a Mac, stderr gives a message of
          'Sleeping now...' but it's not actually a problem. */
          if(err) {
            console.log('err: ', err);
          }
          if(stderr) {
            console.log('stderr: ', stderr);
          }
          if (!err && !stderr) {
              console.log(stdout);
          }
      });
    } catch (caughtError) {
      console.log(caughtError);
    }
  }
}
module.exports = SleepModeSleeper;
