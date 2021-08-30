class Keyboard {
  constructor({ barHidden = false }) {
    $keyboard.barHidden = barHidden;
  }
  isKeyboard() {
    return $app.env === $env.keyboard;
  }
  getHeight() {
    return $keyboard.height;
  }
  setHeight(newHeight) {
    $keyboard.height = newHeight;
  }
  insert(text) {
    $keyboard.insert(text);
  }
  getAllText() {
    return $keyboard.getAllText();
  }
paste(){
  this.insert()
}
}
