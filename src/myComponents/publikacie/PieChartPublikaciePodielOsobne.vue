<template>
    <v-card class="flex-grow-1">
        <v-toolbar flat >
            <v-toolbar-title style="white-space: normal;">Počet publikácií v kategóriách</v-toolbar-title>
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
  name: "PieChartPublikaciePodielOsobne",
  props: ['zoznam'],
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
    kategoriaA1: ['AAA', 'AAB', 'ABA', 'ABB', 'ABC', 'ABD'],
    kategoriaA2: ['ACA', 'ACB', 'BAA', 'BAB', 'BCB', 'BCI', 'CAA', 'CAB', 'EAI', 'EAJ', 'FAI'],
    kategoriaB: ['ADC', 'ADD', 'BDC', 'BDD', 'CDC', 'CDD', 'AGJ'],
    kategoriaC: ['ADM', 'ADN', 'BDM', 'BDN'],
    kategoriaD: ['ACC', 'ACD', 'ADE', 'ADF', 'AEC', 'AED', 'AEG', 'AEH', 'AFA', 'AFB', 'AFC', 'AFD', 'AFE', 'AFF', 'AFG', 'AFH', 'AEM', 'AEN', 'BBA', 'BBB', 'BCK', 'BDA', 'BDB', 'BDE', 'BDF', 'BFA', 'BFB', 'CBA', 'CBB', 'CDE', 'CDF'],
    kategoriaN: ['AFK', 'AFL', 'AGI', 'BEE', 'BEF', 'BGG', 'CAI', 'CAJ', 'CEC', 'CED', 'CGC', 'CGD', 'CIA', 'CIB', 'CJA', 'CJB', 'CKA', 'CKB', 'DAI', 'EDI', 'EDJ', 'GAI', 'GHG', 'GII'],
  }),
  components: {
    VueApexCharts
  },
  methods: {
    updateChart() {
      var kategorie = this.getKategorie;
      this.pieChart = {
        series:  kategorie
      }
    }
  },
  computed: {
    getKategorie() {
      var kategorie = [];
      var katA1 = 0;
      var katA2 = 0;
      var katB = 0;
      var katC = 0;
      var katD = 0;
      var katN = 0;
      for (var index = 0; index < this.zoznam.length; ++index) {
        if (this.kategoriaA1.includes(this.zoznam[index].kategoria)) katA1++;
        if (this.kategoriaA2.includes(this.zoznam[index].kategoria)) katA2++;
        if (this.kategoriaB.includes(this.zoznam[index].kategoria)) katB++;
        if (this.kategoriaC.includes(this.zoznam[index].kategoria)) katC++;
        if (this.kategoriaD.includes(this.zoznam[index].kategoria)) katD++;
        if (this.kategoriaN.includes(this.zoznam[index].kategoria)) katN++;
      }
      kategorie.push(katA1);
      kategorie.push(katA2);
      kategorie.push(katB);
      kategorie.push(katC);
      kategorie.push(katD);
      kategorie.push(katN);
      return kategorie;
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


