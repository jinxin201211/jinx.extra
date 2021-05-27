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

import "@/assets/js/file.type.js";

window.$VuexPrefix = "charity.admin.";
// window.$Server = "http://47.108.88.211"; // todo
// window.$Server = "http://hbsggyjy.hebtu.edu.cn";
// window.$Server = "http://49.233.122.67";
window.$Server = "http://localhost";
Vue.prototype.$ImagePostServer = window.$Server + ":8081";
Vue.prototype.$ImageGetServer = window.$Server + "/img/";
Vue.prototype.$PdfViewerPath = window.$Server + "/pdfjs/web/viewer.html?file=";
// Vue.prototype.$OfficeViewerPath = "https://view.officeapps.live.com/op/view.aspx?src=";
Vue.prototype.$OfficeViewerPath = window.$Server + ":8012/onlinePreview?url=";
Vue.prototype.$WebSiteName = "河北省公益广告大赛评审系统";

Vue.prototype.$WorksGroupCode = [
  { code: "0", value: "高校类" },
  { code: "1", value: "专业类" },
  { code: "2", value: "公众类" },
  { code: "4", value: "战疫类" }
];
Vue.prototype.$UserType = [
  { code: "0", value: "高校组" },
  { code: "1", value: "专业组" },
  { code: "2", value: "公众组" }
];
Vue.prototype.$WorksSeriesCode = [
  { code: "A", value: "“社会主义核心价值观”系列" },
  { code: "B", value: "“自然+环境”系列" },
  { code: "C", value: "“消费者权益保护+知识产权”系列" },
  { code: "D", value: "“社会+安全”系列" },
  { code: "E", value: "“传承+关爱”系列" },
  { code: "F", value: "“成长+校园”系列" },
  { code: "G", value: "“美丽河北”系列" },
  { code: "I", value: "“践行节约  拒绝浪费”系列" },
  { code: "H", value: "其他" }
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
  { code: "1", value: "我保证此作品是我的原创" },
  { code: "2", value: "我使用了素材" }
];

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
