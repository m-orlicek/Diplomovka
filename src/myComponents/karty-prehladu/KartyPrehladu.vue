<template>
    <v-row>
      <v-col
          cols="12"
          lg="4"
          sm="6"
          v-for="revenuecard in revenuecards"
          :revenuecard="revenuecard"
          :key="revenuecard.revenuecardtitle"
          class="py-0 mb-7"
      ><v-slide-y-transition>
        <v-card v-show="zobraz">
          <v-card-text class="pa-5">
            <div class="d-flex align-center">
              <v-btn
                  :class="[revenuecard.iconcolor]"
                  class="elevation-0"
                  fab
                  dark
              >
                <v-icon>{{ revenuecard.icon }}</v-icon>
              </v-btn>
              <div class="ml-2 mr-1">
                <h2 class="headline font-weight-light">
                  {{ revenuecard.number }}
                </h2>
                <h5 class="subtitle-2 font-weight-regular">
                  {{ revenuecard.title }}
                </h5>
              </div>
            </div>
          </v-card-text>
        </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import store from "@/store/store";

export default {
  name: "TheRevenueCards",
  data: () => ({
    revenuecards: [
      {
        title: "Počet projektov celkovo",
        iconcolor: "info",
        icon: "mdi-library-shelves",
        number: "13",
      },
      {
        title: "Počet publikácii za posledné 3 roky",
        iconcolor: "warning",
        icon: "mdi-library-shelves",
        number: "31",
      },
      {
        title: "Počet publikácií celkovo",
        iconcolor: "deep-purple accent-2",
        icon: "mdi-library-shelves",
        number: "237",
      }
    ],
    zoznamProjektov: [],
    zoznamPublikacii: [],
    zobraz: false,
  }),
  methods: {
    async getPocetProjektov() {
      var zoznam = [];
      // eslint-disable-next-line no-unused-vars
      let epc_id = null;
      await axios.get('https://app.vykony.ki.fpv.ukf.sk/get-full-user-parameters', store.state.axios_config)
          .then(function( response ){
            epc_id = response.data.osobne_cislo;
          }.bind(this));
      // TODO: zmenit na epc_id
      const data = {
        "epc_id": 116998
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-zamestnanca', data)
          .then(function( response ){
            zoznam = response.data.zoznam;
          }.bind(this));
      this.zoznamProjektov = zoznam;
      this.revenuecards[0].number = zoznam.length;
    },
    async getPocetPublikacii() {
      var zoznam = [];
      // eslint-disable-next-line no-unused-vars
      let epc_id = null;
      await axios.get('https://app.vykony.ki.fpv.ukf.sk/get-full-user-parameters', store.state.axios_config)
          .then(function( response ){
            epc_id = response.data.osobne_cislo;
          }.bind(this));
      // TODO: zmenit na epc_id
      const data = {
        "epc_id": 116998
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-zamestnanca', data)
          .then(function( response ){
            zoznam = response.data.zoznam;
          }.bind(this));
      this.zoznamPublikacii = zoznam;
      this.revenuecards[1].number = zoznam.filter((obj) => (obj.rok_vydania === (new Date()).getFullYear() || obj.rok_vydania === (new Date()).getFullYear()-1 || obj.rok_vydania === (new Date()).getFullYear()-2)).length;
      this.revenuecards[2].number = zoznam.length;
      this.zobraz = true;
    }
  },
  created(){
    this.getPocetProjektov();
    this.getPocetPublikacii();
  }
};
</script>
