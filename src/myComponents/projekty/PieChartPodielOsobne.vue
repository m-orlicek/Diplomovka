<template>
    <v-card class="flex-grow-1">
        <v-toolbar v-if="!longText" flat >
            <v-toolbar-title style="white-space: normal;">Podiel na {{ projekt.title }}</v-toolbar-title>
        </v-toolbar>
      <v-toolbar v-else flat extended>
        <v-toolbar-title class="mt-8" style="white-space: normal;">Podiel na {{ projekt.title }}</v-toolbar-title>
      </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="pie"
                height="425px"
                :options="pieChart.chartOptions"
                :series="pieChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

const themeColors = ['#ffa300', '#00365c', '#ff7a3d', '#3a4077',
  '#f5595f', '#704586', '#d44879', '#a64587']
export default {
  name: "ApexPieCharts",
  props: ['projekt'],
  longText: false,
  data: () => ({
    pieChart: {
      series: [1149.65, 301.36, 0.06, 0.23],
      chartOptions: {
        labels: ['no data', 'no data', 'no data', 'no data'],
        colors: themeColors,
        legend: {
          position: 'right'
        }
      }
    },
  }),
  components: {
    VueApexCharts
  },
  methods: {
    updateChart() {
      var roky = this.getYears;
      var podiely = this.getPodiely;
      if (this.projekt.title.length > 100) {
        this.longText = true;
      } else {
        this.longText = false;
      }
      this.pieChart = {
        series:  podiely,
        chartOptions: {
          labels: roky,
          colors: themeColors
        }
      }
    }
  },
  computed: {
    getYears() {
      var roky = [];
      for (var index = 0; index < this.projekt.detaily.length; ++index) {
        roky.push(this.projekt.detaily[index].rok)
      }
      return roky;
    },
    getPodiely() {
      var podiely = [];
      for (var index = 0; index < this.projekt.detaily.length; ++index) {
        if (this.projekt.detaily[index].podiel != null)
          podiely.push(parseFloat(this.projekt.detaily[index].podiel));
        else
          podiely.push(parseFloat("0.00"));
      }
      return podiely;
    }
  },
  watch: {
    projekt: function() {
      this.updateChart()
    }
  },
  mounted() {
    this.updateChart();
  }
};
</script>


