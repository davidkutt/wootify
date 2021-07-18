const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
import ConfigWoo from "../config/ConfigWoo.js";

const WooCommerce = new WooCommerceRestApi({
  url: "http://david-kutt.com",
  consumerKey: ConfigWoo.consumerKey,
  consumerSecret: ConfigWoo.consumerSecret,
  version: "wc/v3",
  wpAPI: true
});

export default class WooService {

  getCategories() {
    return WooCommerce.get("products/categories").then((result) => {
      let categories = result.data;
      return categories?.filter(category => category && category.count);
    });
  }

  getProducts() {
    return WooCommerce.get("products").then((result) => {
      return result.data;
    });
  }

  getOrders() {
    return WooCommerce.get("orders").then((result) => {
      return result.data;
    });
  }

  placeOrder() {
    return WooCommerce.post("orders", {
      "payment_method": "bacs",
      "payment_method_title": "Direct Bank Transfer",
      "set_paid": true,
      "billing": {
        "first_name": "John",
        "last_name": "Doe",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US",
        "email": "john.doe@example.com",
        "phone": "(555) 555-5555"
      },
      "shipping": {
        "first_name": "John",
        "last_name": "Doe",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US"
      },
      "line_items": [
        {
          "product_id": 93,
          "quantity": 2
        },
        {
          "product_id": 22,
          "variation_id": 23,
          "quantity": 1
        }
      ],
      "shipping_lines": [
        {
          "method_id": "flat_rate",
          "method_title": "Flat Rate",
          "total": "10.00"
        }
      ]
    })
      .then((result) => {
        return result.data;
      });
  }

  signUp(email, password) {
    return WooCommerce.post("customers", { email: email, password: password })
      .then((result) => {
        return result.data;
      });
  }
}
