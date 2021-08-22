const SQLite = require("../../NeXT/sqlite"),
  { File } = require("../../NeXT/storage"),
  fileKit = new File();
class DataBase {
  constructor({ appKernel, sqliteFile }) {
    this.kernel = appKernel;
    this.sql = new SQLite({
      dataBaseFile: appKernel.global.SQLITE_DIR + sqliteFile
    });
  }
  getData(tableId, key) {
    return this.sql.getSimpleData(tableId, key);
  }
  setData(tableId, key, value) {}
}
class User {
  constructor({ appKernel }) {
    this.dataBase = new DataBase({
      appKernel,
      sqliteFile: "user.db"
    });
  }
  getAccessKey() {
    return this.dataBase.getData("login_data", "access_key");
  }
  setAccessKey(value) {
    this.dataBase.setData("login_data", "access_key", value);
  }
  getUid() {
    return this.dataBase.getData("login_data", "uid");
  }
  setUid(value) {
    this.dataBase.setData("login_data", "uid", value);
  }
  getCookies() {
    return this.dataBase.getData("login_data", "cookies");
  }
  setCookies(value) {
    this.dataBase.setData("login_data", "cookies", value);
  }
}
module.exports = {
  User
};
