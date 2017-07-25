/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
var elog = require('electron-log');
elog.info('Hello, log');
import { app, BrowserWindow } from 'electron';
const MainThreadReceiver = require('./core/mainThreadReceiver.js');
let mainWindow;


var unhandled = require('electron-unhandled');
unhandled();
console.log("env:", process.env.NODE_ENV, process.env.DEBUG_PROD);

if (process.env.NODE_ENV === 'production') {
  //const sourceMapSupport = require('source-map-support');
  //sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

var hasBeenSetup = false;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function initMenubar() {
	var menubar = require('menubar');
	var IconResolver = require('./core/IconResolver.js');

	var iconPath = new IconResolver(process.platform).resolve();

	var dimensions = getWindowDimensions();
	
  elog.warn("before mb.showWindow")
	var mb = menubar({
		dir:__dirname,
		icon:iconPath,
		preloadWindow:true,
		width: dimensions.width, 
		height: dimensions.height,
    index:`file://${__dirname}/app.html`
  });
  
  elog.warn("after mb.showWindow")
	mb.on('ready', function ready () {
		console.log('app is ready');
	});
	mb.on('after-show', function afterShow() {
		if(hasBeenSetup) return;

		if(process.env.NODE_ENV === 'development') {
			// Open the DevTools.
			mb.window.webContents.openDevTools();
		}
		hasBeenSetup = true;
  });
  mainWindow=mb;
  return mb;
}


/**
 * Add event listeners...
 */
function setupSignaling() {
	new MainThreadReceiver().setup();
}
function getWindowDimensions() {
		if(process.env.NODE_ENV === 'development') {
			return {width: 1024, height: 768};
		}
		return {width:280, height:240};
}

app.on('ready', async () => {
  elog.warn("app.on(ready)")
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  const menubar = initMenubar();
  setupSignaling();
});

elog.warn("elog end")