const nextVersion = "0.0.1";

class Update {
  constructor({ appVersion, updateConfigUrl }) {}
  checkNextUpdate() {
    return false;
  }
  checkAppUpdate() {
    return false;
  }
}
module.exports = Update;
