<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Hodnoty: Model Rady Kvality UKF">
          <TableSimpleDense></TableSimpleDense>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="6">
        <PieChartHodnotenie></PieChartHodnotenie>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <PieChartPriemer></PieChartPriemer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableSimpleDense from "@/views/projekty/osobne/table-data/TableProjektyOsobne";
import PieChartHodnotenie from "@/views/projekty/osobne/apexcharts/PieChartHodnotenie";
import PieChartPriemer from "@/views/projekty/osobne/apexcharts/PieChartPriemer";
import axios from "axios";

export default {
  name: "ProjektyOsobne",
  components: {
    PieChartHodnotenie,
    TableSimpleDense,
    PieChartPriemer
  },
  data: () => ({
    page: {
      title: "Projekty"
    },
    elementVisible: false,
    breadcrumbs: [
      {
        text: "Osobný prehľad",
        disabled: true
      }
    ]
  }),
  methods: {
    zobrazKatedry() {
      let fakulta = this.zvolenaFakulta
      const data = {
        "fakulta": fakulta
      }
      this.vybranaFakulta = true;
      axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-full-katedry', data)
          .then(function( response ){
            let k = response.data.katedry;
            var index, newKatedry = [];
            for (index = 0; index < k.length; ++index) {
              newKatedry.push(k[index].substring(6));
            }
            this.katedry = newKatedry;
          }.bind(this));
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
          var index, newFakulty = [];
          for (index = 0; index < f.length; ++index) {
            newFakulty.push(f[index].substring(3));
          }
          this.fakulty = newFakulty;
        }.bind(this));
  }
};
</script>
