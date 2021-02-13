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
import TableSimpleDense from "@/views/projekty/univerzita/table-data/TableProjektyUniverzita";
import PieChartHodnotenie from "@/views/projekty/univerzita/apexcharts/PieChartHodnotenie";
import PieChartPriemer from "@/views/projekty/univerzita/apexcharts/PieChartPriemer";

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
        text: "Univerzitný prehľad",
        disabled: true
      }
    ]
  })
};
</script>
