import axios from "axios";
import ConfigWP from "../config/ConfigWP.js";

export default class WordpressService {

  url = "http://david-kutt.com/wp-json";

  /**
   * only works with app user
   * miniorange: basic-authentication
   */
  signUp(email, password) {
    return axios.post(`${this.url}/wp/v2/users`, { username: email, email: email, password: password }, {
      auth: {
        username: ConfigWP.user,
        password: ConfigWP.password
      }
    });
  }
}
