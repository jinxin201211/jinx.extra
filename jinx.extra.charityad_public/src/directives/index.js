import jinxTap from "./tap";

const directives = {
  jinxTap
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
