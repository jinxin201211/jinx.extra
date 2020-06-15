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
window.$CookieStoreDays = 7;
window.$Server = "http://47.108.88.211"; // todo
// window.$Server = "http://211.82.246.251";
window.$FileUploadServer = window.$Server + ":8080";
Vue.prototype.$FileGetServer = window.$Server + "/img/";
Vue.prototype.$WebSiteName = "河北省公益广告大赛";

Vue.prototype.$WorksGroupCode = [
  { code: "0", value: "高校类" },
  { code: "1", value: "专业类" },
  { code: "2", value: "公众类" },
  { code: "4", value: "战疫类" }
];
Vue.prototype.$WorksSeriesCode = [
  { code: "A", value: "“中国梦”系列" },
  { code: "B", value: "“自然+环境”系列" },
  { code: "C", value: "“消费者权益保护+知识产权”系列" },
  { code: "D", value: "“社会+安全”系列" },
  { code: "E", value: "“传承+关爱”系列" },
  { code: "F", value: "“成长+校园”系列" },
  { code: "G", value: "“美丽河北”系列" },
  { code: "H", value: "其他主题" }
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
