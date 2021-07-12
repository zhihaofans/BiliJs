try {
  const app = require("./scripts/app"),
    appKernel = new app();
  appKernel.init();
} catch (error) {
  $console.error(error);
  $ui.alert({
    title: "app.init.error",
    message: error.message,
    actions: [
      {
        title: "Exit",
        disabled: false, // Optional
        handler: () => {
          $app.close();
        }
      }
    ]
  });
}
