<template>
  <v-container>
    <!-- <Gallery></Gallery> -->
    <ItemList :title="'Alle Artikel'"></ItemList>
  </v-container>
</template>

<script>

import ItemList from "@/components/Items/ItemList";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  name: "Home",
  data: () => ({
    products: []
  }),
  components: {
    ItemList
  },
  created() {
    this.$store.dispatch(MutationsEnum.INIT_PRODUCTS).then(() => {
      this.$store.dispatch(MutationsEnum.FILTER, "");
    });
  },
  methods: {}
};
</script>
