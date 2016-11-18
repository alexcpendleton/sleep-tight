var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

var menubar = require('menubar');
var HardcodedMenuProvider = require('./HardcodedMenuProvider.js');
var SleepModeSleeper = require('./sleepers/SleepModeSleeper.js')
var mb = menubar({});

mb.on('ready', function ready () {
  console.log('app is ready')
  // Don't actually show a window
  //mb.showWindow = mb.hideWindow;
  var sleeper = new SleepModeSleeper();
  var menuProvider = new HardcodedMenuProvider(sleeper);

  mb.tray.setContextMenu(menuProvider.buildMenu());

})