import axios from "axios";

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    config.headers["lw-token"] = localStorage.getItem("Token");
    // config.url = (config.url.startsWith("/") ? "http://47.108.88.211:8080" : "http://47.108.88.211:8080/") + config.url;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
