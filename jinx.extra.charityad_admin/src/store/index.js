import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    Token: sessionStorage.getItem("Charity-Token") ? sessionStorage.getItem("Charity-Token") : "",
    Account: sessionStorage.getItem("Charity-Account") ? sessionStorage.getItem("Charity-Account") : "",
    User: sessionStorage.getItem("Charity-User") ? JSON.parse(sessionStorage.getItem("Charity-User")) : {}
  },
  mutations: {
    changeAccount(state, user) {
      if (user != null) {
        state.Token = user.Token;
        state.Account = user.Account;
        state.User = user;
        sessionStorage.setItem("Charity-Token", user.token);
        sessionStorage.setItem("Charity-Account", user.uname);
        sessionStorage.setItem("Charity-User", JSON.stringify(user));
      } else {
        state.Token = "";
        state.Account = "";
        state.User = {};
        sessionStorage.setItem("Charity-Token", "");
        sessionStorage.setItem("Charity-Account", "");
        sessionStorage.setItem("Charity-User", "");
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      state.User = {};
      sessionStorage.setItem("Charity-Token", "");
      sessionStorage.setItem("Charity-Account", "");
      sessionStorage.setItem("Charity-User", "");
    }
  },
  actions: {},
  modules: {}
});
