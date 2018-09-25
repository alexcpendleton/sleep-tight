import { Menu, MenuItem } from "electron";

export class MainMenu {
  constructor(app, tray) {
    this.app = app;
    this.tray = tray;
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
    const quitItem = new MenuItem({
      type: "normal",
      label: "Quit",
      id: "quit",
      accelerator: "Q",
      click: (menuItem, browserWindow, event) => {
        this.app.quit();
      }
    });
    menu.append(quitItem);
    return menu;
  }
}
