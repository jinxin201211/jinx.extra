/**
 * 封装导出Excal文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
//api.js
import axios from "axios";
export function jinx_download(url, options = {}) {
  return new Promise((resolve, reject) => {
    // console.log(`${url} 请求数据，参数=>`, JSON.stringify(options));
    axios.defaults.headers["content-type"] = "application/json;charset=UTF-8";
    axios({
      method: "get",
      url: url, // 请求地址
      data: options, // 参数
      responseType: "blob" // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data);
        let blob = new Blob([response.data], {
          type: "application/vnd.ms-excel"
        });
        // console.log(blob);
        let fileName = Date.parse(new Date()) + ".xlsx";
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName);
        } else {
          // console.log(3)
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}
