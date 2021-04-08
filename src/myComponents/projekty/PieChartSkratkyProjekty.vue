<template>
  <v-card class="flex-grow-1">
    <v-toolbar flat>
      <v-toolbar-title>Top 10 počet projektov v jednotlivých kategóriách</v-toolbar-title>
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
  props: ['zoznam'],
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
      var keys = this.getCategories;
      var values = this.getPocty;
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
      };
    }
  },
  computed: {
    getCategories() {
      var kategorie = [];
      for (var index = 0; index < this.zoznam.length; ++index) {
        if (!kategorie.includes(this.zoznam[index].acronym) && this.zoznam[index].acronym != null){
          kategorie.push(this.zoznam[index].acronym)
        }
      }
      return kategorie;
    },
    getPocty() {
      var pocty = [];
      var kategorie = this.getCategories;
      for (var index = 0; index < kategorie.length; ++index) {
        var count = 0;
        for (var i = 0; i < this.zoznam.length; ++i) {
          if (this.zoznam[i].acronym === kategorie[index])
            count++;
        }
        pocty.push(count)
      }
      return pocty;
    }
  },
  watch: {
    zoznam: function() {
      this.updateChart()
    }
  },
  mounted() {
    this.updateChart();
  }
};
</script>


