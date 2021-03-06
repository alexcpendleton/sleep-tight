const path = require("path");

class IconResolver {
  constructor(platform, rootPath) {
    this.platform = platform;
    this.resourcePath = "";
    this.rootPath = rootPath;
    this.win32FileName = "icon.ico";
    this.otherFileName = "IconTemplate.png";
    this.win32Platform = "win32";
  }

  resolve() {
    const iconFileName =
      this.platform == this.win32Platform
        ? this.win32FileName
        : this.otherFileName;
    const result = path.join(this.rootPath, iconFileName);
    return result;
  }
}
module.exports = IconResolver;
