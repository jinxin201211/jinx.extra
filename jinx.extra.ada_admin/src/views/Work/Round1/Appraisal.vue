<template>
  <div id="page" style="padding: 20px 0; padding-bottom: 200px; position: relative; height: 100%; overflow: hidden; box-sizing: border-box;">
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
        </el-card>
        <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
          <div slot="header" class="clearfix">
            <span v-text="'文件' + (index + 1) + '. ' + item"></span>
            <el-link :href="$ImageGetServer + item" target="blank" type="primary" style="float: right;">下载</el-link>
          </div>
          <div v-if="isImage(item)" style="text-align: center;">
            <el-image :src="$ImageGetServer + item" style="max-width: 960px; margin: 0 auto;" :preview-src-list="PreviewSrcList">
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
    </div>

    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff; box-sizing: border-box;">
      <div style="position: relative; text-align: center;">
        <el-rate v-model="Score" :max="10" :disabled="submit_status.disabled || submit_status.loading" show-score score-template="{value}" style="display: inline-block; margin-right: 20px;" @change="handleScoreChange"></el-rate>
        <!-- <el-radio-group v-model="appraisal" :disabled="submit_status.disabled || submit_status.loading" @change="handleAppraisalChange" :loading="submit_status.loading">
          <el-radio label="1" border>通过</el-radio>
          <el-radio label="2" border>不通过</el-radio>
        </el-radio-group> -->
        <!--<el-button size="small" type="primary" @click="handleSubmit" :loading="submit_status.loading" :disabled="submit_status.disabled || appraisal === null || appraisal === ''" style="margin: 15px;">确 定</el-button>-->
      </div>
      <el-divider></el-divider>
      <div style="text-align: center;">
        <div style="display: inline-block; margin-right: 10px;"><span v-text="totalIndex"></span><span style="margin: 0 5px;">/</span><span v-text="count"></span></div>
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
        works_file: []
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
        index: this.$route.query.index * 1,
        state: this.$route.query.state
      },
      count: 0
    };
  },
  computed: {
    totalIndex() {
      let tindex = this.query.limit * (this.query.page - 1) + (this.query.index + 1);
      return tindex > this.count ? this.count : tindex;
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
        .post("/api/gameWorks3/getNoAppraisalList_Round1", qs.stringify(this.query))
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
        .get("/api/gameWorks3/getOne", { params: { wid: this.List[this.query.index].wid } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.WorksInfo.works = response.data.data;
            if (_this.WorksInfo.works.state != null) {
              _this.Score = _this.WorksInfo.works.state * 1;
            }
            let type = _this.$WorksTypeCode.find(x => x.code == _this.WorksInfo.works.worksType);
            _this.WorksInfo.works.worksType = type == null ? "" : type.value;
            _this.WorksInfo.works_file = [];
            if (_this.WorksInfo.works.file1) {
              _this.WorksInfo.works_file.push(_this.WorksInfo.works.file1);
            }
            if (_this.WorksInfo.works.file2) {
              _this.WorksInfo.works_file.push(_this.WorksInfo.works.file2);
            }
            if (_this.WorksInfo.works.file3) {
              _this.WorksInfo.works_file.push(_this.WorksInfo.works.file3);
            }
            if (_this.WorksInfo.works.file4) {
              _this.WorksInfo.works_file.push(_this.WorksInfo.works.file4);
            }
            if (_this.WorksInfo.works.file5) {
              _this.WorksInfo.works_file.push(_this.WorksInfo.works.file5);
            }
            for (let i = 0; i < _this.WorksInfo.works_file.length; i++) {
              if (_this.isImage(_this.WorksInfo.works_file[i])) {
                _this.PreviewSrcList.push(_this.$ImageGetServer + _this.WorksInfo.works_file[i]);
              }
            }
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
        .post("/api/gameWorks3/appraisal_round1", qs.stringify(data))
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
