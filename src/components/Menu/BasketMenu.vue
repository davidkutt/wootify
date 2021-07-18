<template>
  <v-menu
      v-model="menuData.showMenu"
      :position-x="menuData.x"
      :position-y="menuData.y"
      absolute
      :close-on-content-click="false"
      offset-y>
    <v-card class="pa-5">
      <h2>Dein Warenkorb</h2>
      <v-container v-if="flatItems && flatItems">
        <v-item-group v-for="item in flatItems" :key="item[0].id">
          <v-subheader>{{ item[0].name }}</v-subheader>
          <v-row>
            <v-img height="50" width="50"
                   :src="item[0].images[0].src">
            </v-img>
            <v-text-field class="counter pl-5"
                          v-model="item.length"
                          type="number"
                          label="Anzahl">
            </v-text-field>
          </v-row>
        </v-item-group>
      </v-container>
      <v-btn
          class="mt-5"
          color="teal"
          text
          @click="checkout()">
        Zum Checkout
      </v-btn>
    </v-card>
  </v-menu>
</template>
<script>

import { MenuModel } from "@/models/MenuModel";
import WooService from "@/services/WooService";

const wooService = new WooService();

export default {
  name: "BasketMenu",
  data: () => ({
    valid: false,
    loggedIn: false,
    registered: true,
    email: "",
    password: "",
    showPassword: false,
    error: "",
    flatItems: []
  }),
  watch: {
    cartItems: function(items) {
      const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      this.flatItems = groupBy(items, "id");
      // this.flatItems = this.flatItems.forEach(items => {
      //   items[0].size = items.length;
      // });
      console.log(this.flatItems);
    }
  },
  created() {
    const orders = wooService.getOrders();
    console.log(orders);
  },
  methods: {
    checkout() {
      wooService.placeOrder();
    }
  },
  props: {
    menuData: new MenuModel(),
    cartItems: []
  }
};
</script>

<style scoped>
.counter {
  width: 20px;
}
</style>
