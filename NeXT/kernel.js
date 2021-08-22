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
  constructor({ debug }) {
    this.debug = debug === true;
    this.viewList = {
      viewIdList: [],
      viewList: {}
    };
    this.launchViewId = "";
  }
  registerView({ id, title, icon, fileName, func }) {
    if (id && title && fileName && func) {
      this.viewList.viewList[id] = new ViewItem({
        id,
        title,
        icon,
        fileName,
        func
      });
      this.viewList.viewIdList.push(id);
    } else {
      if (this.debug === true) {
        $console.info({ id, title, icon, fileName, func });
      }
      throw new UserException({
        name: "registerView",
        message: "register view failed",
        source: "code"
      });
    }
  }
  setLaunchViewId(id) {
    if (
      id &&
      this.viewList.viewIdList.indexOf(id) >= 0 &&
      this.viewList.viewList[id]
    ) {
      this.launchViewId = id;
    } else {
      if (this.debug === true) {
        $console.error(id);
      }
      throw new UserException({
        name: "setLaunchViewId",
        message: "set launch view id failed, can not find this view id",
        source: "code"
      });
    }
  }
  openLaunchView() {
    if (this.launchViewId && this.viewList.viewList[this.launchViewId]) {
      const launchViewItem = this.viewList.viewList[this.launchViewId];
      if (launchViewItem) {
        require(`/scripts/view/${launchViewItem.fileName}`)[
          launchViewItem.func
        ]();
      } else {
        throw new UserException({
          name: "openLaunchView",
          message: "need setLaunchViewId",
          source: "code"
        });
      }
    } else {
      throw new UserException({
        name: "openLaunchView",
        message: "open launch view failed, can not find this view id",
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
    this.viewLoader = new ViewLoader({
      debug: this.debug
    });
  }
}
module.exports = Kernel;
