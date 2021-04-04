<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Počet aktívnych projektov v rokoch</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="mt-4 pa-4">
      <vue-apex-charts type="bar" :options="options" :series="series"
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
        name: 'Počet aktívnych projektov',
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
    getProjectForYears(start, end) {
      this.projektyPreRoky = [];
      for (var index = start; index <= end; ++index) {
        var count = 0;
        for(var i = 0; i < this.zoznam.length; ++i){
          if(this.zoznam[i].year_from <= index && this.zoznam[i].year_end >= index)
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
      let start = Math.min.apply(Math, this.zoznam.map(function(o) {
        return o.year_from;
      }));
      let end = Math.max.apply(Math, this.zoznam.map(function(o) {
        return o.year_end;
      }));
      console.log(start);
      console.log(end);
      for (var index = start; index <= end; ++index) {
        roky.push(index)
      }
      this.getProjectForYears(start, end);
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


