const storage = require("./storage"),
  { UserException } = require("./object");

class Core {
  constructor({ dataBaseFile }) {
    this.dataBaseFile = dataBaseFile;
    this.file = new storage.File();
  }
}

class SQLite {
  constructor({ dataBaseFile }) {
    this.dataBaseFile = dataBaseFile;
    this.file = new storage.File();
  }
  init() {
    if (this.dataBaseFile) {
      const dataBasrSaveDir = this.file.getDirByFile(this.dataBaseFile);
      if (dataBasrSaveDir) {
        if (!this.file.isFile(dataBasrSaveDir)) {
          this.file.mkdir(dataBasrSaveDir);
        }
        return $sqlite.open(this.dataBaseFile);
      }
      $console.info(this.dataBaseFile);
    } else {
      return undefined;
    }
  }
  update(sql, args = undefined) {
    const db = this.init();
    if (db) {
      db.update({
        sql: sql,
        args: args
      });
      db.close();
    } else {
      throw new UserException({
        name: "sqlite.update",
        message: "sqlite.init failed",
        source: "code"
      });
    }
  }
  createSimpleTable(tableId) {
    if (tableId) {
      try {
        const db = this.init(),
          sql = `CREATE TABLE IF NOT EXISTS ${tableId}(id TEXT PRIMARY KEY NOT NULL, value TEXT)`;
        db.update({ sql: sql, args: undefined });
        db.close();
      } catch (_ERROR) {
        $console.error(_ERROR);
      }
    } else {
      $console.error("createSimpleTable:tableId = undefined");
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
  getSimpleData(tableId, key) {
    try {
      if (tableId && key) {
        this.createSimpleTable(tableId);
        const sql = `SELECT * FROM ${tableId} WHERE id = ?`,
          args = [key],
          result = this.update(sql, args),
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
  setSimpleData(tableId, key, value) {
    try {
      if (tableId && key) {
        const db = this.init(),
          sql = this.getSimpleData(tableId, key)
            ? `UPDATE ${tableId} SET value=? WHERE id=?`
            : `INSERT INTO ${tableId} (value,id) VALUES (?, ?)`,
          args = [value, key],
          update_result = db.update(sql, args);

        return update_result.result || false;
      } else {
        return false;
      }
    } catch (_ERROR) {
      $console.error(`setSimpleData:${_ERROR.message}`);
      return false;
    }
  }
  remove(tableId, key) {
    if (tableId && key) {
      try {
        const sql = `DELETE FROM ${tableId} WHERE id=?`;
        this.update(sql);
      } catch (_ERROR) {
        $console.error(_ERROR);
      }
    }
  }
  auto(tableId, sql_key, value = undefined) {
    if (sql_key && tableId) {
      try {
        if (value) {
          this.setSimpleData(tableId, sql_key, value.toString());
        }
        return this.getSimpleData(tableId, sql_key) || undefined;
      } catch (_ERROR) {
        $console.error(`SQLite.auto:${_ERROR.message}`);
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  getSql(tableId, key) {
    return this.auto(tableId, key);
  }
  setSql(tableId, key, value) {
    return this.setSimpleData(tableId, key, value);
  }
}

module.exports = {
  SQLite
};
