<template>
  <v-container>
    <v-subheader>Über dieses Projekt</v-subheader>
    <v-card
        v-for="item in items" v-bind:key="item.id"
        class="mb-6">
      <v-card-text class="pb-0">
        <p class="text-h4 text--primary">
          {{ item.title }}
        </p>
        <div class="text--primary">
          <p v-html="item.description"></p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="item.expandTitle"
               text
               color="orange lighten-2"
               @click="revealId = item.id">
          Mehr Infos
        </v-btn>
        <v-btn v-if="item.link"
               text
               target="_blank"
               :href="item.link"
               color="orange lighten-2">
          MEHR INFOS
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
            v-if="revealId === item.id"
            class="transition-fast-in-fast-out v-card--reveal full-height">
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">
              {{ item.expandTitle }}
            </p>
            <p v-html="item.expandDescription"></p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
                text
                color="orange lighten-2"
                @click="revealId = false">
              Komm mach zu
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    revealId: -1,
    items: [
      {
        id: 1, title: "Woocommerce", expandTitle: "Wooo? co? WAS??",
        description: "Hauptzweck von diesem Quatsch hier ist die API von Woocommerce auszuprobieren. <br><br> Was das genau bedeutet? Click auf \"Mehr Infos\"",
        expandDescription: "Woocommerce ist das Shopsystem von Wordpress, auf dem viele Shops von kleinen Unternehmen aufbauen. <br> Das hier ist als eine Test App dieses System in die Appstores bekommen."
      },
      {
        id: 2, title: "Technologien", expandTitle: "Technologien?",
        description: "Zweiter Grund ist es enue Technologien auszuprobieren. <br> (Bevor ich genau so einen Murks wie hier für Geld mache) <br><br> Link in der Beschreibung",
        expandDescription: "<ul><li>Vue.js</li><li>Vuetify</li><li>VueX</li><li>SASS</li></ul>"
      },
      {
        id: 3,
        title: "Über Mich",
        description: "Ich bin ein Developer aus Baden-Baden, Deutschland. <br> Mich gibt's seit '94, seit 2013 entwickle ich regelmäßg.<br> Seit 2019 verbreite ich im Frontend mein Umwesen.",
        link: "http://david-kutt.com/"
      }
    ]
  })
};
</script>
<style lang="sass">
.v-card--reveal
  bottom: 0
  opacity: 1 !important
  position: absolute
  width: 100%

.full-height
  height: 100%
</style>
