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
            <span v-text="WorksInfo.works.wid"></span>
          </div>
          <div class="jinx-works-info">
            <span>作品名称</span>
            <span v-text="WorksInfo.works.worksName"></span>
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
          <!--<div>
          <el-link @click="handleDownload($ImageGetServer + item.fileName)">下载文件</el-link>
        </div>-->
        </el-card>
      </div>
    </div>

    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff; box-sizing: border-box;">
      <div style="position: relative; text-align: center;" v-show="!WorksInfo.empty">
        <el-radio-group v-model="appraisal" :disabled="submit_status.disabled">
          <el-radio label="1">通过</el-radio>
          <el-radio label="2">不通过</el-radio>
        </el-radio-group>
        <el-button size="small" type="primary" @click="handleSubmit" :loading="submit_status.loading" :disabled="submit_status.disabled" style="margin: 15px;">确 定</el-button>
      </div>
      <el-divider></el-divider>
      <div style="text-align: center;">
        <!--<el-button size="small" type="primary" @click="handleSubmit">上一个</el-button>-->
        <el-button size="small" type="primary" @click="handleNextWorks" :loading="next_status.loading" :disabled="next_status.disabled">下一个</el-button>
        <el-button size="small" type="primary" @click="handleBack">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      Scored: false,
      WorksInfo: {
        works: {},
        works_file: {},
        works_author: {},
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
      appraisal: ""
    };
  },
  mounted() {
    this.getNextWork();
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    handleNextWorks: function() {
      this.getNextWork();
    },
    getNextWork: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.next_status.loading = true;
      that.submit_status.disabled = false;
      this.axios
        .post("/api/gameWorks2/getWorks", qs.stringify({ round: 1 }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;
            that.WorksInfo.empty = false;
            if (that.WorksInfo.works.state === 0) {
              that.Scored = false;
            } else {
              that.Scored = true;
            }

            that.WorksInfo.works.worksSeries = that.$WorksSeriesCode.find(p => p.code == that.WorksInfo.works.worksSeries).value;
            that.WorksInfo.works.worksType = that.$WorksTypeCode.find(p => p.code == that.WorksInfo.works.worksType).value;
            that.WorksInfo.works.materialSurce = that.$MaterialSurceCode.find(p => p.code == that.WorksInfo.works.materialSurce).value;
          } else {
            // that.Scored = true;
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
      if (this.appraisal == "") {
        this.$message({
          type: "warning",
          message: "请选择是否通过"
        });
        return;
      }

      this.submit();
    },
    submit: function() {
      let that = this;
      let data = {
        wid: this.WorksInfo.works.wid,
        state: this.appraisal
      };
      this.axios
        .post("/api/gameWorks2/appraisal_round1", qs.stringify(data))
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
              message: "提交失败",
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
    handleDownload: function(file) {
      window.location.href = file;
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
  }
}
</style>
