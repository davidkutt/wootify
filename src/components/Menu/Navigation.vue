<template>
  <v-navigation-drawer v-model="drawer" app>
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
    <v-list dense nav>
      <div v-for="item in items" v-bind:key="item.title">
        <v-divider></v-divider>
        <v-list-item
            :key="item.title"
            link
            :to="item.to">
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
</template>

<script>
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  name: "Navigation",
  data: () => ({
    drawer: null,
    items: [
      { title: "Alle Artikel", icon: "mdi-shopping-outline", to: "/" },
      { title: "Angebote", icon: "mdi-tag-heart-outline", to: "/filtered/sale" },
      { title: "Über dieses Projekt", icon: "mdi-help-circle-outline", to: "/about" }
    ]
  }),
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === MutationsEnum.SET_CATEGORIES) {
        this.addCategoriesToMenu(state.categories);
      }

      if (mutation.type === MutationsEnum.NAVIGATION_OPEN) {
        this.drawer = true;
      }
    });
  },
  methods: {
    addCategoriesToMenu(categories) {
      const lastItem = this.items[this.items.length - 1];
      this.items.splice(this.items.indexOf(lastItem), 1);
      const newItems = categories.map(category => {
        return { title: category.name, to: `/filtered/${category.slug}`, filter: category.slug };
      });
      this.items = this.items.concat(newItems);
      this.items.push(lastItem);
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>
<style scoped>
</style>
