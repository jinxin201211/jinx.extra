import axios from "axios";

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    config.headers["lw-token"] = sessionStorage.getItem(window.$VuexPrefix + "Token");
    // config.headers["lw-token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJFUlRZVUkiLCJleHAiOjE1ODkzNDE3NzZ9.k1KuRRkm_L5L1ZFM8PthbWQAIvGtgu98Ce-bnDrqSrg";
    if (!config.url.startsWith("/")) {
      config.url = "/" + config.url;
    }
    config.url = config.url.replace("/api", window.$Server + ":8083");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
