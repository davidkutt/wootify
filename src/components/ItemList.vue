<template>
  <v-container>
    <div>
      <v-subheader>{{ title }}</v-subheader>
    </div>
    <v-row>
      <v-col v-for="product in products" :key="product.id"
             cols="12"
             sm="4">
        <v-card
            class="pa-2"
            outlined
            tile>
          <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="250"
                 :src="product.images[0].src">
            <v-btn @click="addToCart(product)" class="cart-icon" color="orange lighten-2" large icon absolute fab>
              <v-icon>mdi-basket</v-icon>
            </v-btn>
          </v-img>
          <v-card-title><p class="mr-2 my-0">{{ product.name }}</p>
            <v-chip v-if="product.on_sale"
                    color="pink lighten-2"
                    label
                    text-color="white"
            >
              <v-icon left>
                mdi-tag-heart-outline
              </v-icon>
              SALE
            </v-chip>
          </v-card-title>
          <v-container class="pa-0" v-if="product.regular_price && product.on_sale">
            <v-card-text color="red darken-2" class="py-0 text-subtitle-1 font-weight-light strikethrough">
              {{ product.regular_price }} €
            </v-card-text>
          </v-container>
          <v-card-text class="py-0 text-subtitle-1">
            {{ product.price }} €
          </v-card-text>
          <v-card-actions class="py-0">
            <v-btn @click="toggleShowDescription(product.id)"
                   color="orange lighten-2"
                   text>
              MEHR
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="toggleShowDescription(product.id)">
              <v-icon>{{ showDescriptionId === product.id ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showDescriptionId === product.id">
              <v-divider></v-divider>
              <v-card-text>
                <div>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
                  amet
                  quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo
                </div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-container v-if="itemsEmpty">
      <ItemsEmpty></ItemsEmpty>
    </v-container>
    <v-snackbar
        v-model="snackbarShown"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="orange lighten-2"
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

import FilterProductsMixin from "../mixins/FilterProductsMixin";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";
import ItemsEmpty from "@/components/ItemsEmpty";

export default {
  name: "ItemList",
  components: { ItemsEmpty },
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

      if (mutation.type === MutationsEnum.SEARCH) {
        this.products = FilterProductsMixin.searchProducts(state);
      }

      if (mutation.type === MutationsEnum.FILTER) {
        this.products = FilterProductsMixin.filterProducts(state);
      }

      this.itemsEmpty = !this.products?.length;
    });
  },
  methods: {
    toggleShowDescription(id) {
      this.showDescriptionId = this.showDescriptionId === id ? -1 : id;
    },
    addToCart(product) {
      this.snackbarText = "Produkt zu Warenkorb hinzugefügt";
      this.snackbarShown = true;
      this.$store.dispatch(MutationsEnum.ADD_TO_CART, product);
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  mixins: [FilterProductsMixin]
};
</script>

<style scoped>
.cart-icon {
  right: 0;
}

.strikethrough {

  text-decoration: line-through;
}
</style>
