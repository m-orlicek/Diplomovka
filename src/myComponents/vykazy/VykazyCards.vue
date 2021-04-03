<template>
  <div>
    <div>
      <BaseCardVykazy  @pridatMesiac="onClickChild" heading="Výkazy podľa rokov">
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
      </BaseCardVykazy>
    </div>
    <div v-show="prehladMesiaca">
      <BaseCard :heading="header" :addBtn="true">
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
                    <v-btn type="submit" color="primary" class="mt-2" @click.stop="dialogUprava = false">Upraviť pracovnú dobu</v-btn>
                  </v-form>
                </v-container>
              </v-card>
            </v-dialog>
            <!-- dialog pre upravu cinnosti-->
            <v-dialog v-model="dialogDetail" max-width="650">
              <v-card>
                <v-container>
                  <template>
                    <v-form v-model="valid">
                      <v-container v-for="aktivity in cinnostiPreMesiac" :key="aktivity.id">
                        <v-row>
                          <v-text-field
                              :value=getZacCas(aktivity)
                              label="Začiatok činnosti"
                              :rules="casRules"
                              required
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              :value=getKonCas(aktivity)
                              label="Koniec činnosti"
                              :rules="casRules"
                              required
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-select
                              :items="aktivityZoznam"
                              item-text="aktivita"
                              v-model="aktivita"
                              label="Činnost"
                              outlined
                              :rules="aktivitaRule"
                          ></v-select>
                        </v-row>
                        <v-row>
                          <v-text-field
                              :value=aktivity.popis
                              label="Popis"
                              outlined
                              :rules="popisRule"
                          ></v-text-field>
                        </v-row>
                        <v-btn
                            class="mt-2"
                            color="#28b8ce"
                            rounded
                            dark
                            @click.stop="upravAktivitu(aktivity)"
                            :disabled="!valid">
                          Upraviť činnosť
                        </v-btn>
                      </v-container>
                    </v-form>
                  </template>
                </v-container>
              </v-card>
            </v-dialog>
            <!-- dialog pre pridanie cinnosti-->
            <v-dialog v-model="dialogPridat" max-width="650">
              <v-card>
                <v-container>
                  <template>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-time-picker
                              v-model="zac_hod"
                              format="24hr"
                              min="6:00"
                              max="22:00"
                              keepContentAlive = false
                              :allowed-minutes="allowedStep"
                              class="mr-7"
                          ></v-time-picker>
                          <v-row>
                            <v-text-field
                                v-model="zac_hod"
                                :rules="casRules"
                                v-show="false"
                            ></v-text-field>
                          </v-row>
                          <v-time-picker
                              v-model="kon_hod"
                              format="24hr"
                              min="6:00"
                              max="22:00"
                              :allowed-minutes="allowedStep"
                          ></v-time-picker>
                          <v-row>
                            <v-text-field
                                v-model="kon_hod"
                                :rules="casRules"
                                v-show="false"
                            ></v-text-field>
                          </v-row>
                        </v-row>
                        <v-row>
                          <v-select
                              :items="aktivityZoznam"
                              item-text="aktivita"
                              v-model="aktivita"
                              label="Činnost"
                              outlined
                              :rules="aktivitaRule"
                          ></v-select>
                        </v-row>
                        <v-row>
                          <v-text-field
                              v-model = popis
                              label="Popis"
                              outlined
                              :rules="popisRule"
                          ></v-text-field>
                        </v-row>
                        <v-btn :disabled="!valid" class="mt-2" color="#28b8ce" rounded dark @click.stop="pridatCinnost">Pridať činnosť</v-btn>
                      </v-container>
                    </v-form>
                  </template>
                </v-container>
              </v-card>
            </v-dialog>
            <!-- dialog pre pridanie dochadzky-->
            <v-dialog v-model="dialogDochadzka" max-width="650">
              <v-card>
                <v-container>
                  <template>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                        <v-text-field
                            v-model.number = pocetDni
                            label="Počet dní"
                            outlined
                            :rules="pocetDniRule"
                        ></v-text-field>
                      </v-row>
                        <v-row>
                          <v-text-field
                              v-model.number = pridatMesiac
                              label="Mesiac"
                              outlined
                              :rules="pridatMesiacRule"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              v-model.number = pridatRok
                              label="Rok"
                              outlined
                              :rules="pridatRokRule"
                          ></v-text-field>
                        </v-row>
                        <v-btn :disabled="!valid" class="mt-2" color="#28b8ce" rounded dark @click.stop="vytvorDochadzku">Vytvor dochádzku</v-btn>
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
                            @click.stop="prepareWorkingHoursUpdate(x.den)"
                        >
                          mdi-square-edit-outline
                        </v-icon>
                      </template>
                      <span>Upraviť pracovnú dobu</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="black"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="den = x.den; dialogPridat = true;"
                        >
                          mdi-plus-box-outline
                        </v-icon>
                      </template>
                      <span>Pridať činnosť</span>
                    </v-tooltip>
                    <v-tooltip  v-if="x.cinnosti.length > 0" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="black"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click.stop="den = x.den; prepareDetail(x.cinnosti);"
                        >
                          mdi-magnify
                        </v-icon>
                      </template>
                      <span>Detail</span>
                    </v-tooltip>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-btn class="mt-2" color="#28b8ce" rounded dark @click.stop="vymazatDochadzku">Vymazať dochádzku za tento mesiac</v-btn>
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
    mesiace: {1:"január", 2:"február", 3:"marec", 4:"apríl", 5:"máj", 6:"jún", 7:"júl", 8:"august", 9:"september", 10:"október", 11:"november", 12:"december"},
    prehladMesiaca: false,
    valid: false,
    header: null,
    pocetDni: null,
    pridatMesiac: null,
    pridatRok: null,
    den: null,
    mesiac: null,
    rok: null,
    zac_hod: null,
    zac_min: null,
    kon_hod: null,
    kon_min: null,
    casRules: [
      v => !!v || "Zadajte čas",
      v => /^((0?[6-9]|1{1}[0-9]|2[0-1]):[0-5][0-9])|(22:00)$/.test(v) || "Zadajte čas v správnom formáte."
    ],
    popisRule: [
      v => !!v || "Zadajte popis"
    ],
    pocetDniRule: [
      v => !!v || "Zadajte počet dní",
      v => (v && parseFloat(v) > 0 && parseFloat(v) < 31) || "Počet dní musí byť v rozmedzí 1 až 31."
    ],
    pridatMesiacRule: [
      v => !!v || "Zadajte mesiac",
      v => (v && parseFloat(v) > 0 && parseFloat(v) < 13) || "Mesiac musí byť v rozmedzí 1 až 13."
    ],
    pridatRokRule: [
      v => !!v || "Zadajte rok",
      v => (v && parseFloat(v) > 999) || "Rok musí obsahovať aspoň štyri čísla."
    ],
    aktivitaRule: [
      v => !!v || "Vyberte aktivitu"
    ],
    dochadzka: [],
    cinnosti: [],
    cinnostiPreMesiac: [],
    aktivityZoznam: [],
    aktivita: null,
    popis: null,
    dialogUprava: false,
    dialogDetail: false,
    dialogPridat: false,
    dialogDochadzka: false,
  }),
  methods: {
    allowedStep: m => m % 5 === 0,
    prepareWorkingHoursUpdate(den) {
      this.dialogUprava = true;
      this.den = den;
    },
    prepareDetail(cinnosti) {
      this.dialogDetail = true;
      this.cinnostiPreMesiac = cinnosti;
    },
    getZacCas(aktivity){
      if (aktivity.zac_min < 10) {
        return aktivity.zac_hod + ":0" + aktivity.zac_min;
      } else return aktivity.zac_hod + ":" + aktivity.zac_min;
    },
    getKonCas(aktivity){
      if (aktivity.kon_min < 10){
        return aktivity.kon_hod + ":0" + aktivity.kon_min;
      } else return aktivity.kon_hod + ":" + aktivity.kon_min;
    },
    onClickChild (value) {
      console.log("button clicked");
      this.dialogDochadzka = value;
    },
    async zobrazMesiac(mesiac, rok) {
      this.prehladMesiaca = true;
      this.mesiac = mesiac;
      this.rok = rok;
      this.header = "Prehľad mesiaca " + this.mesiace[mesiac];
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
    async upravAktivitu(aktivity){
      this.dialogDetail = false;
      const data = {
        "id" : aktivity.id,
        "rok" : this.rok,
        "mesiac": this.mesiac,
        "den": this.den,
        "zac_hod": aktivity.zac_hod,
        "zac_min": aktivity.zac_min,
        "kon_hod": aktivity.kon_hod,
        "kon_min": aktivity.kon_min,
        "aktivita": this.aktivita,
        "popis": aktivity.popis
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/edituj-cinnost', data, store.state.axios_config)
          .then(function( response ){
            console.log(response.data);
          }.bind(this));
      this.valid = false;
    },
    async pridatCinnost() {
      this.dialogPridat = false;
      this.zac_min = this.zac_hod.substring(3);
      this.zac_hod = this.zac_hod.substring(0,2);
      this.kon_min = this.kon_hod.substring(3);
      this.kon_hod = this.kon_hod.substring(0,2);
      const data = {
        "id" : 0,
        "rok" : this.rok,
        "mesiac": this.mesiac,
        "den": this.den,
        "zac_hod": this.zac_hod,
        "zac_min": this.zac_min,
        "kon_hod": this.kon_hod,
        "kon_min": this.kon_min,
        "aktivita": this.aktivita,
        "popis": this.popis
      };
      console.log(data);
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/edituj-cinnost', data, store.state.axios_config)
          .then(function( response ){
            console.log(response.data);
          }.bind(this));
      this.zobrazMesiac(this.mesiac, this.rok);
      this.zac_hod = null;
      this.kon_hod = null;
    },
    getAktivity(){
      axios.get('https://app.vykony.ki.fpv.ukf.sk/get-aktivity', store.state.axios_config)
          .then(function( response ){
            this.aktivityZoznam = response.data.list;
          }.bind(this));
      this.valid = false;
    },
    async vymazatDochadzku(){
      const data = {
        "rok" : this.rok,
        "mesiac": this.mesiac
      };
      this.prehladMesiaca = false;
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/vymaz-mesiac-dochadzky', data, store.state.axios_config)
          .then(function( response ){
            console.log(response.data);
          }.bind(this));
      this.nacitajMesiaceDochadzky();
    },
    async vytvorDochadzku(){
      const data = {
        "rok": this.pridatRok,
        "mesiac": this.pridatMesiac,
        "pocet_dni": this.pocetDni
      };
      await axios.post('https://app.vykony.ki.fpv.ukf.sk/vytvor-mesiac-dochadzky', data, store.state.axios_config)
          .then(function( response ){
            this.cinnosti = response.data;
          }.bind(this));
      this.dialogDochadzka = false;
      this.nacitajMesiaceDochadzky();
    }
  },
  created() {
    this.nacitajMesiaceDochadzky();
    this.getAktivity();
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
