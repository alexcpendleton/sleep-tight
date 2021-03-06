import { app, BrowserWindow } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";
import { Initializer } from "./core/initializer";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: "react-hmr" });

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    radii: [0, 0, 0, 0]
  });

  const indexPath = `file://${__dirname}/index.html`;
  const iconPath = `${__dirname}/resources/icons`;
  let openDevTools = false;
  let openAutomatically = false;
  let alwaysOnTop = false;
  let big = false;
  const debugFlag = false;

  if (debugFlag) {
    openDevTools = true;
    openAutomatically = true;
    alwaysOnTop = true;
    big = true;
  }
  const initializer = new Initializer({
    mainWindow,
    isDevMode,
    indexPath,
    iconPath,
    app,
    openDevTools,
    alwaysOnTop,
    big
  });
  initializer.initialize();
  if (openAutomatically) {
    initializer.mb.showWindow();
  }

  const installDevTools = openDevTools;
  // Open the DevTools.
  if (installDevTools) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    // mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
