<template>
  <div>
    <div>
      <BaseCard heading="Výkazy podľa rokov">
        <v-container
            v-for="item in dochadzka"
            :key="item.rok"
            fluid>
          <v-subheader class="theme--light.v-subheader">
            {{ item.rok }}
          </v-subheader>
          <v-row no-gutters>
            <v-col v-for="n in item.mesiace"
                   :key="n"
                   cols="1"
                   sm="6"
                   md="4"
                   lg="2">
              <v-card
                  class="pa-2 rounded-lg otvoreny"
                  elevation="5"
                  outlined
                  tile
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ n }}
                    </v-list-item-title>
                    <v-list-item-subtitle>stav</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-btn style="background-color: #e0e0e0"
                         rounded
                         elevation="2"
                         @click="zobrazMesiac(n, item.rok)"
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
      <BaseCard :heading="header">
        <v-row class="fill-height">
          <v-col cols="12" sm="12">
            <!-- dialog pre zmenu pracovneho casu-->
            <v-dialog v-model="dialogUprava" max-width="650">
              <v-card>
                <v-container>
                  <v-form @submit.prevent="upravPracovnuDobu()">
                    <v-time-picker
                        v-model="zac_hod"
                        label="Začiatok"
                        format="24hr"
                        min="6:00"
                        max="22:00"
                        keepContentAlive = false
                        :allowed-minutes="allowedStep"
                    ></v-time-picker>
                    <v-time-picker
                        v-model="kon_hod"
                        label="Koniec"
                        format="24hr"
                        min="6:00"
                        max="22:00"
                        :allowed-minutes="allowedStep"
                    ></v-time-picker>
                    <v-btn type="submit" color="primary" class="mt-3" @click.stop="dialogUprava = false">Upraviť pracovnú dobu</v-btn>
                  </v-form>
                </v-container>
              </v-card>
            </v-dialog>
            <!-- dialog pre upravu aktivity-->
            <v-dialog v-model="dialogDetail" max-width="650">
              <v-card>
                <v-container>
                  <template>
                    <v-form>
                      <v-container v-for="aktivity in cinnostiPreMesiac" :key="aktivity.id">
                        <v-row>
                            <v-text-field
                                :value=aktivity.zac_hod
                                label="Začiatok aktivity"
                                disabled
                            ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              :value=aktivity.zac_hod
                              label="Koniec aktivity"
                              disabled
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              :value=aktivity.aktivita
                              label="Aktivita"
                              disabled
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              :value=aktivity.popis
                              label="Popis"
                              disabled
                          ></v-text-field>
                        </v-row>
                        <v-btn class="mt-3" color="#28b8ce" rounded dark @click.stop="dialogDetail = false">Upraviť aktivitu</v-btn>
                      </v-container>
                    </v-form>
                  </template>
                </v-container>
              </v-card>
            </v-dialog>
            <v-simple-table dense class="border">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Deň</th>
                  <th class="text-left">Začiatok činnosti</th>
                  <th class="text-left">Koniec činnosti</th>
                  <th class="text-left">Počet činností</th>
                  <th class="text-left">Detail činnosti</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="x in cinnosti" :key="x.den">
                  <td>{{ x.den }}</td>
                  <td v-if="x.zac_min < 10">{{ x.zac_hod }}:0{{ x.zac_min }}</td>
                  <td v-else>{{ x.zac_hod }}:{{ x.zac_min }}</td>
                  <td v-if="x.kon_min < 10">{{ x.kon_hod }}:0{{ x.kon_min}}</td>
                  <td v-else>{{ x.kon_hod }}:{{ x.kon_min}}</td>
                  <td>{{ x.cinnosti.length }}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="black"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="prepareDetail(x.cinnosti)"
                        >
                          mdi-magnify-plus
                        </v-icon>
                      </template>
                      <span>Detail</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="black"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="prepareAdding(x.den)"
                        >
                          mdi-square-edit-outline
                        </v-icon>
                      </template>
                      <span>Upraviť pracovnú dobu</span>
                    </v-tooltip>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-btn class="mt-3" color="#28b8ce" rounded dark @click.stop="dialog = true">Pridať záznam</v-btn>
          </v-col>
        </v-row>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store";

export default {
  name: "VykazyCards",
  data: () => ({
    prehladMesiaca: false,
    den: null,
    mesiac: null,
    rok: null,
    header: null,
    dochadzka: [],
    cinnosti: [],
    cinnostiPreMesiac: [],
    dialogUprava: false,
    dialogDetail: false,
    zac_hod: null,
    zac_min: null,
    kon_hod: null,
    kon_min: null
  }),
  methods: {
    allowedStep: m => m % 5 === 0,
    async zobrazMesiac(mesiac, rok) {
      console.log("zobraz mesiac: " + rok + " " + mesiac);
      this.prehladMesiaca = true;
      this.mesiac = mesiac;
      this.rok = rok;
      this.header = "Prehľad mesiaca " + mesiac;
      const data = {
        "mesiac": mesiac,
        "rok": rok
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/get-cinnosti', data, store.state.axios_config)
          .then(function( response ){
            this.cinnosti = response.data.list;
          }.bind(this));
    },
    async nacitajMesiaceDochadzky() {
      var dochadzka = [];
      await axios.get('https://app.vykony.ki.fpv.ukf.sk/get-mesiace-dochadzky', store.state.axios_config)
          .then(function( response ){
            dochadzka = response.data.list;
          }.bind(this));
      this.spracujMesiaceDochadzky(dochadzka);
    },
    spracujMesiaceDochadzky(dochadzka) {
      var spracovanaDochadzka = [];
      const unique = [...new Set(dochadzka.map(item => item.rok))];
      for (var index = 0; index < unique.length; ++index) {
        const filtered = dochadzka.reduce((a, o) => (o.rok === unique[index] && a.push(o.mesiac), a), []);
        spracovanaDochadzka.push({"rok": unique[index], "mesiace": filtered});
      }
      this.dochadzka = spracovanaDochadzka;
      console.log(this.dochadzka)
    },
    async upravPracovnuDobu() {
      this.zac_min = this.zac_hod.substring(3);
      this.zac_hod = this.zac_hod.substring(0,2);
      this.kon_min = this.kon_hod.substring(3);
      this.kon_hod = this.kon_hod.substring(0,2);
      const data = {
        "rok" : this.rok,
        "mesiac": this.mesiac,
        "den":this.den,
        "zac_hod":this.zac_hod,
        "zac_min":this.zac_min,
        "kon_hod":this.kon_hod,
        "kon_min":this.kon_min
    };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/prepis-pracovnej-doby', data, store.state.axios_config)
          .then(function( response ){
            console.log(response.data);
          }.bind(this));
      this.zobrazMesiac(this.mesiac, this.rok);
      this.zac_hod = null;
      this.kon_hod = null;
    },
    prepareAdding(den) {
      this.dialogUprava = true;
      this.den = den;
    },
    prepareDetail(cinnosti) {
      this.dialogDetail = true;
      this.cinnostiPreMesiac = cinnosti;
      console.log(cinnosti)
    }
  },
  created() {
    this.nacitajMesiaceDochadzky();
  }
}
</script>

<style scoped>
.otvoreny {
  background: #ffa5a5;
  margin: 3px !important;
}

.uzavrety {
  background: #7dfd79;
  margin: 3px !important;
}

.prazdny {
  background-color: #bce6ff;
  margin: 3px !important;
}
</style>
