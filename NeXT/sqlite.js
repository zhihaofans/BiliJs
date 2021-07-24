const storage = require("./storage");
class SQLite {
  constructor({ dataBaseFile, tableId }) {
    this.dataBaseFile = dataBaseFile;
    this.tableId = tableId;
    this.file = new storage.File();
    this.createSimpleTable();
  }
  init() {
    const dataBasrSaveDir = this.file.getDirByFile(this.dataBaseFile);
    if (!this.file.isFile(dataBasrSaveDir)) {
      this.file.mkdir(dataBasrSaveDir);
    }
    return $sqlite.open(this.dataBaseFile);
  }
  update(sql, args = undefined) {
    const db = this.init();
    db.update({
      sql: sql,
      args: args
    });
    db.close();
  }
  createSimpleTable() {
    if (this.tableId) {
      try {
        const db = this.init(),
          sql = `CREATE TABLE IF NOT EXISTS ${this.tableId}(id TEXT PRIMARY KEY NOT NULL, value TEXT)`;
        db.update({ sql: sql, args: undefined });
        db.close();
      } catch (_ERROR) {
        $console.error(_ERROR);
      }
    } else {
      $console.error("createSimpleTable:this.tableId = undefined");
    }
  }
  parseSimpleQuery(result) {
    try {
      if (result) {
        if (result.error !== null) {
          $console.error(result.error);
          return undefined;
        }
        const sqlResult = result.result,
          data = [];
        while (sqlResult.next()) {
          data.push({
            id: sqlResult.get("id"),
            value: sqlResult.get("value")
          });
        }
        sqlResult.close();
        return data;
      } else {
        return undefined;
      }
    } catch (_ERROR) {
      $console.error(`parseSimpleQuery:${_ERROR.message}`);
      return undefined;
    }
  }
  getSimpleData(key) {
    try {
      if (this.tableId && key) {
        const db = this.init(),
          sql = `SELECT * FROM ${this.tableId} WHERE id = ?`,
          args = [key],
          result = db.query({
            sql: sql,
            args: args
          }),
          sql_data = this.parseSimpleQuery(result);
        if (sql_data && sql_data.length === 1) {
          return sql_data[0].value;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } catch (_ERROR) {
      $console.error(`getSimpleData:${_ERROR.message}`);
      return undefined;
    }
  }
  setSimpleData(key, value) {
    try {
      if (this.tableId && key) {
        const db = this.init(),
          sql = this.getSimpleData(key)
            ? `UPDATE ${this.tableId} SET value=? WHERE id=?`
            : `INSERT INTO ${this.tableId} (value,id) VALUES (?, ?)`,
          args = [value, key],
          update_result = db.update({
            sql: sql,
            args: args
          });
        db.close();
        return update_result.result || false;
      } else {
        return false;
      }
    } catch (_ERROR) {
      $console.error(`setSimpleData:${_ERROR.message}`);
      return false;
    }
  }
  auto(sql_key, value = undefined) {
    if (!sql_key || !this.tableId) {
      return undefined;
    }
    try {
      if (value) {
        this.setSimpleData(sql_key, value.toString());
      }
      return this.getSimpleData(sql_key) || undefined;
    } catch (_ERROR) {
      $console.error(`SQLite.auto:${_ERROR.message}`);
      return undefined;
    }
  }
  getSql(key) {
    return this.auto(key);
  }
  setSql(key, value) {
    return this.setSimpleData(key, value);
  }
}

module.exports = SQLite;
