<template>
  <div>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Počet projektov v jednotlivých rokoch</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="pie"
                height="450"
                :options="pieChart.chartOptions"
                :series="pieChart.series"
              ></vue-apex-charts>
        </div>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

const themeColors = ['#008FFB', '#00E396', '#FEB019', '#FF4560']
export default {
  name: "ApexPieCharts",
  props: ['zoznam'],
  data: () => ({
    pieChart: {
      series: [2366.28, 625.12, 0.00, 1.57],
      chartOptions: {
        labels: ['2010', '2011', '2012', '2013'],
        colors: themeColors,
        legend: {
          position: 'bottom'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }]
      }
    },
  }),
  computed: {
    getYears() {
      var roky = [];
      for (var index = 0; index < this.zoznam.length; ++index) {
        roky.push(this.zoznam[index].year_from)
      }
      let unique = [...new Set(roky)];
      console.log(unique.length)
      return unique.sort()
    }
  },
  components: {
    VueApexCharts
  }
};
</script>


