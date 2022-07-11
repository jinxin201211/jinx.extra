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
// window.$Server = "http://www.hbsggyjy.cn";
window.$Server = "http://127.0.0.1";
window.$FileUploadServer = window.$Server + ":8084";

Vue.prototype.$Host = "www.hbsggyjy.cn";
Vue.prototype.$Domain = "http://" + Vue.prototype.$Host;
Vue.prototype.$FileGetServer = `${window.$Server}/img/`;
Vue.prototype.$CertFileGetServer = window.$Server + ":8084/gameWorks2/downloadCert?file_name=";
Vue.prototype.$PdfViewerPath = window.$Server + "/pdfjs/web/viewer.html?file=";
Vue.prototype.$OfficeViewerPath = window.$Server + "/office/onlinePreview?url=";
Vue.prototype.$WebSiteName = "河北省公益广告大赛";

Vue.prototype.$WorksGroupCode = [
  { code: "0", value: "高校类" },
  { code: "1", value: "专业类" },
  { code: "2", value: "公众类" },
  { code: "3", value: "青少年类" },
  { code: "4", value: "抗疫类" }
];
Vue.prototype.$WorksSeriesCode = [
  {
    code: "A",
    value: "“我心向党，喜迎二十大”作品方向",
    children: [
      { code: "1", value: "喜迎二十大，奋斗新征程" },
      { code: "2", value: "传承革命思想，牢记红色党史" },
      { code: "3", value: "学习革命精神，贡献时代力量" },
      { code: "4", value: "传播党建文化，助力伟大复兴" },
      { code: "5", value: "其他" }
    ]
  },
  {
    code: "B",
    value: "“崇德向法，社会筑和谐”作品方向",
    children: [
      { code: "1", value: "弘扬社会主义核心价值观" },
      { code: "2", value: "强化法治建设，弘扬法律精神" },
      { code: "3", value: "净化网络环境，倡导网络道德" },
      { code: "4", value: "坚持防微杜渐，守护国家安全" },
      { code: "5", value: "弘扬廉政文化，推进防腐倡廉" },
      { code: "6", value: "优化营商环境，激发市场活力" },
      { code: "7", value: "维护市场秩序，保护消费者权益" },
      { code: "8", value: "其他" }
    ]
  },
  {
    code: "C",
    value: "“美丽河北，文明新风尚”作品方向",
    children: [
      { code: "1", value: "展示城市形象，塑造城市特色" },
      { code: "2", value: "推进乡村振兴，建设美丽乡村" },
      { code: "3", value: "呼吁文明行为，引领城市文明" },
      { code: "4", value: "倡导全民阅读，构建书香社会" },
      { code: "5", value: "其他" }
    ]
  },
  {
    code: "D",
    value: "“传承文化，科技促发展”作品方向",
    children: [
      { code: "1", value: "传承中华文化，弘扬民族精神" },
      { code: "2", value: "建设文化强国，提高文化自信" },
      { code: "3", value: "加强科技创新，保护知识产权" },
      { code: "4", value: "保护传统节日，彰显文化内涵" },
      { code: "5", value: "其他" }
    ]
  },
  {
    code: "E",
    value: "“保护环境，发展可持续”作品方向",
    children: [
      { code: "1", value: "节约生态资源，践行持续发展" },
      { code: "2", value: "厉行节约粮食，制止餐饮浪费" },
      { code: "3", value: "倡导低碳出行，践行绿色生活" },
      { code: "4", value: "加强污染治理，守护生存环境" },
      { code: "5", value: "保护野生生物，共创绿色家园" },
      { code: "6", value: "其他" }
    ]
  },
  {
    code: "F",
    value: "“守护健康，生命有保障”作品方向",
    children: [
      { code: "1", value: "关注眼睛健康，守望精彩世界" },
      { code: "2", value: "弘扬体育精神，倡导全民运动" },
      { code: "3", value: "筑牢食药安全，减少健康隐患" },
      { code: "4", value: "倡导全民防疫，致敬医护战士" },
      { code: "5", value: "其他" }
    ]
  },
  {
    code: "G",
    value: "“敬老助老，关爱老年人”作品方向",
    children: [
      { code: "1", value: "打击养老诈骗，保护老人权益" },
      { code: "2", value: "聚焦涉老产品，降低生命隐患" },
      { code: "3", value: "关注养老需求，丰富老年生活" },
      { code: "4", value: "传承孝善家风，开展敬老服务" },
      { code: "5", value: "其他" }
    ]
  },
  {
    code: "H",
    value: "“成长护航，呵护青少年”作品方向",
    children: [
      { code: "1", value: "树立人生理想，心怀责任担当" },
      { code: "2", value: "关注校园安全，抵制校园霸凌" },
      { code: "3", value: "推动教育双减，推动素质发展" },
      { code: "4", value: "强化心理教育，呵护心理健康" },
      { code: "5", value: "遵守文明礼仪，共创文明校园" },
      { code: "6", value: "心系希望工程，助梦贫困学子" },
      { code: "7", value: "其他" }
    ]
  },
  {
    code: "I",
    value: "“全民参与，公益无止境”作品方向",
    children: [
      { code: "1", value: "弘扬公益精神，传播公益文化" },
      { code: "2", value: "褒扬善行义举，汇聚文明正气" },
      { code: "3", value: "全民心向公益，传递社会爱心" },
      { code: "4", value: "其他" }
    ]
  }
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
