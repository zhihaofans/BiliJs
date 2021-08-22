class ViewKit {
  constructor({ viewId, navButtons }) {
    this.viewId = viewId;
    this.navButtons = navButtons;
  }
  pushView(title, views) {
    $ui.push({
      props: {
        title: title,
        navButtons: this.navButtons
      },
      views: views,
      events: {
        appeared: () => {
          $app.tips("这是第一次加载完毕会出现的提示");
        },
        shakeDetected: () => {
          //摇一摇￼
          $app.tips("这是摇一摇会出现的提示");
        }
      }
    });
  }
  renderView(title, views) {
    $ui.render({
      props: {
        id: this.viewId ?? "main",
        title: title,
        homeIndicatorHidden: false,
        modalPresentationStyle: 0,
        navButtons: this.navButtons
      },
      views: views,
      events: {
        appeared: () => {
          $app.tips("这是第一次加载完毕会出现的提示");
        },
        shakeDetected: () => {
          //摇一摇￼
          $app.tips("这是摇一摇会出现的提示");
        }
      }
    });
  }
}
class ListKit extends ViewKit {
  constructor({ viewId }) {
    super({
      viewId: viewId
    });
  }
  renderIdx(title, listData, handler = (section, row, data) => {}) {
    this.renderView(title, [
      {
        type: "list",
        props: {
          autoRowHeight: true,
          estimatedRowHeight: 10,
          data: listData
        },
        layout: $layout.fill,
        events: {
          didSelect: (sender, indexPath, data) => {
            handler(indexPath.section, indexPath.row, data);
          }
        }
      }
    ]);
  }
  pushIdx(title, listData, handler = (section, row, data) => {}) {
    this.pushView(title, [
      {
        type: "list",
        props: {
          autoRowHeight: true,
          estimatedRowHeight: 10,
          data: listData
        },
        layout: $layout.fill,
        events: {
          didSelect: (sender, indexPath, data) => {
            handler(indexPath.section, indexPath.row, data);
          }
        }
      }
    ]);
  }
}
module.exports = {
  ListKit
};
