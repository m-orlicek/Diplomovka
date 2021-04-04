<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
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
              @change="getZoznamProjektov"
          ></v-select>
        </v-col>
      </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TableProjekty :zoznam="zoznamProjektov"></TableProjekty>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12" lg="6">
        <component :is="component" :zoznam="zoznamProjektov"></component>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <component :is="component" :zoznam="zoznamProjektov"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableProjekty from "@/myComponents/projekty/TableProjekty";
import ColumnChartProjekty from "@/myComponents/projekty/ColumnChartProjekty";
import axios from "axios";

export default {
  name: "ProjektyKatedra",
  components: {
    TableProjekty,
    ColumnChartProjekty
  },
  data: () => ({
    page: {
      title: "Projekty"
    },
    breadcrumbs: [
      {
        text: "Katedrový prehľad",
        disabled: true
      }
    ],
    component: null,
    vybranaFakulta: false,
    zobrazPrehladProjektov: false,
    zvolenaFakulta: null,
    zvolenaKatedra: null,
    katedry: [],
    fakulty: [],
    zoznamProjektov: []
  }),
  methods: {
    nastavComponent() {
      this.component = "ColumnChartProjekty"
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
    async getZoznamProjektov(katedra) {
      this.zoznamProjektov = [];
      const data = {
        "pracovisko": "UKF" + this.zvolenaFakulta + katedra
      }
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-pracovisko', data)
          .then(function( response ){
            response.data.zoznam.forEach((value) => {
              this.zoznamProjektov.push(value);
            });
          }.bind(this));
      console.log(this.zoznamProjektov);
      this.zobrazPrehladProjektov = true;
      this.nastavComponent();
    }
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
