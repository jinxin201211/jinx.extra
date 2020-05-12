import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    Token: sessionStorage.getItem(window.$VuexPrefix + "Token") ? sessionStorage.getItem(window.$VuexPrefix + "Token") : "",
    Account: sessionStorage.getItem(window.$VuexPrefix + "Account") ? sessionStorage.getItem(window.$VuexPrefix + "Account") : "",
    User: sessionStorage.getItem(window.$VuexPrefix + "User") ? JSON.parse(sessionStorage.getItem(window.$VuexPrefix + "User")) : {}
  },
  mutations: {
    changeAccount(state, user) {
      if (user != null) {
        state.Token = user.Token;
        state.Account = user.Account;
        state.User = user;
        sessionStorage.setItem(window.$VuexPrefix + "Token", user.token);
        sessionStorage.setItem(window.$VuexPrefix + "Account", user.uname);
        sessionStorage.setItem(window.$VuexPrefix + "User", JSON.stringify(user));
        // console.l  sessionStorage.getItem(window.$VuexPrefix + "User");
      } else {
        state.Token = "";
        state.Account = "";
        state.User = {};
        sessionStorage.setItem(window.$VuexPrefix + " Token", "");
        sessionStorage.setItem(window.$VuexPrefix + " Account", "");
        sessionStorage.setItem(window.$VuexPrefix + " User", "");
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      state.User = {};
      sessionStorage.setItem(window.$VuexPrefix + "Token", "");
      sessionStorage.setItem(window.$VuexPrefix + "Account", "");
      sessionStorage.setItem(window.$VuexPrefix + "User", "");
    }
  },
  getters: {
    getToken: function(state) {
      console.log("-------------------getToken-----------------------");
      console.log(sessionStorage.getItem(window.$VuexPrefix + "Token"));
      return sessionStorage.getItem(window.$VuexPrefix + "Token") ? sessionStorage.getItem(window.$VuexPrefix + "Token") : "";
    },
    getAccount: function(state) {
      console.log("-------------------getAccount-----------------------");
      console.log(sessionStorage.getItem(window.$VuexPrefix + "Account"));
      return sessionStorage.getItem(window.$VuexPrefix + "Account") ? sessionStorage.getItem(window.$VuexPrefix + "Account") : "";
    },
    getUser: function(state) {
      console.log("-------------------getUser-----------------------");
      console.log(sessionStorage.getItem(window.$VuexPrefix + "User"));
      return sessionStorage.getItem(window.$VuexPrefix + "User") ? JSON.parse(sessionStorage.getItem(window.$VuexPrefix + "User")) : {};
    }
  },
  actions: {},
  modules: {}
});
