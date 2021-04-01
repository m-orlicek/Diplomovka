import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Sidebar_drawer: null,
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: '',
        idToken: null,
        meno: null,
        priezvisko: null,
        ttl_pred: null,
        ttl_za: null,
        axios_config: null
    },
    mutations: {
        SET_SIDEBAR_DRAWER(state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER(state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR(state, payload) {
            state.SidebarColor = payload
        },
        authUser(state, userData) {
            state.idToken = userData.token;
        },
        clearAuth(state) {
            state.idToken = null;
            state.meno = null;
            state.priezvisko = null;
            state.ttl_pred = null;
            state.ttl_za = null;
            state.axios_config = null;
        },
        saveUser(state, userData) {
            state.meno = userData.meno;
            state.priezvisko = userData.priezvisko;
            state.ttl_pred = userData.ttl_pred;
            state.ttl_za = userData.ttl_za;
        },
        setConfig(state, data) {
            state.axios_config = {
                headers: {
                    Authorization: 'Bearer ' + data.token
                }
            }
        },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        signup({ commit }, authData) {
            axios
                .post(
                    "https://app.vykony.ki.fpv.ukf.sk/register",
                    {
                        ttl_pred:authData.ttl_pred,
                        meno:authData.meno,
                        priezvisko:authData.priezvisko,
                        ttl_za:authData.ttl_za,
                        osobne_cislo:authData.osobne_cislo,
                        email:authData.email,
                        heslo:authData.heslo,
                        katedra:authData.katedra
                    }
                )
                .then(res => {
                    console.log(res);
                    router.push("/boxedlogin");
                })
                .catch(error => console.log(error));
        },
        login({ commit }, authData) {
            axios
                .post(
                    "https://app.vykony.ki.fpv.ukf.sk/oauth/token",
                    {
                        email: authData.email,
                        grant_type: "password",
                        client_id: 2,
                        client_secret: "iQuGUAzqc187j7IKQ94tTVJAywHCAzYBGAMTxEtr",
                        username: authData.email,
                        password: authData.password
                    }
                )
                .then(res => {
                    localStorage.setItem("token", res.data.access_token);
                    commit("authUser", {
                        token: res.data.access_token
                    });
                    commit("setConfig", {
                        token: res.data.access_token
                    });
                    axios
                        .get(
                            "https://app.vykony.ki.fpv.ukf.sk/get-full-user-parameters",
                            {
                                headers: {
                                    'Authorization': 'Bearer ' + res.data.access_token
                                }}
                        ).then(r => {
                            localStorage.setItem("meno", r.data.meno);
                            localStorage.setItem("priezvisko", r.data.priezvisko);
                            localStorage.setItem("ttl_pred", r.data.ttl_pred);
                            localStorage.setItem("ttl_za", r.data.ttl_za);
                            commit("saveUser", {
                                meno: r.data.meno,
                                priezvisko: r.data.priezvisko,
                                ttl_pred: r.data.ttl_pred,
                                ttl_za: r.data.ttl_za,
                            });
                            router.push("/prehlad")
                        }
                    )
                })
                .catch(error => console.log(error));
        },
        logout({ commit }) {
            commit("clearAuth");
            localStorage.removeItem("token");
            localStorage.removeItem("meno");
            localStorage.removeItem("priezvisko");
            localStorage.removeItem("ttl_pred");
            localStorage.removeItem("ttl_za");
            router.replace("/");
        },
        AutoLogin({ commit }) {
            const token = localStorage.getItem("token");
            const meno = localStorage.getItem("meno");
            const priezvisko = localStorage.getItem("priezvisko");
            const ttl_pred = localStorage.getItem("ttl_pred");
            const ttl_za = localStorage.getItem("ttl_za");
            if (!token) {
                return;
            }
            commit("authUser", {
                token: token
            });
            commit("saveUser", {
                meno: meno,
                priezvisko: priezvisko,
                ttl_pred: ttl_pred,
                ttl_za: ttl_za,
            });
            commit("setConfig", {
                token: token
            });
        }
    },
    getters: {
        userFullname(state) {
            return state.ttl_pred + " " + state.meno + " " + state.priezvisko + " " + state.ttl_za;
        },
        ifAuthenticated(state) {
            return state.idToken !== null;
        }
    }
})
