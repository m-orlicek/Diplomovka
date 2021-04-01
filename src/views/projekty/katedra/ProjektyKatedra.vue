<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-container fluid>
      <v-row align="center">
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-select
              :items="fakulty"
              label="Fakulta"
              v-model="zvolenaFakulta"
              solo
              @change="zobrazKatedry()"
          ></v-select>
        </v-col>
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-select
              :items="katedry"
              label="Katedra"
              v-model="zvolenaKatedra"
              solo
              v-show="vybranaFakulta"
              @change="getZamestnanciKatedry()"
          ></v-select>
        </v-col>
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-btn @click="zobrazPrehladProjektov = true; nastavComponent()">Zobraz prehľad</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TableSimpleDense :zoznam="upravimeSiZoznam"></TableSimpleDense>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12" lg="6">
        <component :is="component" :zoznam="upravimeSiZoznam"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableSimpleDense from "@/views/projekty/katedra/table-data/TableProjektyKatedra";
import PieChartPriemer from "@/views/projekty/katedra/apexcharts/PieChartPriemer";
import ApexColumnCharts from "@/views/projekty/katedra/apexcharts/ApexColumnCharts";
import axios from "axios";

export default {
  name: "ProjektyKatedra",
  components: {
    TableSimpleDense,
    PieChartPriemer,
    ApexColumnCharts
  },
  data: () => ({
    page: {
      title: "Projekty"
    },
    component: null,
    vybranaFakulta: false,
    zobrazPrehladProjektov: false,
    zvolenaFakulta: null,
    zvolenaKatedra: null,
    breadcrumbs: [
      {
        text: "Katedrový prehľad",
        disabled: true
      }
    ],
    katedry: [],
    fakulty: [],
    zamestnanci: [],
    zoznamProjektov: []
  }),
  methods: {
    nastavComponent() {
      this.component = "ApexColumnCharts"
    },
    zobrazKatedry() {
      this.katedry = [];
      const data = {
        "fakulta": this.zvolenaFakulta
      }
      this.vybranaFakulta = true;
      axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-full-katedry', data)
          .then(function( response ){
            for (var index = 0; index < response.data.katedry.length; ++index) {
              this.katedry.push(response.data.katedry[index].substring(6));
            }
          }.bind(this));
    },
    async getZamestnanciKatedry() {
      this.zamestnanci = [];
      const data = {
        "katedra": "UKF" + this.zvolenaFakulta + this.zvolenaKatedra
      }
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-zamestnanci-katedry', data)
          .then(function( response ){
            for (var index = 0; index < response.data.zamestnanci.length; ++index) {
              this.zamestnanci.push(response.data.zamestnanci[index].epc_id);
            }
            this.zoznamProjektov = [];
            for (const value of this.zamestnanci) {
              this.getZoznamProjektov(value)
            }
          }.bind(this));

      this.konecnyZoznam = this.zoznamProjektov
    },
    getZoznamProjektov(epc_id) {
      const data = {
        "epc_id": epc_id
      }
      axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-zamestnanca', data)
          .then(function( response ){
            response.data.zoznam.forEach((value) => {
              this.zoznamProjektov.push(value);
            })
          }.bind(this));
    },
    upravZoznam() {
      var uzPridaneProjektId = {};
      var zoznam = this.konecnyZoznam;
      zoznam = zoznam.filter(function(currentObject) {
        if (currentObject.projekt_id in uzPridaneProjektId) {
          return false;
        } else {
          uzPridaneProjektId[currentObject.projekt_id] = true;
          return true;
        }
      });
      function compare(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        let comparison = 0;
        if (titleA > titleB) {
          comparison = 1;
        } else if (titleA < titleB) {
          comparison = -1;
        }
        return comparison;
      }
      return zoznam.sort(compare)
    }
  },
  computed:{
    konecnyZoznam: []
  },
  created(){
    axios.get('https://app.vykony.ki.fpv.ukf.sk/get-epc-full-fakulty')
        .then(function( response ){
          let f = response.data.fakulty;
          f = f.filter((i) => {
            let first3Letters = i.substring(0,3)
            return first3Letters === "UKF"
          });
          for (var index = 0; index < f.length; ++index) {
            this.fakulty.push(f[index].substring(3));
          }
        }.bind(this));
  }
};
</script>
