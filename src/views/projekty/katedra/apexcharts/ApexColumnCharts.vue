<template>
  <v-card class="mb-7">
    <v-toolbar flat>
      <v-toolbar-title>Column Chart</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="mt-4 pa-4">
      <vue-apex-charts width="500" type="bar" :options="options" :series="series"
      ></vue-apex-charts>
    </div>
  </v-card>

</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "ApexColumnCharts",
  props: ['zoznam'],
  data: function() {
    return {
      projektyPreRoky: [],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
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
        data: this.projektyPreRoky
      }]
    },
    getProjectForYears(roky) {
      this.projektyPreRoky = [];
      for (var index = 0; index < roky.length; ++index) {
        var count = 0;
        for(var i = 0; i < this.zoznam.length; ++i){
          if(this.zoznam[i].year_from === roky[index])
            count++;
        }
        this.projektyPreRoky.push(count)
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
      for (var index = 0; index < this.zoznam.length; ++index) {
        roky.push(this.zoznam[index].year_from)
      }
      let unique = [...new Set(roky)];
      this.getProjectForYears(unique.sort())
      return unique.sort();
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


