const storage = require("./storage"),
  update = require("./update");
class AppInfo {
  constructor() {
    this.file = new storage.File();
    this.filePath = "/config.json";
    this.config = this.getFileData();
    this.name = this.config.info.version;
    this.version = this.config.info.version;
  }
  getFileData() {
    try {
      const configString = this.file.read(this.filePath);
      return JSON.parse(configString);
    } catch (error) {
      $console.error(error);
      return undefined;
    }
  }
}

class Config {
  constructor(configDataDir) {
    this.cache = storage.Cache;
    this.prefs = storage.Prefs;
    this.sqlite = storage.SQLite;
    this.configDataDir = configDataDir ?? "/assets/.files/.config/";
  }
  setConfigDataDir(newDir) {
    this.configDataDir = newDir;
  }
}

class Kernel {
  constructor({ debugMode }) {
    this.appInfo = new AppInfo();
    this.appName = this.appInfo.name;
    this.appVersion = this.appInfo.version;
    this.debug = debugMode === true;
    this.config = new Config();
    this.update = new update({
      appVersion: this.appVersion,
      updateConfigUrl: undefined
    });
  }
}
module.exports = Kernel;
