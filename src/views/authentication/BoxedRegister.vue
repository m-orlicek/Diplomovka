<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="8" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col>
              <div class="pa-7 pa-sm-12" >
                <img class="center" src="@/assets/images/ukf-logo-login.png" alt="UKF Logo"/>
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Registrácia do portálu UKF</h2>
                <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
                  <v-text-field
                      v-model="titulPred"
                      label="Titul pred menom"
                      class="mt-4"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="meno"
                      :rules="menoRules"
                      label="Meno"
                      class="mt-4"
                      required
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="priezvisko"
                      :rules="priezviskoRules"
                      label="Priezvisko"
                      class="mt-4"
                      required
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="titulZa"
                      label="Titul za menom"
                      class="mt-4"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model.number="osobneCislo"
                      label="Osobné číslo"
                      :rules="cisloRules"
                      class="mt-4"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      class="mt-4"
                      required
                      outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="heslo"
                      :rules="hesloRules"
                      label="Heslo"
                      required
                      outlined
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      hint="Heslo musí obsahovať aspoň 10 znakov."
                      @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-combobox
                      label="Katedra"
                      :rules="[requiredKatedra]"
                      v-model="katedra"
                      item-text="name"
                      item-value="id"
                      :items="katedry"
                      outlined
                      required
                  ></v-combobox>
                  <v-btn
                      :disabled="!valid"
                      color="info"
                      block
                      class="mr-4"
                      submit
                      @click="onSubmit"
                  >Registrovať</v-btn>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "BoxedRegister",
  data: () => ({
    valid: false,
    heslo: "",
    show1: false,
    hesloRules: [
      v => !!v || "Zadajte heslo.",
      v => (v && v.length >= 10) || "Heslo musí obsahovať aspoň 10 znakov."
    ],
    email: "",
    emailRules: [
      v => !!v || "Zadajte e-mail",
      v => /.+@.+\..+/.test(v) || "E-mailová adresa je zadaná v zlom formáte."
    ],
    meno: "",
    menoRules: [
      v => !!v || "Zadajte meno.",
      v => (v && v.length >= 3) || "Meno musí obsahovať aspoň 3 znaky."
    ],
    priezvisko: "",
    priezviskoRules: [
      v => !!v || "Zadajte priezvisko.",
      v => (v && v.length >= 3) || "Priezvisko musí obsahovať aspoň 3 znaky."
    ],
    titulPred: "",
    titulZa: "",
    osobneCislo: "",
    cisloRules: [
      v => !!v || "Zadajte osobné číslo.",
      v => (v && parseFloat(v) > 99 && parseFloat(v) < 1000000) || "Osobné číslo musí obsahovať 3 až 6 znakov.",
      v => (v && parseFloat(v) >= 0 && parseFloat(v) <= 999999) || "Osobné číslo musí obsahovať iba numerické znaky."
    ],
    katedra: "",
    katedry: [],
    katedryFull: []
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch("signup", {
        ttl_pred: this.titulPred,
        meno: this.meno,
        priezvisko: this.priezvisko,
        ttl_za: this.titulZa,
        osobne_cislo: this.osobneCislo,
        email: this.email,
        heslo: this.heslo,
        katedra: this.katedryFull[this.katedry.indexOf(this.katedra)]
      });
    },
    requiredKatedra(value) {
      if (value instanceof Array && value.length === 0) {
        return 'Vyberte katedru.';
      }
      return !!value || 'Vyberte katedru.';
    }
  },
  created(){
    this.katedry = [];
    const data = {
      "fakulta": ""
    }
    this.vybranaFakulta = true;
    axios.post('https://app.vykony.ki.fpv.ukf.sk/get-epc-full-katedry', data)
        .then(function( response ){
          let k = response.data.katedry;
          k = k.filter((i) => {
            let first3Letters = i.substring(0,3)
            return first3Letters === "UKF"
          });
          for (var index = 0; index < k.length; ++index) {
              this.katedry.push(k[index].substring(6));
              this.katedryFull.push(k[index]);
          }
        }.bind(this));
  }
};
</script>
<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 200px;
}
</style>
