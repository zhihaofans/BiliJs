const Kernel = require("../NeXT/kernel"),
  user = require("./api/user");
class AppKernel extends Kernel {
  constructor() {
    super({ debugMode: true });
    this.global = {
      SQLITE_DIR: "/assets/.files/sqlite/"
    };
    this.user = new user.User(this);
    this.viewLoader.registerView({
      id: "main",
      title: this.appInfo.name,
      icon: undefined,
      fileName: "main.js",
      func: "init"
    });
    this.viewLoader.registerView({
      id: "login",
      title: "哔哩哔哩登录",
      icon: undefined,
      fileName: "login.js",
      func: "init"
    });
    this.viewLoader.setLaunchViewId("main");
  }
  init() {
    if (this.debug === true) {
      $console.info("init");
      $console.info(this.appInfo);
    }
    if (this.user.isLogin()) {
      this.viewLoader.openLaunchView();
    } else {
      this.viewLoader.openView("login");
    }
  }
}

module.exports = AppKernel;
