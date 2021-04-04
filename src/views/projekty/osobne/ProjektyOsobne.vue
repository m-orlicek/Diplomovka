<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TableProjektyOsobne @projektEmit="projektEmitMethod" :zoznam="zoznamProjektov"></TableProjektyOsobne>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladProjektov">
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <ColumnChartProjekty :zoznam="zoznamProjektov"></ColumnChartProjekty>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <PieChartPodielOsobne :projekt="projektEmit"></PieChartPodielOsobne>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableProjektyOsobne from "@/myComponents/projekty/TableProjektyOsobne";
import PieChartPodielOsobne from "@/myComponents/projekty/PieChartPodielOsobne";
import ColumnChartProjekty from "@/myComponents/projekty/ColumnChartProjekty";
import axios from "axios";
import store from "@/store/store";

export default {
  name: "ProjektyOsobne",
  components: {
    TableProjektyOsobne,
    PieChartPodielOsobne,
    ColumnChartProjekty
  },
  data: () => ({
    page: {
      title: "Projekty"
    },
    breadcrumbs: [
      {
        text: "Osobný prehľad",
        disabled: true
      }
    ],
    projektEmit: null,
    component: null,
    zobrazPrehladProjektov: false,
    zvolenaFakulta: null,
    zvolenaKatedra: null,
    katedry: [],
    fakulty: [],
    zoznamProjektov: []
  }),
  methods: {
    projektEmitMethod (value) {
      this.projektEmit = value;
    },
    nastavComponent() {
      this.component = "ColumnChartProjekty"
    },
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
    await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-projekty-zamestnanca', data)
        .then(function( response ){
          this.zoznamProjektov = response.data.zoznam;
          this.projektEmit = response.data.zoznam[0];
        }.bind(this));
    this.zobrazPrehladProjektov = true;
    this.nastavComponent();
  }
};
</script>
