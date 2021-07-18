export class MenuModel {

  _showMenu = false;
  _x = 0;
  _y = 0;

  get showMenu() {
    return this._showMenu;
  }

  set showMenu(value) {
    this._showMenu = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }
}
