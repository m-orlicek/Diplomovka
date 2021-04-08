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
            @change="nastavRoky(); rok_vydania = null;"
        ></v-select>
      </v-col>
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-select
            :items="roky"
            label="Rok"
            v-model="rok_vydania"
            solo
            v-show="vybranaFakulta"
            @change="getZoznamPublikacii(); progress = true; getPocty();"
        ></v-select>
      </v-col>
      <v-progress-linear
          v-show="progress"
          indeterminate
          color="primary"
      ></v-progress-linear>
    </v-row>
    <v-row v-show="zobrazPrehladPublikacii">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TablePublikacie :zoznam="zoznamPublikacii"></TablePublikacie>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladPublikacii">
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <component class="mt-3 mb-3" :is="component" :zoznam="zoznamPublikacii"></component>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12" lg="6" style="flex-direction:column">
        <v-col>
          <PieChartPublikacieKategorie :zoznam="zoznamPublikacii"></PieChartPublikacieKategorie>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <PieChartPublikaciePocetPreKatedry :katedry="katedry" :pocty="pocty"></PieChartPublikaciePocetPreKatedry>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablePublikacie from "@/myComponents/publikacie/TablePublikacie";
import ColumnChartPublikacieFakulta from "@/myComponents/publikacie/ColumnChartPublikacieFakulta";
import PieChartPublikacieKategorie from "@/myComponents/publikacie/PieChartPublikacieKategorie";
import PieChartPublikaciePocetPreKatedry from "@/myComponents/publikacie/PieChartPublikaciePocetPreKatedry";
import axios from "axios";

export default {
  name: "PublikacieFakulta",
  components: {
    TablePublikacie,
    ColumnChartPublikacieFakulta,
    PieChartPublikacieKategorie,
    PieChartPublikaciePocetPreKatedry
  },
  data: () => ({
    page: {
      title: "Publikácie"
    },
    breadcrumbs: [
      {
        text: "Fakultový prehľad",
        disabled: true
      }
    ],
    progress: false,
    component: null,
    vybranaFakulta: false,
    zobrazPrehladPublikacii: false,
    zvolenaFakulta: null,
    roky: [],
    rok_vydania: null,
    fakulty: [],
    katedry: [],
    pocty: [],
    zoznamPublikacii: []
  }),
  methods: {
    nastavComponent() {
      this.component = "ColumnChartPublikacieFakulta"
    },
    nastavRoky(){
      const currentYear = (new Date()).getFullYear();
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      var roky = range(currentYear, 1970, -1);
      if (this.zvolenaFakulta === "FFA") roky.push(1966);
      this.roky = roky;
      this.vybranaFakulta = true;
      this.getKatedry();
    },
    async getZoznamPublikacii() {
      var zoznam = [];
      const data = {
        "pracovisko": "UKF" + this.zvolenaFakulta,
        "rok_vydania": this.rok_vydania
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-pracovisko', data)
          .then(function( response ){
            response.data.zoznam.forEach((value) => {
              zoznam.push(value);
            });
          }.bind(this));
      this.zoznamPublikacii = zoznam;
      this.zobrazPrehladPublikacii = true;
      this.nastavComponent();
      this.progress = false;
    },
    getKatedry() {
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
    getPocty(){
      this.pocty = [];
      for (var index=0; index<this.katedry.length;index++) {
        const data = {
          "pracovisko": "UKF" + this.zvolenaFakulta + this.katedry[index],
          "rok_vydania": this.rok_vydania,
        }
        axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-pracovisko', data)
            .then(function (response) {
              this.pocty.push(response.data.zoznam.length);
            }.bind(this));
      }
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
