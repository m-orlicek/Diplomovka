<template>
  <v-card class="flex-grow-1">
    <v-toolbar flat>
      <v-toolbar-title>Počet publikácií v konkrétnych kategóriách</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <div>
      <vue-apex-charts
          type="bar"
          height="1000px"
          :options="options"
          :series="series"
      ></vue-apex-charts>
    </div>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "ColumnChartPublikacie",
  props: ['zoznam'],
  data: function() {
    return {
      publikaciePreRoky: [],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        colors: '#ffa300',
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        }
      },
      series: [{
        name: 'Počet publikácií',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
  methods: {
    updateChart() {
      var kategorie = this.getYears;
      this.options = {
        xaxis: {
          categories: Object.keys(kategorie)
        }
      };
      this.series = [{
        data: Object.values(kategorie)
      }]
    }
  },
  watch: {
    zoznam: function() {
      this.updateChart()
    }
  },
  computed: {
    getYears() {
      var zoznam = this.zoznam;
      var counts = {};

      for (var i = 0; i < zoznam.length; i++) {
        var kat = zoznam[i].kategoria;
        counts[kat] = counts[kat] ? counts[kat] + 1 : 1;
      }
      return counts;
    }
  },
  components: {
    VueApexCharts
  },
  mounted() {
    this.updateChart()
  }
};
</script>


