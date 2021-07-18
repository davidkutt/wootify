<template>
  <v-container>
    <div>
      <v-subheader>{{ title }}</v-subheader>
    </div>
    <v-row>
      <v-col v-for="product in products" :key="product.id"
             cols="12"
             sm="4">
        <Item :product="product"></Item>
      </v-col>
    </v-row>
    <v-container v-if="itemsEmpty">
      <ItemsEmpty></ItemsEmpty>
    </v-container>
    <v-snackbar v-model="snackbarShown">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="teal"
            text
            v-bind="attrs"
            @click="snackbarShown = false">
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>

import FilterProductsMixin from "../../mixins/FilterProductsMixin";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";
import ItemsEmpty from "@/components/Items/ItemsEmpty";
import Item from "@/components/Items/Item";

export default {
  name: "ItemList",
  components: { Item, ItemsEmpty },
  data: () => ({
    showDescriptionId: -1,
    snackbarText: "",
    snackbarShown: false,
    products: [],
    itemsEmpty: false
  }),
  props: {
    title: String
  },
  mounted() {
    this.products = this.$store.getters.getProducts;
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // TODO: Find a better way
      // Polymorphism?
      // On-notation???

      if (mutation.type === MutationsEnum.SEARCH) {
        this.products = FilterProductsMixin.searchProducts(state);
      }

      if (mutation.type === MutationsEnum.FILTER) {
        this.products = FilterProductsMixin.filterProducts(state);
      }

      this.itemsEmpty = !this.products?.length;
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  mixins: [FilterProductsMixin]
};
</script>

<style scoped>
</style>
