<template>
  <v-app-bar
      app
      absolute
      color="teal accent-4"
      dark
      hide-on-scroll
      scroll-target="#scrolling-techniques-2">
    <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>
    <v-app-bar-nav-icon @click="openNavigation()"></v-app-bar-nav-icon>
    <Search></Search>
    <v-spacer></v-spacer>
    <v-btn icon @click="showMenu($event, basketMenuData)">
      <v-badge v-if="cartItems && cartItems.length"
               color="green"
               :content="cartItems.length">
        <v-icon>mdi-basket</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon @click="showMenu($event, userMenuData)">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <UserMenu :menu-data="userMenuData"></UserMenu>
    <BasketMenu :menu-data="basketMenuData" :cart-items="cartItems"></BasketMenu>
  </v-app-bar>
</template>

<script>
import UserMenu from "@/components/Menu/UserMenu";
import BasketMenu from "@/components/Menu/BasketMenu";
import { MenuModel } from "@/models/MenuModel";
import Search from "@/components/Menu/SearchBar";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  name: "Header",
  components: {
    Search,
    UserMenu,
    BasketMenu
  },
  data: () => ({
    userMenuData: new MenuModel(),
    basketMenuData: new MenuModel(),
  }),
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    }
  },
  methods: {
    showMenu(e, menu) {
      e.preventDefault();
      menu.showMenu = true;
      menu.x = e.clientX;
      menu.y = e.clientY + 20;
      this.$nextTick(() => {
        menu.showUserMenu = true;
      });
    },
    openNavigation() {
      this.$store.dispatch(MutationsEnum.NAVIGATION_OPEN, true);
    }
  }
};
</script>

<style lang="sass">

</style>
