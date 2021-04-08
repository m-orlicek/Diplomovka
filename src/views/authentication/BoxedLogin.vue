<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="8" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col>
              <div class="pa-7 pa-sm-12" >
                <img class="center" src="@/assets/images/ukf-logo-login.png" alt="UKF Logo"/>
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Prihlásenie do portálu UKF</h2>
                <v-form v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Heslo"
                      required
                      outlined
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      hint="Heslo musí obsahovať aspoň 10 znakov."
                      @click:append="show1 = !show1"
                  ></v-text-field>
                  <h6 class="subtitle-1">
                    Ešte nie ste zaregistrovaný?
                    <v-spacer></v-spacer>
                    <a href="/boxedregister" class>Registrácia</a>
                  </h6>
                  <v-btn
                    :disabled="!valid"
                    color="info"
                    block
                    class="mr-4"
                    submit
                    @click="onSubmit"
                  >Prihlásiť</v-btn>
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
export default {
  name: "BoxedLogin",

  data: () => ({
    isInit: false,
    isSignIn: false,
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Zadajte heslo.",
    ],
    email: "",
    emailRules: [
      v => !!v || "Zadajte e-mail",
      v => /.+@.+\..+/.test(v) || "Zadajte e-mail v správnom formáte."
    ],
    checkbox: false
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
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
