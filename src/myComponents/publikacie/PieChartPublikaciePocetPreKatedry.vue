<template>
  <v-card class="flex-grow-1">
    <v-toolbar flat >
      <v-toolbar-title style="white-space: normal;">Top 10 katedier podľa počtu publikácií</v-toolbar-title>
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
  '#f5595f', '#704586', '#fcd18f', '#a64587',
  '#d44879', '#1d77b6'];

export default {
  name: "PieChartPublikaciePodielOsobne",
  props: ['katedry', 'pocty'],
  data: () => ({
    pieChart: {
      series: [1149.65, 301.36, 430.06, 112.23, 331.09],
      chartOptions: {
        labels: ['Kategória A1', 'Kategória A2', 'Kategória B', 'Kategória C', 'Kategória D', 'Nezaradené'],
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
      var keys = this.katedry;
      var values = this.pocty;
      var result = {};
      keys.forEach((key, i) => result[key] = values[i]);
      var sortable = [];
      for (var object in result) {
        sortable.push([object, result[object]]);
      }
      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });

      var array = sortable.slice(0, 10);
      var series = [];
      var labels = [];
      for (var index=0; index < array.length; index++){
        labels.push(array[index][0])
        series.push(array[index][1])
      }
      console.log(labels);
      console.log(series);
      this.pieChart = {
        series:  series,
        chartOptions: {
          labels: labels,
          colors: themeColors
        }
      }
    }
  },
  watch: {
    pocty: function() {
      this.updateChart();
    }
  },
  mounted() {
    this.updateChart();
  }
};
</script>


