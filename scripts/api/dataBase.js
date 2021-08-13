const SQLite = require("../../NeXT/sqlite"),
  { File } = require("../../NeXT/storage "),
  sqliteFile = "/assets/.files/bilibili.db",
  fileKit = new File();
class DataBase extends SQLite {
  constructor(tableId) {
    super({ dataBaseFile: sqliteFile, tableId: tableId });
  }
  getAccessKey() {}
}
module.exports = DataBase;
