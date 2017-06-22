'use strict'
var path = require('path');

class IconResolver {
  constructor(platform) {
    this.platform = platform;
    this.resourcePath = "../../res/icons/";
    this.rootPath = __dirname;
    this.win32FileName = "icon.ico";
    this.otherFileName = "IconTemplate.png";
    this.win32Platform = "win32";
  }

  resolve() {
    var iconFileName = this.platform == this.win32Platform 
      ? this.win32FileName : this.otherFileName;
    var result = path.join(this.rootPath, this.resourcePath, iconFileName);
    console.log("iconPath", result);
    return result;
  }
}
module.exports = IconResolver;
