const init = appKernel => {
    $console.info("login.init");
    initView();
  },
  initView = () => {
    $ui.alert({
      title: "未登录",
      message: "请登录",
      actions: [
        {
          title: "OK",
          disabled: false, // Optional
          handler: () => {}
        }
      ]
    });
  };
module.exports = {
  init
};
