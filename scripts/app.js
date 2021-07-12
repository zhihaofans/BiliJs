const Kernel = require("../NeXT/kernel");
class AppKernel extends Kernel {
  constructor() {
    super({});
    this.name = "name";
  }
  init() {
    $console.info("init");
  }
}

module.exports = AppKernel;
