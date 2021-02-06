<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Percentuálny podiel jednotlivých ukazovateľov</v-toolbar-title>
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
</template>

<script>
import VueApexCharts from "vue-apexcharts";

const themeColors = ['#008FFB', '#00E396', '#FEB019', '#FF4560']
export default {
  name: "ApexPieCharts",
  data: () => ({
    pieChart: {
      series: [845.39, 0.00, 0.00, 0.00],
      chartOptions: {
        labels: ['Prepočítaný počet publikácií v kat. A2', 'Prepočítaný počet publikácií vo WoK', 'Prepočítaný počet publikácií v Scopus', 'Prepočítaný počet publikácií v kat. D'],
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
  components: {
    VueApexCharts
  }
};
</script>


