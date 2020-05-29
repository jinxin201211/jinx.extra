const path = require("path");

module.exports = {
  // 配置跨域代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.108.88.211:8080", // 你自己的api接口地址
        // target: "http://127.0.0.1:8098", // 你自己的api接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  publicPath: "./",
  assetsDir: 'static',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, "src/assets/css/common.less")}";`
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "全国大学生广告艺术大赛（河北赛区）评审系统";
      return args;
    });
  }
};
