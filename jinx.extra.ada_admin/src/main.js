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

window.$VuexPrefix = "ada.admin.";
Vue.prototype.$Server = "http://47.108.88.211";
Vue.prototype.$ImagePostServer = "http://47.108.88.211:8083";
Vue.prototype.$ImageGetServer = "http://47.108.88.211/img/";
Vue.prototype.$WebSiteName = "全国大学生广告艺术大赛（河北赛区）后台管理系统";

Vue.prototype.$WorksGroupCode = [
  { code: "0", value: "高校类" },
  { code: "1", value: "专业类" },
  { code: "2", value: "公众类" }
];
Vue.prototype.$WorksSeriesCode = [
  { code: "A", value: "中国梦系列" },
  { code: "B", value: "营商环境系列" },
  { code: "C", value: "生态保护系列" },
  { code: "D", value: "传统文化系列" },
  { code: "E", value: "社会热点系列" },
  { code: "F", value: "其他主题" }
];
Vue.prototype.$WorksTypeCode = [
  { code: "1", value: "平面类" },
  { code: "2", value: "文案类" },
  { code: "3", value: "广播类" },
  { code: "4", value: "视频类" },
  { code: "5", value: "动画类" },
  { code: "6", value: "互动类" }
];
Vue.prototype.$MaterialSurceCode = [
  { code: "1", value: "我保重此作品是我的原创" },
  { code: "2", value: "我使用了素材" }
];

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");