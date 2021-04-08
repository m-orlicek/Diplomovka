<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row align="center">
      <v-col
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
      >
        <v-select
            :items="katedry"
            label="Katedra"
            v-model="zvolenaKatedra"
            solo
            v-show="vybranaFakulta"
            @change="nastavRoky();"
        ></v-select>
      </v-col>
      <v-col
      >
        <v-select
            :items="roky"
            label="Rok"
            v-model="rok_vydania"
            solo
            v-show="vybranaKatedra"
            @change="getZoznamPublikacii"
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TablePublikacie :zoznam="zoznamPublikacii"></TablePublikacie>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <component :is="component" :zoznam="zoznamPublikacii"></component>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <PieChartPublikacieKategorie :zoznam="zoznamPublikacii"></PieChartPublikacieKategorie>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablePublikacie from "@/myComponents/publikacie/TablePublikacie";
import ColumnChartPublikacie from "@/myComponents/publikacie/ColumnChartPublikacie";
import PieChartPublikacieKategorie from "@/myComponents/publikacie/PieChartPublikacieKategorie";
import axios from "axios";

export default {
  name: "PublikacieKatedra",
  components: {
    TablePublikacie,
    ColumnChartPublikacie,
    PieChartPublikacieKategorie
  },
  data: () => ({
    page: {
      title: "Publikácie"
    },
    breadcrumbs: [
      {
        text: "Katedrový prehľad",
        disabled: true
      }
    ],
    component: null,
    vybranaFakulta: false,
    vybranaKatedra: false,
    zobrazPrehladProjektov: false,
    zvolenaFakulta: null,
    zvolenaKatedra: null,
    roky: [],
    rok_vydania: null,
    katedry: [],
    fakulty: [],
    zoznamPublikacii: []
  }),
  methods: {
    nastavComponent() {
      this.component = "ColumnChartPublikacie"
    },
    nastavRoky(){
      const currentYear = (new Date()).getFullYear();
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      var roky = range(currentYear, 1970, -1);
      if (this.zvolenaFakulta === "FFA") roky.push(1966);
      this.roky = roky;
      this.vybranaKatedra = true;
      if (this.rok_vydania != null) this.getZoznamPublikacii();
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
    async getZoznamPublikacii() {
      this.zoznamPublikacii = [];
      const data = {
        "pracovisko": "UKF" + this.zvolenaFakulta + this.zvolenaKatedra,
        "rok_vydania": this.rok_vydania,
      }
      console.log(data);
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-pracovisko', data)
          .then(function( response ){
            response.data.zoznam.forEach((value) => {
              this.zoznamPublikacii.push(value);
            });
          }.bind(this));
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
