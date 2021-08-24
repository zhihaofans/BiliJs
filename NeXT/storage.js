const { UserException } = require("./object");
class Cache {
  constructor(key) {
    this.KEY = key;
  }
  get() {
    return $cache.get(this.KEY);
  }
  set(value) {
    return $cache.set(this.KEY, value);
  }
}
class File {
  constructor() {}
  open(handler, types) {
    $drive.open({
      handler: handler,
      types: types
    });
  }
  save(name, data, handler) {
    $drive.save({
      data: data,
      name: name,
      handler: handler
    });
  }
  isDirectory(path) {
    if (!this.isExists(path)) {
      return false;
    }
    return $file.isDirectory(path);
  }
  isExists(path) {
    return path && $file.exists(path);
  }
  isFile(path) {
    return this.isExists(path) && !this.isDirectory(path);
  }
  getFileList(dir, ext = undefined) {
    if ($file.exists(dir) && $file.isDirectory(dir)) {
      let files = [];
      const fileList = $file.list(dir);
      fileList.map(f => {
        if (!$file.isDirectory(f)) {
          if (ext) {
            if (f.endsWith(`.${ext}`)) {
              files.push(f);
            }
          } else {
            files.push(f);
          }
        }
      });
      return files;
    } else {
      $console.error(`不存在该目录或不是目录:${dir}`);
      return undefined;
    }
  }
  read(path) {
    return this.isFile(path) ? $file.read(path) : undefined;
  }

  write(path, data) {
    return $file.write({
      data: data,
      path: path
    });
  }
  absolutePath(path) {
    return $file.absolutePath(path);
  }
  getDirByFile(path) {
    if (this.isDirectory(path)) {
      return path;
    }

    const dir_path_end = path.lastIndexOf("/");
    if (dir_path_end >= 0) {
      return path.slice(0, dir_path_end + 1);
    }
    return undefined;
  }
  mkdir(dir) {
    if (this.isFile(dir)) {
      throw new UserException({
        name: "File.mkdir",
        message: `this is file:${dir}`,
        source: "dir"
      });
    }
    return $file.mkdir(dir);
  }
}
class Prefs {
  constructor() {}
  getData(key) {
    return $prefs.get(key);
  }
  setData(key, value) {
    return $prefs.set(key, value);
  }
  exportData() {
    return $prefs.all();
  }
}

module.exports = {
  Cache,
  File,
  Prefs
};
