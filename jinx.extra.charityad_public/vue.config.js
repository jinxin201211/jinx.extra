const path = require("path");

module.exports = {
  // 配置跨域代理
  devServer: {
    hot: true, //自动保存
    open: true, //自动启动
    port: 8808, //默认端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // target: "http://47.108.88.211", // 你自己的api接口地址
        target: "http://127.0.0.1:52025/server_gyggds", // 你自己的api接口地址
        // target: "http://127.0.0.1:8098", // 你自己的api接口地址
        // target: "http://hbsggyjy.hebtu.edu.cn:8084/", // 你自己的api接口地址
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
  assetsDir: "static",
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
      args[0].title = "河北省公益广告大赛";
      return args;
    });
  }
};
