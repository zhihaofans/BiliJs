const SQLite = require("../../NeXT/sqlite"),
  { File } = require("../../NeXT/storage"),
  fileKit = new File(),
  sqliteFileName = "bilibili.db",
  tableId = "bilibili";
class DataBase extends SQLite {
  constructor(kernel) {
    super({
      dataBaseFile: kernel.global.SQLITE_DIR + sqliteFileName,
      tableId: tableId
    });
    this.kernel = kernel;
  }
  getAccessKey() {}
}
module.exports = DataBase;
