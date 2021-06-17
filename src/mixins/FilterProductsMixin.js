export default {

  searchProducts(products, type, filter) {

    if (!filter) {
      return products;
    }

    if (type === "search") {
      return products.filter(product => product?.name?.includes(filter));
    }

    return products;
  }

};
