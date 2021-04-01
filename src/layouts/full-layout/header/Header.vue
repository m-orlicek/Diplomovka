<template>
  <v-app-bar app clipped-left clipped-right color="primary">
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <img src="../../../assets/images/logo-UKF.png" width="75" height="75"/>
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/ukf-logo-text.png" class="mt-2" width="95" height="55"/>
      </span>
    </v-toolbar-title>
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->
    <v-spacer />
    <!---right part -->
    <!---Logout -->
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mr-1" @click="onLogout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-menu>
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showLogo: false
  }),

  computed: {
    ...mapState(["Sidebar_drawer"])
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function() {
      this.showLogo = !this.showLogo;
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.descpart {
  max-width: 220px;
}
.v-application .v-item-group .v-sidebar_active {
  border:1px solid black !important;
}
</style>
