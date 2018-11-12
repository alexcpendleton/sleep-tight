import { Menu, MenuItem } from "electron";
const { shell } = require("electron");

export class MainMenu {
  constructor(app, tray) {
    this.app = app;
    this.tray = tray;
    this.websiteUri =
      "http://www.sleeptight.tech/about/v/" + this.inferVersion();
  }
  initialize() {
    this.setTrayHandler();
  }
  setTrayHandler() {
    this.tray.on("right-click", () => {
      this.tray.popUpContextMenu(this.buildMenu());
    });
  }
  buildMenu() {
    const menu = new Menu();
    const aboutItem = new MenuItem({
      type: "normal",
      label: "About",
      id: "about",
      accelerator: "A",
      click: (menuItem, browserWindow, event) => {
        this.openWebSite();
      }
    });
    const quitItem = new MenuItem({
      type: "normal",
      label: "Quit",
      id: "quit",
      accelerator: "Q",
      click: (menuItem, browserWindow, event) => {
        this.app.quit();
      }
    });
    menu.append(aboutItem);
    menu.append(quitItem);
    return menu;
  }
  openWebSite() {
    const uri = this.websiteUri;
    shell.openExternal(uri);
  }
  inferVersion() {
    return this.app.getVersion();
  }
}
