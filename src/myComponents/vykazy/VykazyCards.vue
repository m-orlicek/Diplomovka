<template>
  <div>
    <div>
    <BaseCard heading="Výkazy podľa rokov">
    <v-container
        v-for="item in years"
        :key="item.rok"
        fluid>
      <v-subheader :inset="inset" class="theme--light.v-subheader">
        {{ item.rok }}
      </v-subheader>
      <v-row no-gutters>
        <v-col v-for="n in mesiace"
        :key="n.mesiacCislo"
        cols="1"
        sm="6"
        md="4"
        lg="2">
          <v-card
              class="pa-2 rounded-lg"
              :class="n.stav"
              elevation="5"
              outlined
              tile
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ n.mesiacCislo }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ n.stav }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn style="background-color: #fffbe6"
                  rounded
                     elevation="2"
                  @click="zobrazMesiac(n.mesiac)"
              >
                Detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </BaseCard>
    </div>
    <div v-show="prehladMesiaca">
    <BaseCard :heading="mesiac">
    <v-row class="fill-height">
          <v-col cols="12" sm="12">
              <v-simple-table dense class="border">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">Názov činnosti</th>
                    <th class="text-left">Detail činnosti</th>
                    <th class="text-left">Počet hodín</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in groupedEvents" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.hours }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
          </v-col>
    </v-row>
    </BaseCard>
    </div>
  </div>
</template>

<script>
export default {
  name: "VykazyCards",
  data: () => ({
    years: [
      { rok: '2019' },
      { rok: '2020' }
    ],
    mesiace: [
      { mesiac: 'Január', dni: 31, mesiacCislo: 1, stav: 'prazdny' },
      { mesiac: 'Február', dni: 28, mesiacCislo: 2, stav: 'otvoreny' },
      { mesiac: 'Marec', dni: 31, mesiacCislo: 3, stav: 'uzavrety' },
      { mesiac: 'Apríl', dni: 30, mesiacCislo: 4, stav: 'schvaleny' },
      { mesiac: 'Máj', dni: 31, mesiacCislo: 5, stav: 'otvoreny' },
      { mesiac: 'Jún', dni: 30, mesiacCislo: 6, stav: 'prazdny' },
      { mesiac: 'Júl', dni: 31, mesiacCislo: 7, stav: 'schvaleny' },
      { mesiac: 'August', dni: 31, mesiacCislo: 8, stav: 'uzavrety' },
      { mesiac: 'September', dni: 30, mesiacCislo: 9, stav: 'schvaleny' },
      { mesiac: 'Október', dni: 31, mesiacCislo: 10, stav: 'otvoreny' },
      { mesiac: 'November', dni: 30, mesiacCislo: 11, stav: 'prazdny' },
      { mesiac: 'December', dni: 31, mesiacCislo: 12, stav: 'otvoreny' },
    ],
    prehladMesiaca: false,
    pozadie: 'blue',
    mesiac: null
  }),
  methods: {
    zobrazMesiac(mesiac) {
      this.prehladMesiaca = true;
      this.mesiac = "Prehľad mesiaca " + mesiac;
      this.pozadie = 'yellow'
    }
  }
}
</script>

<style scoped>
.uzavrety {
  background: #f1eb78;
  margin: 3px !important;
}

.otvoreny {
  background: #ea6e6e;
  margin: 3px !important;
}

.schvaleny {
  background: #58e501;
  margin: 3px !important;
}

.prazdny {
  background-color: #93caf8;
  margin: 3px !important;
}
</style>
