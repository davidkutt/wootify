<template>
  <v-card
      class="pa-2"
      outlined
      tile>
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate>
      </v-progress-linear>
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
              text-color="white">
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
          <div>
            {{ product.description }}
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { ProductModel } from "@/models/ProductModel";
import { MutationsEnum } from "@/enums/vuex/MutationsEnum";

export default {
  name: "Item",
  props: {
    product: new ProductModel()
  },
  data: () => ({
    showDescriptionId: 0
  }),
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
};
</script>

<style lang="sass">
.cart-icon
  right: 0

.strikethrough
  text-decoration: line-through
</style>
