const SQLite = require("../../NeXT/sqlite"),
  { File } = require("../../NeXT/storage "),
  sqliteFile = "/assets/.files/bilibili.db",
  fileKit = new File();
class DataBase extends SQLite {
  constructor(tableId) {
    super({ dataBaseFile: sqliteFile, tableId: tableId });
  }
getAccessKey(){
  this.g
}
}
module.exports = DataBase;
