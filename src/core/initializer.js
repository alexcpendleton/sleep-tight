import MainThreadReceiver from "./mainThreadReceiver";
import menubar from "menubar";
import IconResolver from "./IconResolver";
import { MainMenu } from "./mainMenu";

export class Initializer {
  constructor({
    mainWindow,
    isDevMode,
    indexPath,
    iconPath,
    big,
    app,
    openDevTools
  }) {
    this.mainWindow = mainWindow;
    this.isDevMode = isDevMode || false;
    this.receiver = new MainThreadReceiver();
    this.hasBeenSetup = false;
    this.indexPath = indexPath;
    this.iconPath = iconPath;
    this.big = big || false;
    this.app = app;
    this.openDevTools = openDevTools || false;
  }
  initialize() {
    this.hideMainWindow();
    this.mb = this.initMenubar();
    this.setupSignaling();
    this.setupMainMenu(this.mb);
  }
  hideMainWindow() {
    if (this.mainWindow) {
      this.mainWindow.hide();
    }
  }
  setupSignaling() {
    this.receiver.setup();
  }
  setupMainMenu(mb) {
    const mm = new MainMenu(this.app, mb.tray);
    mm.initialize();
  }
  getWindowDimensions() {
    if (this.big) {
      return { width: 1024, height: 768 };
    }
    return { width: 280, height: 180 };
  }

  initMenubar() {
    const iconPath = new IconResolver(
      process.platform,
      this.iconPath
    ).resolve();
    const dimensions = this.getWindowDimensions();
    const alwaysOnTop = true;
    const mb = menubar({
      dir: __dirname,
      icon: iconPath,
      preloadWindow: true,
      width: dimensions.width,
      height: dimensions.height,
      index: this.indexPath,
      alwaysOnTop,
      resizable: false,
      movable: false,
      skipTaskbar: true,
      frame: false,
      autoHideMenuBar: true
    });

    mb.on("ready", () => {
      console.log("app is ready");
    });
    mb.on("after-show", () => {
      if (this.hasBeenSetup) return;

      if (this.openDevTools) {
        mb.window.webContents.openDevTools();
      }
      this.hasBeenSetup = true;
    });
    return mb;
  }
}
