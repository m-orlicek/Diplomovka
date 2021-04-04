<template>
  <v-card class="flex-grow-1">
    <v-toolbar flat>
      <v-toolbar-title>Počet publikácií v rokoch</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <div>
      <vue-apex-charts
          type="bar"
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
      var roky = this.getYears;
      this.options = {
        xaxis: {
          categories: roky
        }
      };
      this.series = [{
        data: this.publikaciePreRoky
      }]
    },
    getPublicationsForYears(start, end) {
      this.publikaciePreRoky = [];
      for (var index = start; index <= end; ++index) {
        var count = 0;
        for(var i = 0; i < this.zoznam.length; ++i){
          if(this.zoznam[i].rok_vydania === index)
            count++;
        }
        this.publikaciePreRoky.push(count)
      }
    }
  },
  watch: {
    zoznam: function() {
      this.updateChart()
    }
  },
  computed: {
    getYears() {
      var roky = [];
      let start = Math.min.apply(Math, this.zoznam.map(function(o) {
        return o.rok_vydania;
      }));
      let end = Math.max.apply(Math, this.zoznam.map(function(o) {
        return o.rok_vydania;
      }));
      for (var index = start; index <= end; ++index) {
        roky.push(index)
      }
      this.getPublicationsForYears(start, end);
      return roky;
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


