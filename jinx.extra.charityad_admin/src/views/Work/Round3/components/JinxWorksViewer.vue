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
          <span v-text="WorksSeries"></span>
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
  computed: {
    WorksSeries() {
      let series = "";
      if (this.WorksInfo.works.worksSeries) {
        series += this.WorksInfo.works.worksSeries;
      }
      if (this.WorksInfo.works.worksSeriesSub) {
        series += " | " + this.WorksInfo.works.worksSeriesSub;
      }
      return series;
    }
  },
  mounted() {
    this.getWorksData();
  },
  methods: {
    getWorksData: function() {
      let loading = this.$loading({ target: "#page" });
      let _this = this;
      // this.next_status.loading = true;
      // _this.submit_status.disabled = false;
      this.axios
        .get("/api/gameWorks2/getOne", { params: { wid: this.wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.WorksInfo = response.data.data;
            _this.game_type = _this.WorksInfo.works.gameType;
            if (_this.WorksInfo.works.gameType === "4") {
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
            } else {
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
              _this.WorksInfo.works.materialSurce = _this.WorksInfo.works.materialSurce == null ? "" : _this.$MaterialSurceCode.find(p => p.code == _this.WorksInfo.works.materialSurce).value;
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          // _this.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          // _this.next_status.loading = false;
          _this.$message({
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
