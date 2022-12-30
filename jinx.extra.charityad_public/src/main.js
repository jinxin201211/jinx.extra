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

import Vant from "@/assets/js/vant.import.js";
import "vant/lib/index.less";
import "vant/lib/icon/local.css";
Vue.use(Vant);

import Directives from "./directives/index.js";
Vue.use(Directives);

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

window.$VuexPrefix = "charity.public.";
window.$CookieStoreDays = 7;
// window.$Server = "http://hbsggyjy.hebtu.edu.cn";
window.$Server = "http://www.hbsggyjy.cn";
// window.$Server = "http://43.135.119.85";
// window.$Server = "http://127.0.0.1";
// window.$Server = "http://192.168.0.111";
window.$FileUploadServer = window.$Server + ":8084";

Vue.prototype.$Host = "www.hbsggyjy.cn";
// Vue.prototype.$Host = "43.135.119.85";
Vue.prototype.$Domain = "http://" + Vue.prototype.$Host;
// Vue.prototype.$FileGetServer = `${window.$Server}/img/`;
Vue.prototype.$FileGetServer = "http://43.135.119.85/img/";
// Vue.prototype.$FileGetServer = "http://127.0.0.1/img/";
Vue.prototype.$CertFileGetServer = window.$Server + ":8084/gameWorks2/downloadCert?file_name=";
Vue.prototype.$PdfViewerPath = window.$Server + "/pdfjs/web/viewer.html?file=";
Vue.prototype.$OfficeViewerPath = window.$Server + "/office/onlinePreview?url=";
Vue.prototype.$WebSiteName = "河北省公益广告大赛";

Vue.prototype.$WorksGroupCode = [
  { code: "0", value: "高校类" },
  { code: "1", value: "专业类" },
  { code: "2", value: "公众类" },
  { code: "3", value: "青少年类" }
  // { code: "4", value: "抗疫类" }
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

Vue.prototype.$GuideType = [
  { code: "1", value: "监护人" },
  { code: "2", value: "老师" }
];

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
