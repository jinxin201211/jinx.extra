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
        state.Token = user.token;
        state.Account = user.uname;
        state.User = user;
        sessionStorage.setItem(window.$VuexPrefix + "Token", user.token);
        sessionStorage.setItem(window.$VuexPrefix + "Account", user.uname);
        sessionStorage.setItem(window.$VuexPrefix + "User", JSON.stringify(user));
      } else {
        state.Token = "";
        state.Account = "";
        state.User = {};
        sessionStorage.removeItem(window.$VuexPrefix + "Token");
        sessionStorage.removeItem(window.$VuexPrefix + "Account");
        sessionStorage.removeItem(window.$VuexPrefix + "User");
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      state.User = {};
      sessionStorage.removeItem(window.$VuexPrefix + "Token");
      sessionStorage.removeItem(window.$VuexPrefix + "Account");
      sessionStorage.removeItem(window.$VuexPrefix + "User");
    },
    syncAccount(state) {
      state.Token = sessionStorage.getItem(window.$VuexPrefix + "Token") ? sessionStorage.getItem(window.$VuexPrefix + "Token") : "";
      state.Account = sessionStorage.getItem(window.$VuexPrefix + "Account") ? sessionStorage.getItem(window.$VuexPrefix + "Account") : "";
      state.User = sessionStorage.getItem(window.$VuexPrefix + "User") ? JSON.parse(sessionStorage.getItem(window.$VuexPrefix + "User")) : {};
    }
  },
  actions: {},
  modules: {}
});
