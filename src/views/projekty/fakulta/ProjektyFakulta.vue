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
import TableSimpleDense from "@/views/projekty/fakulta/table-data/TableProjektyFakulta";
import PieChartHodnotenie from "@/views/projekty/fakulta/apexcharts/PieChartHodnotenie";
import PieChartPriemer from "@/views/projekty/fakulta/apexcharts/PieChartPriemer";

export default {
  name: "ProjektyFakulta",
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
        text: "Fakultový prehľad",
        disabled: true
      }
    ]
  })
};
</script>
