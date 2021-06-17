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
  methods: {

  },
  created() {
    this.$store.dispatch(MutationsEnum.FILTER, FilterTypes.SALE);
    this.$store.dispatch(MutationsEnum.INIT_PRODUCTS);
  },
};
</script>
