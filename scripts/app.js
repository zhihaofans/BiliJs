const Kernel = require("../NeXT/kernel");
class AppKernel extends Kernel {
  constructor() {
    super({ debugMode: true });
  }
  init() {
    if (this.debug === true) {
      $console.info("init");
      $console.info(this.appInfo);
    }
  }
}

module.exports = AppKernel;
