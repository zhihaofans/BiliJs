class UserData {
  constructor(core) {
      this.core = core;
      this.cookies = core.getSql("cookies");
      this.uid = core.getSql("uid");
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
  constructor(name) {
    this.NAME = name;
  }
}
module.exports = {
  User,
  UserData
};
