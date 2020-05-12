import axios from "axios";

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    config.headers["lw-token"] = sessionStorage.getItem(window.$VuexPrefix + "Token");
    // config.url = (config.url.startsWith("/") ? "http://47.108.88.211:8080" : "http://47.108.88.211:8080/") + config.url;
    config.url = config.url.replace("/api", "http://47.108.88.211:8080");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
