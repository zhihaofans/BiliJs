const SQLite = require("../../NeXT/sqlite"),
  http = require("../../NeXT/http");

class UserData {
  constructor(kernel) {
    this.kernel = kernel;
    this.sqlite = new SQLite({
      dataBaseFile: this.kernel.global.SQLITE_FILE,
      tableId,
    });
    this.cookies = this.sqlite.getSql("cookies");
    this.uid = this.sqlite.getSql("uid");
    this.accesskey = core.getSql("accesskey");
  }
  setAccesskey(newAccesskey) {
    if (newAccesskey) {
      this.core.setSql("accesskey", newAccesskey);
      this.accesskey = newAccesskey;
    }
  }
  setCookies(newCookies) {
    if (newCookies) {
      this.core.setSql("cookies", newCookies);
      this.cookies = newCookies;
      const cookieResult = this.Http.cookieToObj(newCookies);
      this.Http.setCookies(this.getCookies());
      if (cookieResult.DedeUserID) {
        this.setUid(cookieResult.DedeUserID);
      }
    }
  }
  setUid(newUid) {
    if (newUid) {
      this.core.setSql("uid", newUid);
      this.uid = newUid;
    }
  }
}

class User {
  constructor(kernel) {
    this.kernel = kernel;
    this.userData = UserData();
  }
  isLogin() {}
}
module.exports = {
  User,
  UserData,
};
