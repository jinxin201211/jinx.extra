import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    Token: localStorage.getItem("Token") ? localStorage.getItem("Token") : "",
    Account: localStorage.getItem("Account")
      ? localStorage.getItem("Account")
      : ""
  },
  mutations: {
    changeAccount(state, user) {
      // debugger;
      if (user != null) {
        state.Token = user.Token;
        state.Account = user.Account;
        localStorage.setItem("Token", user.Token);
        localStorage.setItem("Account", user.Account);
        // document.cookie = `token = ${user.Token}; account = ${user.Account}; expires = ${new Date()}`;
      } else {
        state.Token = "";
        state.Account = "";
        localStorage.setItem("Token", "");
        localStorage.setItem("Account", "");
        // document.cookie = `token = ; account = ; expires = ${new Date()}`;
      }
    },
    resetAccount(state) {
      state.Token = "";
      state.Account = "";
      localStorage.setItem("Token", "");
      localStorage.setItem("Account", "");
    },
    syncAccount(state) {
      console.log("syncAccount");
      console.log(VueCookies.get("account"));
      console.log(VueCookies.get("token"));
      if (VueCookies.isKey("account") && VueCookies.isKey("token")) {
        let account = VueCookies.get("account");
        let token = VueCookies.get("token");
        this.commit("changeAccount", { Token: token, Account: account });
        VueCookies.set("token", token, 60 * 60 * 24 * 7);
        VueCookies.set("account", account, 60 * 60 * 24 * 7);
      }
    }
  },
  actions: {},
  modules: {}
});
