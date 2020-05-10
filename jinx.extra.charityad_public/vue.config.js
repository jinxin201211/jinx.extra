const path = require("path");

module.exports = {
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  publicPath: "./",
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, "src/assets/css/common.less")}";`
        }
      }
    }
  }
};
