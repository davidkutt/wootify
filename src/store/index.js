import Vue from "vue";
import Vuex from "vuex";
import WooService from "@/services/WooService";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    cartItems: [],
    searchTerm: "",
    filter: ""
  },
  mutations: {
    // synchronous
    setProducts(state, payload) {
      state.products = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    addToCart(state, payload) {
      state.cartItems.push(payload);
    },
    search(state, payload) {
      state.searchTerm = payload;
    },
    filter(state, payload) {
      state.filter = payload;
    }
  },
  actions: {
    // ASYNC
    async initProducts(state) {
      const wooService = new WooService();
      const products = await wooService.getProducts();
      state.commit(MutationsEnum.SET_PRODUCTS, products);
    },
    async initCategories(state) {
      const wooService = new WooService();
      const categories = await wooService.getCategories();
      state.commit(MutationsEnum.SET_CATEGORIES, categories);
    },
    async setProducts(state, products) {
      state.commit(MutationsEnum.SET_PRODUCTS, products);
    },
    async addToCart(state, payload) {
      state.commit(MutationsEnum.ADD_TO_CART, payload);
    },
    async search(state, payload) {
      state.commit(MutationsEnum.SEARCH, payload);
    },
    async filter(state, payload) {
      state.commit(MutationsEnum.FILTER, payload);
    }
  },
  modules: {},
  getters: {
    getProducts: state => state.products,
    getCategories: state => state.categories,
    getCartItems: state => state.cartItems,
    getFilters: state => state.filter
  }
});
