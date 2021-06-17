<template>
  <v-container>
    <ItemList :title="'Aktuelle Angebote'"></ItemList>
  </v-container>
</template>

<script>

import ItemList from "@/components/ItemList";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";
import { FilterTypes } from "@/enums/FilterTypes";

export default {
  name: "Home",
  data: () => ({
    products: []
  }),
  components: {
    ItemList
  },
  computed: {
    cartItems() {
      return this.$store.getters.getFilters;
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch(MutationsEnum.FILTER, to.params.filter);
    }
  },
  created() {
    this.$store.dispatch(MutationsEnum.INIT_PRODUCTS).then (()=> {
      const filter = this.$route.params?.filter ? this.$route.params?.filter : FilterTypes.SALE;
      this.$store.dispatch(MutationsEnum.FILTER, filter);
    });
  }
};
</script>
