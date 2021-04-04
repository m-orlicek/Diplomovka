<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row v-show="zobrazPrehladPublikacii">
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TablePublikacieOsobne :zoznam="zoznamPublikacii"></TablePublikacieOsobne>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row v-show="zobrazPrehladPublikacii">
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <ColumnChartPublikacie :zoznam="zoznamPublikacii"></ColumnChartPublikacie>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12" lg="6">
        <PieChartPublikaciePodielOsobne :zoznam="zoznamPublikacii"></PieChartPublikaciePodielOsobne>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TablePublikacieOsobne from "@/myComponents/publikacie/TablePublikacieOsobne";
import PieChartPublikaciePodielOsobne from "@/myComponents/publikacie/PieChartPublikaciePodielOsobne";
import ColumnChartPublikacie from "@/myComponents/publikacie/ColumnChartPublikacie";
import axios from "axios";
import store from "@/store/store";

export default {
  name: "PublikacieOsobne",
  components: {
    TablePublikacieOsobne,
    PieChartPublikaciePodielOsobne,
    ColumnChartPublikacie
  },
  data: () => ({
    page: {
      title: "Publikácie"
    },
    breadcrumbs: [
      {
        text: "Osobný prehľad",
        disabled: true
      }
    ],
    component: null,
    zobrazPrehladPublikacii: false,
    zoznamPublikacii: []
  }),
  methods: {
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
      "epc_id": 68178
    };
    await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-zamestnanca', data)
        .then(function( response ){
          this.zoznamPublikacii = response.data.zoznam;
        }.bind(this));
    this.zobrazPrehladPublikacii = true;
    this.nastavComponent();
  }
};
</script>
