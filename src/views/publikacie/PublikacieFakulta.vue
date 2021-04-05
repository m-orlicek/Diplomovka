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
            @change="nastavRoky();"
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
            @change="getZoznamPublikacii(); progress = true;"
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
      <v-col class="d-flex"  cols="12" sm="12" lg="6">
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
import PieChartPublikacieKategorie from "@/myComponents/publikacie/PieChartPublikacieKategorie"
import axios from "axios";

export default {
  name: "PublikacieFakulta",
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
      this.vybranaFakulta = true;
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
