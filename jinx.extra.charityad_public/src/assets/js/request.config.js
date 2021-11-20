import axios from "axios";

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem(window.$VuexPrefix + "Token")) {
      config.headers["lw-token"] = sessionStorage.getItem(window.$VuexPrefix + "Token");
    }

    if (!config.url.startsWith("http")) {
      if (!config.url.startsWith("/")) {
        config.url = "/" + config.url;
      }
      // config.url = config.url.replace("/api", window.$Server + ":8084");
      config.url = config.url.replace("/api", window.$Server + ":8080");
      // config.url = config.url.replace("/api", window.$Server + "/server_gyggds");
    }
    console.log(config);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
