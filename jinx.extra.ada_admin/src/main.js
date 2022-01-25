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

//路由前进刷新后退不刷新
import Navigation from "vue-navigation";
Vue.use(Navigation, { router, store });

// import Router from "vue-router";
// const routerReplace = Router.prototype.replace;
// Router.prototype.replace = function replace(location) {
//   return routerReplace.call(this, location).catch(error => error);
// };

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

import "@/assets/js/file.type.js";

window.$VuexPrefix = "ada.admin.";
// window.$Server = "http://47.108.88.211"; // todo
// window.$Server = "http://hbsggyjy.hebtu.edu.cn";
window.$Server = "http://www.hbsggyjy.cn";
// window.$Server = "http://127.0.0.1";
// window.$Server = "http://211.82.246.251";
// window.$Server = "http://localhost";
Vue.prototype.$ImagePostServer = window.$Server + ":8083";
Vue.prototype.$ImageGetServer = window.$Server + "/dgsimg/";
// Vue.prototype.$ImageGetServer = "http://hbsggyjy.hebtu.edu.cn/dgsimg/";
// Vue.prototype.$ImageGetServer = window.$Server + "/img/";
// Vue.prototype.$PdfViewerPath = window.$Server + "/pdfjs/web/viewer.html?file=";
// Vue.prototype.$PdfViewerPath = "http://hbsggyjy.hebtu.edu.cn/pdfjs/web/viewer.html?file=";
// Vue.prototype.$OfficeViewerPath = "https://view.officeapps.live.com/op/view.aspx?src=";
Vue.prototype.$PdfViewerPath = window.$Server + "/pdfjs/web/viewer.html?file=";
Vue.prototype.$OfficeViewerPath = window.$Server + ":8012/onlinePreview?url=";
Vue.prototype.$WebSiteName = "全国大学生广告艺术大赛（河北赛区）评审系统";

Vue.prototype.$WorksTypeCode = [
  { code: "A", value: "平面" },
  { code: "Ba", value: "影视" },
  { code: "Bb", value: "微电影" },
  { code: "Bc", value: "短视频" },
  { code: "C", value: "动画" },
  { code: "D", value: "互动" },
  { code: "E", value: "广播" },
  { code: "F", value: "策划案" },
  { code: "Ga", value: "广告语" },
  { code: "Gb", value: "长文案" }
];

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
