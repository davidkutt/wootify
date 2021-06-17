import { FilterTypes } from "@/enums/FilterTypes";

export default {

  searchProducts(state) {

    const filteredProducts = this.filterProducts(state);

    if (!state.searchTerm) {
      return filteredProducts;
    }

    return filteredProducts.filter(product => product?.name?.includes(state.searchTerm));
  },

  filterProducts(state) {
    const categories = state.categories;
    const products = state.products;
    const filter = state.filter;

    if (filter === FilterTypes.SALE) {
      return products.filter(product => product?.on_sale);
    }

    if (categories && categories.length) {
      const categorySlugs = categories.map(category => category.slug);
      return categorySlugs?.includes(filter) ?
        state.products.filter(product => product.categories?.find(category => category.slug === filter))
        : products;
    }

    return products;
  }

};
