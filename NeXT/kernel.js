const storage = require("./storage"),
  SQLite = require("./sqlite"),
  update = require("./update");

class Config {
  constructor(configDataDir) {
    this.cache = storage.Cache;
    this.prefs = storage.Prefs;
    this.sqlite = SQLite;
    this.configDataDir = configDataDir || "/assets/.files/.config/";
  }
  setConfigDataDir(newDir) {
    this.configDataDir = newDir;
  }
}

class Kernel {
  constructor({ debugMode }) {
    this.appInfo = $addin.current;
    this.debug = debugMode === true;
    this.config = new Config();
    this.update = new update({
      appVersion: this.appInfo.version,
      updateConfigUrl: undefined
    });
  }
}
module.exports = Kernel;
