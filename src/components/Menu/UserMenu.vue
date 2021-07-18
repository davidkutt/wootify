<template>
  <v-menu
      v-model="menuData.showMenu"
      :position-x="menuData.x"
      :position-y="menuData.y"
      absolute
      :close-on-content-click="false"
      offset-y>
    <v-card v-if="loggedIn">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="../../assets/portrait_1_small.jpg"
                 alt="David">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>David Kutt</v-list-item-title>
            <v-list-item-subtitle>Softwareentwickler</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="menuData.showMenu = false; loggedIn = false">
          Log Out
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="!loggedIn" class="pa-5">
      <v-form v-model="valid">

        <v-subheader class="pl-0">{{ registered ? "Jetzt anmelden" : "Jetzt registrieren" }}</v-subheader>
        <v-text-field class="py-0" :rules="emailRules" v-model="email"></v-text-field>
        <v-text-field class="py-0"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordRules"
                      v-model="password"
                      @click:append="showPassword = !showPassword"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'">
        </v-text-field>
        <v-alert
            dense
            outlined
            text
            v-if="error"
            type="error">
          {{ error }}
        </v-alert>
        <v-row class="pt-5">
          <v-btn
              color="teal"
              text
              @click="handleAuth()">
            {{ registered ? "Anmelden" : "Registrieren" }}
          </v-btn>
          <v-btn
              color="secondary"
              text
              @click="toggleRegistered()">
            {{ registered ? "Registrieren" : "Anmelden" }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-menu>
</template>
<script>

import { MenuModel } from "@/models/MenuModel";
import WordpressService from "@/services/WordpressService";

const wordpressService = new WordpressService();

export default {
  name: "UserMenu",
  data: () => ({
    valid: false,
    loggedIn: false,
    registered: true,
    email: "",
    password: "",
    showPassword: false,
    error: "",
    errorCodes: { "registration-error-email-exists": "Email existiert bereits, logge dich bitte ein" },
    emailRules: [
      value => !!value || "Email Adresse verpflichtend",
      value => (value || "").length <= 20 || "Max 20 characters",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Ungültige Email Adresse";
      }
    ],
    passwordRules: [
      value => !!value || "Passwort verpflichtend.",
      value => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return pattern.test(value) || "Ungültiges Passwort";
      }
    ]
  }),
  methods: {
    async handleAuth() {

      if (!this.email || !this.password) {
        return;
      }

      let promise = !this.registered
          ? wordpressService.signUp(this.email, this.password)
          : wordpressService.login(this.email, this.password);

      promise.then((result) => {
        console.log(result);
        this.registered = !this.registered;
        this.error = "";
      }).catch((error) => {
        this.error = this.errorCodes[error?.response?.data?.code] || "Unbekannter Fehler";
      });
    },
    toggleRegistered() {
      this.registered = !this.registered;
    }
  },
  props: {
    menuData: new MenuModel()
  }
};
</script>

<style scoped>

</style>
