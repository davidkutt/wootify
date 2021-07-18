<template>
  <v-text-field
      class="expanding-search pt-6 "
      :class="{'closed' : searchClosed}"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
      placeholder="Suche"
      v-model="searchTerm"
      @change="searchProducts()"
      filled
      dense
      prepend-inner-icon="mdi-magnify">
  </v-text-field>
</template>

<script>
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  name: "Search",
  data: () => ({
    searchClosed: true,
    searchTerm: ""
  }),
  methods: {
    searchProducts() {
      this.$store.dispatch(MutationsEnum.SEARCH, this.searchTerm);
    }
  }
};
</script>

<style lang="sass">
.expanding-search
  transition: max-width 0.3s

  .v-input__slot
    &:before, &:after
      border-color: transparent !important

  &.closed
    max-width: 45px

    .v-input__slot
      background: transparent !important
</style>
