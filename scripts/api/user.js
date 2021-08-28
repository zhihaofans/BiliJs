const dataBase = require("./dataBase"),
  http = require("../../NeXT/http");

class UserData {
  constructor(appKernel) {
    this.appKernel = appKernel;
    this.http = new http(3);
    this.DB = new dataBase.User({
      appKernel
    });
    this.loadingData();
  }
  loadingData() {
    this.cookies = this.DB.getCookies();
    this.uid = this.DB.getUid();
    this.accessKey = this.DB.getAccessKey();
    $console.info(this.accessKey);
  }
  setAccesskey(newAccesskey) {
    if (newAccesskey) {
      this.DB.setAccessKey(newAccesskey);
      this.loadingData();
    }
  }
  setCookies(newCookies) {
    if (newCookies) {
      this.DB.setCookies(newCookies);
      const cookieResult = this.Http.cookieToObj(newCookies);
      if (cookieResult.DedeUserID) {
        this.DB.setUid(cookieResult.DedeUserID);
      }
      this.loadingData();
    }
  }
  setUid(newUid) {
    if (newUid) {
      this.DB.setUid(newUid);
      this.loadingData();
    }
  }
  removeAllData() {
    this.DB.removeAllData();
  }
}

class User {
  constructor(appKernel) {
    this.appKernel = appKernel;
    this.userData = new UserData(appKernel);
  }
  isLogin() {
    this.userData.loadingData();
    return (
      this.userData.accesskey && this.userData.uid && this.userData.cookies
    );
  }
  setLoginData() {
    $ui.menu({
      items: ["access key", "cookies"],
      handler: (title, idx) => {
        switch (idx) {
          case 0:
            $input.text({
              type: $kbType.text,
              placeholder: title,
              text: this.userData.accessKey,
              handler: newAccessKey => {
                if (newAccessKey) {
                  this.userData.setAccesskey(newAccessKey);
                }
              }
            });
            break;
          case 1:
            $input.text({
              type: $kbType.text,
              placeholder: title,
              text: this.userData.cookies,
              handler: newCookies => {
                if (newCookies) {
                  this.userData.setCookies(newCookies);
                }
              }
            });
            break;
        }
      }
    });
  }
}
module.exports = {
  User,
  UserData
};
