const SQLite = require("../../NeXT/sqlite"),
  { File } = require("../../NeXT/storage"),
  fileKit = new File();
class DataBase extends SQLite {
  constructor({ tableId, kernel }) {
    super({ dataBaseFile: sqliteFile, tableId: tableId });
    this.kernel = kernel;
    this.sqliteFileName = "/assets/.files/sqlite/bilibili.db";
  }
  getAccessKey() {}
}
module.exports = DataBase;
