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
  openView(viewId) {
    if (viewId && this.viewList.viewList[viewId]) {
      const launchViewItem = this.viewList.viewList[viewId];
      if (launchViewItem) {
        require(`/scripts/view/${launchViewItem.fileName}`)[
          launchViewItem.func
        ]();
      } else {
        throw new UserException({
          name: "openView",
          message: "need viewId",
          source: "code"
        });
      }
    } else {
      throw new UserException({
        name: "openView",
        message: "open view failed, can not find this view id",
        source: "code"
      });
    }
  }
  openLaunchView() {
    this.openView(this.launchViewId);
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
