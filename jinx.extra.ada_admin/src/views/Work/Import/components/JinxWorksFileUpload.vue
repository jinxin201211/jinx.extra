<template>
  <div id="page" style="padding: 20px;">
    <el-card>
      <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">上传作品文件：</div>
      <el-upload class="upload-demo" ref="upload" :action="action" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="handleSuccess" :on-error="handleError" :multiple="true" :on-exceed="handleExceed" :data="param" :before-upload="handleBeforeUpload" :before-remove="handleBeforeRemove">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">点击‘选取文件’按钮选取要上传的文件，选取完成后，点击‘上传到服务器’按钮将文件上传到服务器，待文件全部上传成功之后单击‘提交本作品’按钮结束本次上传，单个文件大小不超过<span v-text="maxSize"></span>Mb</div>
      </el-upload>
    </el-card>

    <el-card>
      <div>
        <span style="font-size: 24px; font-weight: bold;" v-text="WorksInfo.works.worksName"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品编号</span>
        <span v-text="WorksInfo.works.wno"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品名称</span>
        <span v-text="WorksInfo.works.worksName"></span>
      </div>
    </el-card>

    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item.fileName"></span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleFileDelete(item.id, index)">删除</el-button>
      </div>
      <div v-if="isImage(item.fileName)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item.fileName" style="max-width: 600px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item.fileName]"></el-image>
      </div>
      <div v-else-if="isVideo(item.fileName)" style="text-align: center;">
        <video :src="$ImageGetServer + item.fileName" controls="controls" style="max-width: 960px; margin: 0 auto;">您的浏览器不支持 video 标签。</video>
      </div>
      <div v-else-if="isAudio(item.fileName)" style="text-align: center;">
        <audio :src="$ImageGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
        <a :href="$ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";

export default {
  props: ["wid"],
  data() {
    return {
      WorksInfo: {
        works: {},
        works_file: {}
      },
      param: {
        wid: this.wid
      },
      fileList: [],
      successList: [],
      action: this.$ImagePostServer + "/gameWorksFile/upload",
      maxSize: 10
    };
  },
  mounted() {
    this.getWorksData();
  },
  methods: {
    getWorksData: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.axios
        .get("/api/gameWorks2/getOne", { params: { wid: this.wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          that.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    isImage: function(file) {
      if (file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif")) {
        return true;
      } else {
        return false;
      }
    },
    isAudio: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".wma") || file.endsWith(".ogg")) {
        return true;
      } else {
        return false;
      }
    },
    isVideo: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".flv") || file.endsWith(".mov") || file.endsWith(".mkv")) {
        return true;
      } else {
        return false;
      }
    },
    isPDF: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".pdf")) {
        return true;
      } else {
        return false;
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.successList.splice(this.successList.indexOf(file), 1);
    },
    handlePreview(file) {},
    handleSuccess: function(response, file, fileList) {
      if (response.code == -1) {
        this.$message({
          showClose: true,
          message: `${file.name} 上传失败`,
          type: "error"
        });
        fileList.splice(fileList.indexOf(file), 1);
      } else {
        this.$message({
          showClose: true,
          message: `${file.name} 上传成功`,
          type: "info"
        });
        file.serverid = response.data;
        this.successList.push(file);
        this.successList.sort((a, b) => a.uid - b.uid);
      }
    },
    handleError: function(err, file, fileList) {
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
      });
    },
    handleExceed: function() {
      this.$message({
        showClose: true,
        message: `超出文件个数限制`,
        type: "error"
      });
    },
    handleBeforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.maxSize;
      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      return true;
    },
    handleBeforeRemove: function(file, list) {
      if (file.status === "success") {
        let delete_file = this.successList[list.indexOf(file)];
        let that = this;
        this.axios
          .post("/api/gameWorksFile/delete", qs.stringify({ id: delete_file.serverid }))
          .then(function(response) {
            if (response && response.data.code == "0") {
              //删除页面列表上的数据
              that.$message({
                showClose: true,
                message: `文件删除成功`,
                type: "info"
              });
              list.splice(list.indexOf(file), 1);
            } else {
              that.$message({
                showClose: true,
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message({
              showClose: true,
              message: "文件删除失败",
              type: "warning"
            });
          });
        return false;
      }
    },
    handleFileDelete(id, index) {
      let that = this;
      this.axios
        .post("/api/gameWorksFile/delete", qs.stringify({ id: id }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            //删除页面列表上的数据
            that.$message({
              showClose: true,
              message: "删除成功",
              type: "info"
            });
            that.WorksInfo.works_file.splice(index, 1);
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "文件删除失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

*::-webkit-scrollbar {
  width: 6px;
  height: 1px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #d7d8d9;
}
*::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background: #f1f2f3;
}
*::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  // border-radius: 10px;
  // background: #ededed;
}

.jinx-works-info {
  margin: 15px 0;

  span:first-child {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding: 0 20px;
  }
  span:last-child {
    display: inline-block;
    padding: 0 20px;
    word-break: break-all;
  }
}
</style>
