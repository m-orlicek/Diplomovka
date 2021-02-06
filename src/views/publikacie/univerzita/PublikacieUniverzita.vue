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
import PieChartHodnotenie from "@/views/publikacie/univerzita/apexcharts/PieChartHodnotenie";
import TableSimpleDense from "@/views/publikacie/univerzita/table-data/TablePublikacieUniverzita";
import PieChartPriemer from "@/views/publikacie/univerzita/apexcharts/PieChartPriemer";

export default {
  name: "PublikacieUniverzita",
  components: {
    PieChartHodnotenie,
    TableSimpleDense,
    PieChartPriemer
  },
  data: () => ({
    page: {
      title: "Publikácie"
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
