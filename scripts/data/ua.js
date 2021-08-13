const { appVersion } = require("./app_info"),
  ua = {
    bilibili: `bili-universal/${appVersion.bili_universal} CFNetwork/${appVersion.cfnetwork} Darwin/${appVersion.darwin} os/${appVersion.os} model/${appVersion.model} mobi_app/iphone build/${appVersion.build} osVer/${appVersion.osver} network/${appVersion.network} channel/${appVersion.channel}`,
    comic: `Mozilla/5.0 CFNetwork/${appVersion.cfnetwork} Darwin/${appVersion.darwin} os/${appVersion.os} model/${appVersion.model} mobi_app/iphone build/${appVersion.build} osVer/${appVersion.osver} network/${appVersion.network} channel/${appVersion.channel} BiliComic/${appVersion.comic_universal} versionName/${appVersion.comic_version}`
  };
module.exports = ua;
