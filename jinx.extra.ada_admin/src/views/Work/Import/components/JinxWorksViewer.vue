<template>
  <div id="page" style="padding: 0 20px;">
    <el-card>
      <div>
        <span style="font-size: 24px; font-weight: bold;" v-text="WorksInfo.works.worksName"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品编号</span>
        <span v-text="WorksInfo.works.wno"></span>
      </div>
      <!--<div class="jinx-works-info">
        <span>作品名称</span>
        <span v-text="WorksInfo.works.worksName"></span>
      </div>-->
      <div class="jinx-works-info">
        <span>作品类别</span>
        <span v-text="WorksInfo.works.worksType"></span>
      </div>
      <div class="jinx-works-info">
        <span>命题名称</span>
        <span v-text="WorksInfo.works.worksSeriesName"></span>
      </div>
      <!--<div class="jinx-works-info">
        <span>作品素材来源</span>
        <span v-text="WorksInfo.works.materialSurce"></span>
      </div>
      <div class="jinx-works-info">
        <span>作品创意说明</span>
        <span v-text="WorksInfo.works.creativeOverview"></span>
      </div>-->
      <div class="jinx-works-info">
        <span>作者</span>
        <span v-text="WorksInfo.works.author1"></span>
      </div>
      <div class="jinx-works-info">
        <span>指导教师</span>
        <span v-text="WorksInfo.works.tuname"></span>
      </div>
      <div class="jinx-works-info">
        <span>学校</span>
        <span v-text="WorksInfo.works.school"></span>
      </div>
    </el-card>
    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item"></span>
        <el-link :href="$ImageGetServer + item" target="blank" type="primary" style="float: right;">下载</el-link>
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
      <div v-else-if="isOffice(item)" style="text-align: center;">
        <a :href="$OfficeViewerPath + $ImageGetServer + item" v-text="item" target="_blank"></a>
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
  props: ["wid"],
  components: { JinxVideoPlayer },
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
