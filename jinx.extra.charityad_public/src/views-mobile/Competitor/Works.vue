<template>
  <div style="min-height: 100%; box-sizing: border-box; ">
    <van-nav-bar title="我的作品" left-arrow @click-left="$router.go(-1)" />
    <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
      <jinx-mobile-work v-for="item in List" :key="'jinx-mobile-work-' + item.wid" :info="item" @submit="handleSubmit(item)" @view="handleView(item)" @modify="handleModify(item)" @delete="handleDelete(item)" @download="handleDownload(item)" @reply="handleDownloadReply(item)"></jinx-mobile-work>
    </van-pull-refresh>
    <div style="position: fixed; bottom: 15px; right: 15px; z-index: 1;">
      <el-button type="primary" @click="handleNewWork">新增作品</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { Dialog } from "vant";
import JinxMobileWork from "./components/JinxMobileWork.vue";

export default {
  components: { JinxMobileWork },
  data: function() {
    return {
      List: [],
      refreshing: true
    };
  },
  mounted() {
    this.getList();
  },
  inject: ["reload"],
  methods: {
    getList() {
      let _this = this;
      this.List = [];
      _this.refreshing = true;
      this.axios
        .post("/api/gameWorks2/getWorksList", qs.stringify({ page: 1, limit: 999 }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.List = response.data.data;
            _this.List.forEach(p => {
              p.worksType = _this.$WorksTypeCode.find(x => x.code == p.worksType).value;
              p.gameType = _this.$WorksGroupCode.find(x => x.code == p.gameType).value;
              p.submitState = p.submitState == null || p.submitState == "" ? "未提交" : "已提交";
              let authors = [];
              for (let i = 1; i <= 5; i++) {
                if (p["author" + i]) {
                  authors.push(p["author" + i]);
                }
              }
              p.author1 = authors.join("，");

              if (p.ltGameCert && p.ltGameCert.length > 0) {
                p.ltGameCert.push({
                  certFile: "优秀组织奖/" + p.orgName + ".jpg"
                });
                p.ltGameCert.push({
                  certFile: "优秀指导老师/" + p.tUname + ".jpg"
                });
              }
            });
            // _this.List.push(..._this.List); //todo
            // _this.List = [_this.List[0]]; //todo
          } else {
            _this.$message({
              showClose: true,
              message: "获取作品列表失败",
              type: "warning"
            });
          }
          _this.refreshing = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.refreshing = false;
          _this.$message({
            showClose: true,
            message: "获取作品列表失败",
            type: "warning"
          });
        });
    },
    handleRefresh() {
      this.getList();
    },
    handleView: function(data) {
      this.$router.push({
        path: "/m/competitor/work",
        query: {
          wid: data.wid
        }
      });
    },
    handleRowDbclick: function(row, column, event) {
      this.$router.push({
        path: "/m/competitor/work",
        query: {
          wid: row.wid
        }
      });
    },
    handleModify: function(data) {
      this.$router.push({
        path: "/m/competitor/modify",
        query: {
          wid: data.wid
        }
      });
    },
    handleDelete: function(data) {
      Dialog.confirm({
        message: "确认删除？"
      })
        .then(_ => {
          let _this = this;
          this.axios
            .post("/api/gameWorks2/delete", qs.stringify({ wid: data.wid }))
            .then(function(response) {
              if (response && response.data.code == "0") {
                _this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                _this.reload();
              } else {
                _this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
              _this.$message({
                showClose: true,
                message: "删除失败",
                type: "warning"
              });
            });
        })
        .catch(_ => {});
    },
    handleSubmit: function(data) {
      let _this = this;
      this.axios
        .post("/api/gameWorks2/submit", qs.stringify({ wid: data.wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            _this.reload();
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            showClose: true,
            message: "提交失败",
            type: "warning"
          });
        });
    },
    handleNewWork: function() {
      this.$router.push("/m/work");
    },
    handleDownload(data) {
      for (let index = 0; index < data.ltGameCert.length; index++) {
        const file = data.ltGameCert[index].certFile;
        this.downloadUrlFile(`${window.$Server}/certfile/` + file);
      }
    },
    handleDownloadReply() {
      this.downloadUrlFile(`${window.$Server}/certfile/` + "回函.zip");
    },
    /**
     * 获取页面文件名
     * @param url 文件url
     */
    downloadUrlFile(url) {
      url = url.replace(/\\/g, "/");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
      const _this = this;
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取文件blob数据并保存
          var fileName = _this.getFileName(url);
          _this.saveAs(xhr.response, fileName);
        }
      };
      xhr.send();
    },
    /**
     * URL方式保存文件到本地
     * @param data 文件的blob数据
     * @param name 文件名
     */
    saveAs(data, name) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      save_link.click();
    },
    /**
     * 根据文件url获取文件名
     * @param url 文件url
     */
    getFileName(url) {
      var num = url.lastIndexOf("/") + 1;
      var fileName = url.substring(num);
      //把参数和文件名分割开
      fileName = decodeURI(fileName.split("?")[0]);
      return fileName;
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="less" scoped>
/deep/ .van-pull-refresh {
  height: calc(100% - 46px);
  min-height: 500px;
  padding: 15px 0;
  box-sizing: border-box;
}
/deep/ .van-pull-refresh__track {
  min-height: 500px;
}
</style>
