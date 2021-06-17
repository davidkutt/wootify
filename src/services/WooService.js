const WooCommerceAPI = require("woocommerce-api");
import ConfigWoo from "../config/ConfigWoo.js";

const WooCommerce = new WooCommerceAPI({
  url: "http://david-kutt.com/",
  consumerKey: ConfigWoo.consumerKey,
  consumerSecret: ConfigWoo.consumerSecret,
  wpAPI: true,
  version: "wc/v1"
});

export default class WooService {

  getCategories() {
    return WooCommerce.getAsync("products/categories").then((result) => {
      console.log("categories", JSON.parse(result.toJSON().body));
      let categories = JSON.parse(result.toJSON().body);
      return categories?.filter(category => category && category.count);
    });
  }

  getProducts() {
    return WooCommerce.getAsync("products").then((result) => {
      return JSON.parse(result.toJSON().body);
    });
  }

  getOrders() {
    return WooCommerce.getAsync("orders").then((result) => {
      return JSON.parse(result.toJSON().body);
    });
  }
}
