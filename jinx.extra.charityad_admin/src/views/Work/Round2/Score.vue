<template>
  <div id="page" style="padding: 20px 0; padding-bottom: 300px; position: relative; height: 100%; overflow: hidden; box-sizing: border-box;">
    <div style="height: 100%; overflow-y: auto; padding: 0 20px; padding-bottom: 20px;">
      <el-page-header @back="handleBack" content="作品打分" style="margin-bottom: 20px;"> </el-page-header>
      <div style="margin-top: 20px;">
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
              <span>作品类别</span>
              <span v-text="(WorksInfo.works.worksSeries == null ? '' : WorksInfo.works.worksSeries) + ' | ' + (WorksInfo.works.worksType == null ? '' : WorksInfo.works.worksType)"></span>
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
            <span v-text="'文件' + (index + 1) + '. ' + item.fileName"></span>
            <el-link v-if="isVideo(item.fileName)" :href="$ImageGetServer + item.fileName" target="blank" type="primary" style="float: right;">下载</el-link>
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
          <div v-else-if="isAudio(item.fileName)" style="text-align: center;">
            <audio :src="$ImageGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
          </div>
          <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
            <a :href="$PdfViewerPath + $ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
          <div v-else-if="isOffice(item)" style="text-align: center;">
            <a :href="$OfficeViewerPath + $ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
          <div v-else style="text-align: center;">
            <a :href="$ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
        </el-card>
      </div>
    </div>

    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff; box-sizing: border-box;">
      <div style="text-align: center;">
        <el-rate v-model="Score" :max="10" :disabled="WorksInfo.empty" show-score score-template="{value}" style="display: inline-block; margin-right: 20px;"></el-rate>
        <el-button size="small" type="primary" @click="handleSubmit" :loading="submit_status.loading" :disabled="submit_status.disabled || Score === null || Score === 0" style="margin: 15px;">确 定</el-button>
      </div>
      <el-divider></el-divider>
      <div style="text-align: center;">
        <el-button size="small" type="primary" @click="handlePrevWorks" :disabled="query.index === 0 && query.page === 1">上一个</el-button>
        <el-button size="small" type="primary" @click="handleNextWorks" :loading="next_status.loading" :disabled="next_status.disabled">下一个</el-button>
        <el-button size="small" type="primary" @click="handleBack">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";

export default {
  components: { JinxVideoPlayer },
  data() {
    return {
      query: {
        limit: this.$route.query.limit * 1,
        page: this.$route.query.page * 1,
        index: this.$route.query.index * 1
      },
      ScoreIconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      ScoreIconColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      Score: 0,
      List: [],
      WorksInfo: {
        works: {},
        works_file: {},
        empty: true
      },
      submit_status: {
        loading: false,
        disabled: false
      },
      next_status: {
        loading: false,
        disabled: false
      },
      game_type: -1
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    getList: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.axios
        .post("/api/gameWorks2/getNoAppraisalList_Round2", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            if (response.data.data.length == 0) {
              that.List = [];
              that.WorksInfo = {
                works: {},
                works_file: {},
                empty: true
              };
              that.submit_status.disabled = true;
              that.next_status.disabled = true;
              that.query.index = 0;
              // that.query.page--;
              that.$message({
                showClose: true,
                message: "没有更多的作品需要评审",
                type: "warning"
              });
            } else {
              that.List = response.data.data;
              that.getNextWork();
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
            message: "获取作品失败",
            type: "warning"
          });
        });
    },
    handleNextWorks: function() {
      if (this.query.index < this.query.limit - 1 && this.query.index < this.List.length - 1) {
        this.query.index++;
        this.getNextWork();
      } else {
        this.query.page++;
        this.query.index = 0;
        this.getList();
      }
    },
    handlePrevWorks: function() {
      if (this.query.index > 0) {
        this.query.index--;
        this.getNextWork();
      } else {
        this.query.page--;
        this.query.index = this.query.limit - 1;
        this.getList();
      }
    },
    getNextWork: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.next_status.loading = true;
      that.submit_status.disabled = false;
      that.WorksInfo.empty = true;
      if (this.query.index > this.List.length - 1) {
        this.query.index = this.List.length - 1;
      }
      this.axios
        .get("/api/gameWorks2/getOne", { params: { wid: this.List[this.query.index].wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;
            that.WorksInfo.empty = false;
            that.Score = that.WorksInfo.works.scoreTotal * 1;

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
            that.submit_status.disabled = true;
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          that.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          that.next_status.loading = false;
          that.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    handleSubmit: function() {
      if (this.Score === 0) {
        this.$message({
          type: "warning",
          message: "没有打分，不能提交"
        });
        return;
      }
      this.submit();
    },
    submit: function() {
      let that = this;
      let data = {
        wid: this.WorksInfo.works.wid,
        score1: this.Score,
        score2: 0,
        score3: 0,
        score4: 0,
        scoreTotal: this.Score
      };
      this.axios
        .post("/api/gameWorks2/appraisal_round2", qs.stringify(data))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            that.Scored = true;
            that.submit_status.disabled = true;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.submit_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          that.submit_status.loading = false;
          that.$message({
            showClose: true,
            message: "提交失败",
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
    isOffice: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".doc") || file.endsWith(".docx") || file.endsWith(".xls") || file.endsWith(".xlsx") || file.endsWith(".ppt") || file.endsWith(".pptx")) {
        return true;
      } else {
        return false;
      }
    },
    handleDownload: function(file) {
      window.location.href = file;
    },
    handleScoreClick(score, index) {
      this.ScoreResult.Rank[index] = score;

      let sum = 0;
      for (let i = 0; i < this.ScoreRule.Rank.length; i++) {
        sum += this.ScoreResult.Rank[i] * this.ScoreRule.Rank[i].Percentage;
      }
      this.ScoreResult.Sum = sum.toFixed(3);
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

/deep/ .el-rate__icon {
  font-size: 24px;
}

/deep/ .el-rate__text {
  width: 20px;
  display: inline-block;
}
</style>
