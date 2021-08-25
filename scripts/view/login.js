const init = appKernel => {
    $console.info("login.init");
    initView(appKernel);
  },
  initView = appKernel => {
    $ui.alert({
      title: "未登录",
      message: "请登录",
      actions: [
        {
          title: "OK",
          disabled: false, // Optional
          handler: () => {
            appKernel.user.setLoginData();
          }
        }
      ]
    });
  };
module.exports = {
  init
};
