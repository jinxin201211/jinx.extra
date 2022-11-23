<template>
  <div id="page" style="padding: 20px 0; padding-bottom: 200px; position: relative; height: 100%; overflow: hidden; box-sizing: border-box;">
    <div style="height: 100%; overflow-y: auto; padding: 0 20px; padding-bottom: 20px;">
      <el-page-header @back="handleBack" content="作品打分" style="margin-bottom: 20px;"> </el-page-header>
      <div style="margin-top: 20px;">
        <div style="margin-bottom: 20px;" v-if="false">评审进度：<span v-text="query.limit * (query.page - 1) + (query.index + 1)"></span>/<span v-text="count"></span></div>

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
            <el-link v-if="isVideo(item.fileName) || isFlash(item.fileName) || isOffice(item.fileName)" :href="$ImageGetServer + item.fileName" target="blank" type="primary" style="float: right;" download="xxxxxxxxxx">下载</el-link>
          </div>
          <div v-if="isImage(item.fileName)" style="text-align: center;">
            <el-image :src="$ImageGetServer + item.fileName" style="max-width: 960px; margin: 0 auto;" :preview-src-list="PreviewSrcList">
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
    </div>

    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff; box-sizing: border-box;">
      <div style="position: relative; text-align: center;">
        <el-rate v-model="Score" :max="10" :disabled="submit_status.disabled || submit_status.loading" show-score score-template="{value}" style="display: inline-block; margin-right: 20px;" @change="handleScoreChange"></el-rate>
        <!--<el-radio-group v-model="appraisal" :disabled="submit_status.disabled || submit_status.loading" @change="handleAppraisalChange" :loading="submit_status.loading">
          <el-radio label="1" border size="medium">通过</el-radio>
          <el-radio label="2" border size="medium">不通过</el-radio>
        </el-radio-group>-->
        <!--<el-button size="small" type="primary" @click="handleSubmit" :loading="submit_status.loading" :disabled="submit_status.disabled || appraisal === null || appraisal === ''" style="margin: 15px;">确 定</el-button>-->
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
      List: [],
      WorksInfo: {
        works: {},
        works_file: {}
      },
      PreviewSrcList: [],
      submit_status: {
        loading: false,
        disabled: false
      },
      next_status: {
        loading: false,
        disabled: false
      },
      Score: 0,
      query: {
        limit: this.$route.query.limit * 1,
        page: this.$route.query.page * 1,
        gameType: this.$route.query.gameType,
        author1: this.$route.query.author1,
        orgName: this.$route.query.orgName,
        worksName: this.$route.query.worksName,
        index: this.$route.query.index * 1
      },
      count: 0,
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
    this.getList();
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    getList: function() {
      let loading = this.$loading({ target: "#page" });
      let _this = this;
      _this.next_status.disabled = false;
      this.axios
        .post("/api/gameWorks2/getNoAppraisalList_Round1", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.count = response.data.count * 1;
            if (response.data.data.length == 0) {
              _this.WorksInfo = {
                works: {},
                works_file: {}
              };
              _this.submit_status.disabled = true;
              _this.next_status.disabled = true;
              _this.query.index = 0;
              // _this.query.page--;
              _this.$message({
                showClose: true,
                message: "没有更多的作品需要评审",
                type: "warning"
              });
            } else {
              _this.List = response.data.data;
              _this.getNextWork();
            }
          } else {
            _this.$message({
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
          _this.$message({
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
      let _this = this;
      this.next_status.loading = true;
      _this.submit_status.disabled = false;
      if (this.query.index > this.List.length - 1) {
        this.query.index = this.List.length - 1;
      }
      this.Score = 0;
      this.PreviewSrcList = [];
      this.axios
        .get("/api/gameWorks2/getOne", { params: { wid: this.List[this.query.index].wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.WorksInfo = response.data.data;
            if (_this.WorksInfo.works.state != null) {
              _this.Score = _this.WorksInfo.works.state * 1;
            }

            _this.game_type = _this.WorksInfo.works.gameType;
            if (_this.WorksInfo.works.gameType === "4") {
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
            } else {
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
              _this.WorksInfo.works.materialSurce = _this.WorksInfo.works.materialSurce == null ? "" : _this.$MaterialSurceCode.find(p => p.code == _this.WorksInfo.works.materialSurce).value;
            }
            for (let i = 0; i < _this.WorksInfo.works_file.length; i++) {
              if (_this.isImage(_this.WorksInfo.works_file[i].fileName)) {
                _this.PreviewSrcList.push(_this.$ImageGetServer + _this.WorksInfo.works_file[i].fileName);
              }
            }

            // _this.Score = Math.ceil(Math.random() * 10); //todo
            // _this.submit();
          } else {
            _this.submit_status.disabled = true;
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          _this.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          _this.submit_status.disabled = true;
          _this.next_status.loading = false;
          _this.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    handleSubmit: function() {
      // if (this.appraisal == "") {
      //   this.$message({
      //     type: "warning",
      //     message: "请选择是否通过"
      //   });
      //   return;
      // }
      if (this.Score === 0) {
        this.$message({
          type: "warning",
          message: "没有打分，不能提交"
        });
        return;
      }

      this.submit();
    },
    handleScoreChange() {
      this.submit();
    },
    submit: function() {
      let _this = this;
      let data = {
        wid: this.WorksInfo.works.wid,
        state: this.Score
      };
      _this.submit_status.loading = true;
      this.axios
        .post("/api/gameWorks2/appraisal_round1", qs.stringify(data))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            _this.handleNextWorks();
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.submit_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.submit_status.loading = false;
          _this.$message({
            showClose: true,
            message: "提交失败",
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
