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
      <div v-if="game_type === '4'">
        <div class="jinx-works-info">
          <span>参赛组别</span>
          <span v-text="WorksInfo.works.gameType"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品类别</span>
          <span v-text="WorksInfo.works.worksType == null ? '' : WorksInfo.works.worksType"></span>
        </div>
      </div>
      <div v-else>
        <div class="jinx-works-info">
          <span>参赛组别</span>
          <span v-text="WorksInfo.works.gameType"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品主题</span>
          <span v-text="WorksInfo.works.worksSeries"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品类别</span>
          <span v-text="WorksInfo.works.worksType"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品素材来源</span>
          <span v-text="WorksInfo.works.materialSurce"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品创意说明</span>
          <span v-text="WorksInfo.works.creativeOverview"></span>
        </div>
      </div>
    </el-card>
    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + encryptFileName(item.fileName)"></span>
        <el-link v-if="isVideo(item.fileName) || isFlash(item.fileName)" :href="$ImageGetServer + item.fileName" target="blank" type="primary" style="float: right;">下载</el-link>
      </div>
      <div v-if="isImage(item.fileName)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item.fileName" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item.fileName]">
          <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div v-else-if="isVideo(item.fileName)" style="text-align: center;">
        <jinx-video-player :src="item.fileName"></jinx-video-player>
      </div>
      <div v-else-if="isFlash(item.fileName)" style="text-align: center;">
        <jinx-flash-player :src="item.fileName"></jinx-flash-player>
      </div>
      <div v-else-if="isAudio(item.fileName)" style="text-align: center;">
        <audio :src="$ImageGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
        <a :href="$PdfViewerPath + $ImageGetServer + item.fileName" v-text="encryptFileName(item.fileName)" target="_blank"></a>
      </div>
      <div v-else-if="isOffice(item.fileName)" style="text-align: center;">
        <a :href="$OfficeViewerPath + $ImageGetServer + item.fileName" v-text="encryptFileName(item.fileName)" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$ImageGetServer + item.fileName" v-text="encryptFileName(item.fileName)" target="_blank"></a>
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
        works_file: {}
      },
      game_type: -1
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
        .get("/api/gameWorks2/getOne", { params: { wid: this.wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;
            that.game_type = that.WorksInfo.works.gameType;
            if (that.WorksInfo.works.gameType === "4") {
              that.WorksInfo.works.gameType = that.$WorksGroupCode.find(p => p.code == that.WorksInfo.works.gameType).value;
              that.WorksInfo.works.worksType = that.$WorksTypeCode.find(p => p.code == that.WorksInfo.works.worksType).value;
            } else {
              that.WorksInfo.works.gameType = that.$WorksGroupCode.find(p => p.code == that.WorksInfo.works.gameType).value;
              that.WorksInfo.works.worksSeries = that.$WorksSeriesCode.find(p => p.code == that.WorksInfo.works.worksSeries).value;
              that.WorksInfo.works.worksType = that.$WorksTypeCode.find(p => p.code == that.WorksInfo.works.worksType).value;
              that.WorksInfo.works.materialSurce = that.$MaterialSurceCode.find(p => p.code == that.WorksInfo.works.materialSurce).value;
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
