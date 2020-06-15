<template>
  <div id="page" style="padding: 20px;">
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
      <div class="jinx-works-info">
        <span>作品素材来源</span>
        <span v-text="WorksInfo.works.materialSurce"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品创意说明</span>
        <span v-text="WorksInfo.works.creativeOverview"></span>
      </div>
    </el-card>
    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item.fileName"></span>
      </div>
      <div v-if="isImage(item.fileName)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item.fileName" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item.fileName]"></el-image>
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
      }
    };
  },
  mounted() {
    this.getWorksData();
  },
  methods: {
    getWorksData: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      // this.next_status.loading = true;
      // that.submit_status.disabled = false;
      this.axios
        .get("/api/gameWorks3/getOne", { params: { wid: this.wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo.works = response.data.data;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          // that.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          // that.next_status.loading = false;
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
