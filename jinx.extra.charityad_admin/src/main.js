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
import "@/assets/css/common.css";

Vue.use(ElementUI);

// //路由前进刷新后退不刷新
// import Navigation from "vue-navigation";
// Vue.use(Navigation, { router, store });

import Router from "vue-router";
const routerReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
};

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

window.$VuexPrefix = "charity.admin.";
Vue.prototype.$Server = "http://47.108.88.211";
Vue.prototype.$ImagePostServer = "http://47.108.88.211:8081";
Vue.prototype.$ImageGetServer = "http://47.108.88.211/img/";
Vue.prototype.$WebSiteName = "河北省公益广告大赛后台管理系统";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
