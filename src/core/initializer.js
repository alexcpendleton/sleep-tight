import MainThreadReceiver from "./mainThreadReceiver";
import menubar from "menubar";
import IconResolver from "./IconResolver";

export class Initializer {
  constructor({ mainWindow, isDevMode, indexPath, iconPath, big }) {
    this.mainWindow = mainWindow;
    this.isDevMode = isDevMode || false;
    this.receiver = new MainThreadReceiver();
    this.hasBeenSetup = false;
    this.indexPath = indexPath;
    this.iconPath = iconPath;
    this.big = big || false;
  }
  initialize() {
    this.hideMainWindow();
    this.initMenubar();
    this.setupSignaling();
  }
  hideMainWindow() {
    if (this.mainWindow) {
      this.mainWindow.hide();
    }
  }
  setupSignaling() {
    this.receiver.setup();
  }

  getWindowDimensions() {
    if (this.big) {
      return { width: 1024, height: 768 };
    }
    return { width: 280, height: 200 };
  }

  initMenubar() {
    var iconPath = new IconResolver(process.platform, this.iconPath).resolve();
    var dimensions = this.getWindowDimensions();
    var mb = menubar({
      dir: __dirname,
      icon: iconPath,
      preloadWindow: true,
      width: dimensions.width,
      height: dimensions.height,
      index: this.indexPath
    });
    mb.on("ready", () => {
      console.log("app is ready");
    });
    mb.on("after-show", () => {
      if (this.hasBeenSetup) return;

      if (this.isDevMode) {
        mb.window.webContents.openDevTools("detach");
      }
      this.hasBeenSetup = true;
    });
    return mb;
  }
}
