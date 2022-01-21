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
        sessionStorage.setItem(window.$VuexPrefix + "Token", "");
        sessionStorage.setItem(window.$VuexPrefix + "Account", "");
        sessionStorage.removeItem(window.$VuexPrefix + "User");
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      state.User = {};
      sessionStorage.setItem(window.$VuexPrefix + "Token", "");
      sessionStorage.setItem(window.$VuexPrefix + "Account", "");
      sessionStorage.removeItem(window.$VuexPrefix + "User");
    },
    syncAccount(state) {
      if (VueCookies.isKey(window.$VuexPrefix + "account") && VueCookies.isKey(window.$VuexPrefix + "token") && VueCookies.isKey(window.$VuexPrefix + "user")) {
        let account = VueCookies.get(window.$VuexPrefix + "account");
        let token = VueCookies.get(window.$VuexPrefix + "token");
        let user = VueCookies.get(window.$VuexPrefix + "user");
        this.commit("changeAccount", user);
      }
    },
    changeCookie(state, user) {
      VueCookies.set(window.$VuexPrefix + "token", user.token, 60 * 60 * 24 * window.$CookieStoreDays);
      VueCookies.set(window.$VuexPrefix + "account", user.uname, 60 * 60 * 24 * window.$CookieStoreDays);
      VueCookies.set(window.$VuexPrefix + "user", JSON.stringify(user), 60 * 60 * 24 * window.$CookieStoreDays);
    },
    removeCookie(state) {
      VueCookies.remove(window.$VuexPrefix + "token");
      VueCookies.remove(window.$VuexPrefix + "account");
      VueCookies.remove(window.$VuexPrefix + "user");
    }
  },
  actions: {},
  modules: {}
});
