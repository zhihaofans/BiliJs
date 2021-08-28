const { SQLite } = require("../../NeXT/sqlite"),
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
    return this.sql.getSql(tableId, key);
  }
  setData(tableId, key, value) {
    this.sql.setSql(tableId, key, value);
  }
  removeData(tableId, key) {
    this.sql.remove(tableId, key);
  }
}
class User {
  constructor({ appKernel }) {
    this.dataBase = new DataBase({
      appKernel,
      sqliteFile: "user.db"
    });
    this.TABLE_ID = "login_data";
    this.DB_KEY = {
      ACCESS_KEY: "access_key",
      COOKIES: "cookies",
      UID: "uid"
    };
  }
  getAccessKey() {
    return this.dataBase.getData(this.TABLE_ID, this.DB_KEY.ACCESS_KEY);
  }
  setAccessKey(value) {
    this.dataBase.setData(this.TABLE_ID, this.DB_KEY.ACCESS_KEY, value);
  }
  getUid() {
    return this.dataBase.getData(this.TABLE_ID, this.DB_KEY.UID);
  }
  setUid(value) {
    this.dataBase.setData(this.TABLE_ID, this.DB_KEY.UID, value);
  }
  getCookies() {
    return this.dataBase.getData(this.TABLE_ID, this.DB_KEY.COOKIES);
  }
  setCookies(value) {
    this.dataBase.setData(this.TABLE_ID, this.DB_KEY.COOKIES, value);
  }
  removeAllData() {
    this.dataBase.removeData(this.TABLE_ID, this.DB_KEY.ACCESS_KEY);
    this.dataBase.removeData(this.TABLE_ID, this.DB_KEY.COOKIES);
    this.dataBase.removeData(this.TABLE_ID, this.DB_KEY.UID);
  }
}
module.exports = {
  User
};
