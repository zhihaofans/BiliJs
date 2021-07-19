const storage = require("./storage"),
  SQLite = require("./sqlite"),
  update = require("./update"),
  { UserException } = require("./object");
class ViewItem {
  constructor({ id, title, icon, fileName, func }) {
    this.id = id;
    this.title = icon;
    this.icon = icon;
    this.fileName = fileName;
    this.func = func;
  }
}

class ViewLoader {
  constructor() {
    this.viewList = [];
  }
  registerView({ id, title, icon, fileName, func }) {
    if (id && title && fileName && func) {
      this.viewList.push(new ViewItem({ id, title, icon, fileName, func }));
    } else {
      throw new UserException({
        name: "registerView",
        message: "register view failed",
        source: "code"
      });
    }
  }
}

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
    this.viewLoader = new ViewLoader();
  }
}
module.exports = Kernel;
