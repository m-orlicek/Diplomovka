<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5">
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="title font-weight-regular">Prehľad mojich projektov</h3>
          <h6 class="subtitle-2 font-weight-light">
            Data Minig vs Machine learning
          </h6>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-flex align-center">
            <div class="d-flex align-center px-2">
              <span style="color:#7FB3D5;">
                <span class="overline">
                  <i class="fa fa-circle mx-2"></i>
                </span>
                <span class="font-weight-regular">Data mining</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span style="color:#F1948A;">
                <span class="overline">
                  <i class="fa fa-circle mx-2"></i>
                </span>
                <span class="font-weight-regular">Machine learning</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="elementVisible">
        <vue-apex-charts
          type="bar"
          height="308px"
          :options="SalesoverChart.SalesoverChart.chartOptions"
          :series="SalesoverChart.SalesoverChart.series"
        ></vue-apex-charts>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesoverChart from "./SalesOverviewData";

export default {
  name: "TheSalesOverview",
  data: () => ({
    title: "TheSalesOverview",
    SalesoverChart: SalesoverChart,
    elementVisible: false,
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 10);
  },
  components: {
    VueApexCharts,
  },
};
</script>
