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
            @change="getZoznamProjektov(); progress = true;"
        ></v-select>
      </v-col>
      <v-col
          class="mb-7"
          cols="12"
          sm="6">
        <v-progress-circular
            v-show="progress"
            indeterminate
            color="primary"
        ></v-progress-circular>
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
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <PieChartSkratkyProjekty :zoznam="zoznamProjektov"></PieChartSkratkyProjekty>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableProjekty from "@/myComponents/projekty/TableProjekty";
import ColumnChartProjekty from "@/myComponents/projekty/ColumnChartProjekty";
import PieChartSkratkyProjekty from "@/myComponents/projekty/PieChartSkratkyProjekty";
import axios from "axios";

export default {
  name: "ProjektyFakulta",
  components: {
    TableProjekty,
    ColumnChartProjekty,
    PieChartSkratkyProjekty
  },
  data: () => ({
    page: {
      title: "Projekty"
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
    zobrazPrehladProjektov: false,
    zvolenaFakulta: null,
    fakulty: [],
    zoznamProjektov: []
  }),
  methods: {
    nastavComponent() {
      this.component = "ColumnChartProjekty"
    },
    async getZoznamProjektov() {
      var zoznam = [];
      const data = {
        "pracovisko": "UKF" + this.zvolenaFakulta
      }
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-pracovisko', data)
          .then(function( response ){
            response.data.zoznam.forEach((value) => {
              zoznam.push(value);
            });
          }.bind(this));
      this.zoznamProjektov = zoznam;
      this.zobrazPrehladProjektov = true;
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
