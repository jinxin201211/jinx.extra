import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import "@/assets/js/request.config.js";

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import ElementUI from "@/assets/js/element.config";
import "@/assets/css/element-variables.scss";

Vue.use(ElementUI);

//ie对router的支持
if (!!window.ActiveXObject || "ActiveXObject" in window) {
  window.addEventListener(
    "hashchange",
    () => {
      let currentPath = window.location.hash.slice(1);
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath);
      }
    },
    false
  );
}

window.$VuexPrefix = "charity.public.";
window.$CookieStoreDays = 1;
window.$FileUploadServer = "http://47.108.88.211:8080";
Vue.prototype.$FileGetServer = "http://47.108.88.211/img/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
