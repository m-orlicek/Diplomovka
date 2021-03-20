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
                <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
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
                    :counter="10"
                    :rules="passwordRules"
                    label="Heslo"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>

                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'Musíte súhlasiť pre pokračovanie!']"
                      label="Zapamätať si ma?"
                      required
                    ></v-checkbox>
                    <div class="ml-auto">
                      <a href="javascript:void(0)" class="link">Zabudli ste heslo?</a>
                    </div>
                  </div>
                  <v-btn
                    :disabled="!valid"
                    color="info"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                  >Prihlásiť</v-btn>
                </v-form>
                <div class="text-center mt-6">
                      <v-btn
                          :disabled="!isInit"
                          color="info"
                          block
                          class="mr-4"
                          v-if="!isSignIn"
                          @click="handleClickSignIn"
                      >
                        <v-icon color="white">mdi-google</v-icon>Prihlásiť pomocou účtu Google
                      </v-btn>
                  <v-btn
                      :disabled="!isInit"
                      color="info"
                      block
                      class="mr-4"
                      v-if="isSignIn"
                      @click="handleClickSignOut"
                  >
                    <v-icon color="white">mdi-google</v-icon>Prihlásiť pomocou účtu Google
                  </v-btn>
                </div>
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
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false
  }),
  computed: {},
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.$router.push({ path: "/prehlad" });
      }
    },

    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const authCode = await this.$gAuth.getAuthCode();
        const response = await this.$http.post('http://lumen.api/api/login', { code: authCode, redirect_uri: 'postmessage' })
        console.log('response', response);
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        console.log("getId", googleUser.getId());
        console.log("getBasicProfile", googleUser.getBasicProfile().getImageUrl());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log("getAuthResponse", this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse());
        this.isSignIn = this.$gAuth.isAuthorized;
        if (this.$gAuth.isAuthorized) {
          await this.$router.push({path: "/prehlad"});
        }
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        console.log("isSignIn", this.$gAuth.isAuthorized);
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },

  beforeUpdate() {
    if (this.isSignIn) {
      console.log("beforeUpdate isSignIn", this.isSignIn);
      this.$router.push({path: "/prehlad"});
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
