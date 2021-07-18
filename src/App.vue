<template>
  <v-app id="inspire">
    <Navigation></Navigation>
    <Header></Header>
    <v-sheet
        id="scrolling-techniques-2"
        class="overflow-y-auto"
        max-height="600">
    </v-sheet>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";
import Navigation from "@/components/Menu/Navigation";
import Header from "@/components/Menu/Header";

export default {
  components: { Header, Navigation },
  created() {
    this.$store.dispatch(MutationsEnum.INIT_CATEGORIES);
  }
};
</script>
<style lang="sass">
</style>
