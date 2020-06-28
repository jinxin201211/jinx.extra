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
        <span>作品类别</span>
        <span v-text="WorksInfo.works.worksType"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品主题</span>
        <span v-text="WorksInfo.works.worksSeriesName"></span>
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
        <span v-text="'文件' + (index + 1) + '. ' + item"></span>
        <el-link v-if="isVideo(item)" :href="$ImageGetServer + item" target="blank" type="primary" style="float: right;">下载</el-link>
      </div>
      <div v-if="isImage(item)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item]">
          <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div v-else-if="isVideo(item)" style="text-align: center;">
        <jinx-video-player :src="item"></jinx-video-player>
      </div>
      <div v-else-if="isAudio(item)" style="text-align: center;">
        <audio :src="$ImageGetServer + item" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item)" style="text-align: center;">
        <a :href="$PdfViewerPath + $ImageGetServer + item" v-text="item" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$ImageGetServer + item" v-text="item" target="_blank"></a>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";

export default {
  components: { JinxVideoPlayer },
  props: ["wid"],
  data() {
    return {
      WorksInfo: {
        works: {},
        works_file: []
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
            let type = that.$WorksTypeCode.find(x => x.code == that.WorksInfo.works.worksType);
            that.WorksInfo.works.worksType = type == null ? "" : type.value;
            that.WorksInfo.works_file = [];
            if (that.WorksInfo.works.file1) {
              that.WorksInfo.works_file.push(that.WorksInfo.works.file1);
            }
            if (that.WorksInfo.works.file2) {
              that.WorksInfo.works_file.push(that.WorksInfo.works.file2);
            }
            if (that.WorksInfo.works.file3) {
              that.WorksInfo.works_file.push(that.WorksInfo.works.file3);
            }
            if (that.WorksInfo.works.file4) {
              that.WorksInfo.works_file.push(that.WorksInfo.works.file4);
            }
            if (that.WorksInfo.works.file5) {
              that.WorksInfo.works_file.push(that.WorksInfo.works.file5);
            }
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
    },
    getExtensionName(filename) {
      if (!filename || typeof filename != "string") {
        return false;
      }
      let a = filename
        .split("")
        .reverse()
        .join("");
      let b = a
        .substring(0, a.search(/\./))
        .split("")
        .reverse()
        .join("");
      return b;
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
