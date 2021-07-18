export class ProductModel {

  _id = 0;
  _name = "";
  _price = 0;
  _regular_price = 0;
  _on_sale = false;
  _description = "";

  constructor(obj = {}) {
    Object.assign(this, obj);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._price = value;
  }

  get regular_price() {
    return this._regular_price;
  }

  set regular_price(value) {
    this._regular_price = value;
  }

  get on_sale() {
    return this._on_sale;
  }

  set on_sale(value) {
    this._on_sale = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
}
