<template>
  <div v-html="HTML">
    <span v-if="HTML === ''">加载中...</span>
  </div>
</template>

<script>
export default {
  props: ["src"],
  data() {
    return {
      HTML: ""
    };
  },
  created() {
    const mammoth = require("mammoth");
    const _this = this;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.src);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {
      let content = xhr.response;
      let blob = new Blob([content], { type: "application/pdf" });

      let reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function(loadEvent) {
        var arrayBuffer = xhr.response; //arrayBuffer

        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(result => {
            let html = result.value; // The generated HTML
            let messages = result.messages; // Any messages, such as warnings during conversion
            console.log(html);
            console.log(messages);
            _this.HTML = html;
          })
          .done();
      };
    };
    xhr.send();

    // this.axios
    //   .get(this.src)
    //   .then(function(response) {
    //     console.log(response.data);
    //     let str = response.data;
    //     let buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
    //     let bufView = new Uint16Array(buf);
    //     for (let i = 0, strLen = str.length; i < strLen; i++) {
    //       bufView[i] = str.charCodeAt(i);
    //     }
    //     console.log(buf);
    //     console.log(bufView);
    //     mammoth
    //       .convertToHtml({ arrayBuffer: buf })
    //       .then(function(result) {
    //         let html = result.value; // The generated HTML
    //         let messages = result.messages; // Any messages, such as warnings during conversion
    //         console.log(html);
    //         console.log(messages);
    //         this.HTML = html;
    //       })
    //       .done();
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    // mammoth
    //   .convertToHtml({ path: this.src })
    //   .then(function(result) {
    //     let html = result.value; // The generated HTML
    //     let messages = result.messages; // Any messages, such as warnings during conversion
    //     console.log(html);
    //     console.log(messages);
    //     this.HTML = html;
    //   })
    //   .done();
  }
};
</script>
