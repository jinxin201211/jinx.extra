import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    Token: sessionStorage.getItem(window.$VuexPrefix + "Token") ? sessionStorage.getItem(window.$VuexPrefix + "Token") : "",
    Account: sessionStorage.getItem(window.$VuexPrefix + "Account") ? sessionStorage.getItem(window.$VuexPrefix + "Account") : ""
  },
  mutations: {
    changeAccount(state, user) {
      if (user != null) {
        state.Token = user.Token;
        state.Account = user.Account;
        sessionStorage.setItem(window.$VuexPrefix + "Token", user.Token);
        sessionStorage.setItem(window.$VuexPrefix + "Account", user.Account);
      } else {
        state.Token = "";
        state.Account = "";
        sessionStorage.setItem(window.$VuexPrefix + "Token", "");
        sessionStorage.setItem(window.$VuexPrefix + "Account", "");
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      sessionStorage.setItem(window.$VuexPrefix + "Token", "");
      sessionStorage.setItem(window.$VuexPrefix + "Account", "");
    },
    syncAccount(state) {
      if (VueCookies.isKey(window.$VuexPrefix + "account") && VueCookies.isKey(window.$VuexPrefix + "token")) {
        let account = VueCookies.get(window.$VuexPrefix + "account");
        let token = VueCookies.get(window.$VuexPrefix + "token");
        this.commit("changeAccount", { Token: token, Account: account });
        // this.commit("changeCookie", { Token: token, Account: account });
      }
    },
    changeCookie(state, user) {
      VueCookies.set(window.$VuexPrefix + "token", user.Token, 60 * 60 * 24 * window.$CookieStoreDays);
      VueCookies.set(window.$VuexPrefix + "account", user.Account, 60 * 60 * 24 * window.$CookieStoreDays);
    },
    removeCookie(state) {
      VueCookies.remove(window.$VuexPrefix + "token");
      VueCookies.remove(window.$VuexPrefix + "account");
    }
  },
  actions: {},
  modules: {}
});
