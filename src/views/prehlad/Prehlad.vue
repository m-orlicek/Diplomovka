<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row align="center">
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>
    </v-row>
    <v-row align="top"  v-show="zobrazPrehlady">
      <v-col class="d-flex">
        <BaseCard heading="Posledných 5 projektov">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr
                v-for="item in zoznamProjektov"
                :key="item.projekt_id"
            >
              <td>{{ item.title }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        </BaseCard>
      </v-col>
      <v-col class="d-flex">
        <BaseCard heading="Posledných 5 publikácií">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr
                v-for="item in zoznamPublikacii"
                :key="item.nazov"
            >
              <td>{{ item.nazov }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheRevenueCards from "@/myComponents/karty-prehladu/KartyPrehladu";
import axios from "axios";
import store from "@/store/store";

export default {
  name: "Prehlad",
  components: {
    TheRevenueCards
  },
  data: () => ({
    page: {
      title: "Prehľad"
    },
    elementVisible: false,
    breadcrumbs: [
      {
        text: "Celkový prehľad",
        disabled: true
      }
    ],
    zoznamPublikacii: [],
    zoznamProjektov: [],
    zobrazPrehlady: false,
    watcher: true,
  }),
  methods: {
    upravZoznamy(){
      var projekty = this.zoznamProjektov;
      var publikacie = this.zoznamPublikacii;
      projekty.sort((a,b) => (a.year_from > b.year_from) ? 1 : ((b.year_from > a.year_from) ? -1 : 0))
      publikacie.sort((a,b) => (a.year_from > b.year_from) ? 1 : ((b.year_from > a.year_from) ? -1 : 0))
      this.zoznamProjektov = projekty.slice(0, 5);
      this.zoznamPublikacii = publikacie.slice(0, 5);

    }
  },
  async created(){
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
          this.zoznamPublikacii = response.data.zoznam;
        }.bind(this));
    await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-zamestnanca', data)
        .then(function( response ){
          this.zoznamProjektov = response.data.zoznam;
        }.bind(this));
    this.watcher = !this.watcher;
  },
  watch: {
    watcher: function() {
      this.upravZoznamy();
      this.zobrazPrehlady = true;
    }
  }
};
</script>
