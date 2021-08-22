const Kernel = require("../NeXT/kernel");
class AppKernel extends Kernel {
  constructor() {
    super({ debugMode: true });
    this.global = {
      SQLITE_DIR: "/assets/.files/sqlite/"
    };
    this.viewLoader.registerView({
      id: "main",
      title: this.appInfo.name,
      icon: undefined,
      fileName: "main.js",
      func: "init"
    });
    this.viewLoader.setLaunchViewId("main");
  }
  init() {
    if (this.debug === true) {
      $console.info("init");
      $console.info(this.appInfo);
    }
    this.viewLoader.openLaunchView();
  }
}

module.exports = AppKernel;
