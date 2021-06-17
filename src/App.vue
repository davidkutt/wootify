<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 pt-3">
            Davids Shop
          </v-list-item-title>
          <v-list-item-subtitle>
            Entdecke tolle Angebote
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list
          dense
          nav
      >
        <div v-for="item in items" v-bind:key="item.title">
          <v-divider></v-divider>
          <v-list-item
              :key="item.title"
              link
              :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        absolute
        color="teal accent-4"
        dark
        hide-on-scroll
        scroll-target="#scrolling-techniques-2">
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
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
          prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn icon @click="show">
        <v-badge v-if="cartItems && cartItems.length"
                 color="green"
                 :content="cartItems.length">
          <v-icon>mdi-basket</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon @click="show">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>
    <v-sheet
        id="scrolling-techniques-2"
        class="overflow-y-auto"
        max-height="600"
    >
    </v-sheet>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-menu
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
    >
      <v-card><v-card-text>hi</v-card-text></v-card>
    </v-menu>
  </v-app>
</template>

<script>
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    searchClosed: true,
    showCategories: false,
    searchTerm: "",
    drawer: null,
    mini: null,
    items: [
      { title: "Alle Artikel", icon: "mdi-shopping-outline", to: "/" },
      { title: "Angebote", icon: "mdi-tag-heart-outline", to: "/filtered/sale" },
      { title: "Über Uns", icon: "mdi-help-circle-outline", to: "/about" }
    ]
  }),
  methods: {
    searchProducts() {
      this.$store.dispatch("search", this.searchTerm);
    },
    addCategoriesToMenu(categories) {
      const lastItem = this.items[this.items.length - 1];
      this.items.splice(this.items.indexOf(lastItem), 1);
      const newItems = categories.map(category => {
        return { title: category.name, to: `/filtered/${category.slug}`, filter: category.slug };
      });
      this.items = this.items.concat(newItems);
      this.items.push(lastItem);
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY + 20;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
  },
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    }
  },
  created() {
    this.$store.dispatch(MutationsEnum.INIT_CATEGORIES);

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === MutationsEnum.SET_CATEGORIES) {
        this.addCategoriesToMenu(state.categories);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
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
