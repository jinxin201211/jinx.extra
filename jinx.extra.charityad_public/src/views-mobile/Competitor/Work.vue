<template>
  <div id="page" style="padding-bottom: 15px;">
    <van-nav-bar title="我的作品" left-arrow @click-left="$router.go(-1)" />

    <div style="margin: 15px">
      <div>
        <span style="font-size: 24px; font-weight: bold;" v-text="WorksInfo.works.worksName"></span>
      </div>

      <div class="jinx-works-info">
        <span class="title">作品编号</span>
        <span class="value" v-text="WorksInfo.works.wno"></span>
      </div>
      <div class="jinx-works-info">
        <span class="title">作品名称</span>
        <span class="value" v-text="WorksInfo.works.worksName"></span>
      </div>
      <div v-if="game_type === '4'">
        <div class="jinx-works-info">
          <span class="title">参赛组别</span>
          <span class="value" v-text="WorksInfo.works.gameType"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">作品类别</span>
          <span class="value" v-text="WorksInfo.works.worksType == null ? '' : WorksInfo.works.worksType"></span>
        </div>
      </div>
      <div v-else>
        <div class="jinx-works-info">
          <span class="title">参赛组别</span>
          <span class="value" v-text="WorksInfo.works.gameType"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">作品主题</span>
          <span class="value" v-text="WorksSeries"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">作品类别</span>
          <span class="value" v-text="WorksInfo.works.worksType"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">作品素材来源</span>
          <span class="value" v-text="WorksInfo.works.materialSurce"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">作品创意说明</span>
          <span class="value" v-text="WorksInfo.works.creativeOverview"></span>
        </div>
      </div>
      <div class="jinx-works-info">
        <span class="title">作者姓名</span>
        <span class="value" v-text="WorksInfo.works.author1"></span>
        <span class="value" v-text="WorksInfo.works.author2"></span>
        <span class="value" v-text="WorksInfo.works.author3"></span>
        <span class="value" v-text="WorksInfo.works.author4"></span>
        <span class="value" v-text="WorksInfo.works.author5"></span>
      </div>
      <div class="jinx-works-group">
        <span>第一作者联系方式</span>
        <div class="jinx-works-info">
          <span class="title">身份证号</span>
          <span class="value" v-text="WorksInfo.works.idcardNo"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">联系电话</span>
          <span class="value" v-text="WorksInfo.works.tel"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">电子邮箱</span>
          <span class="value" v-text="WorksInfo.works.email"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">QQ</span>
          <span class="value" v-text="WorksInfo.works.qq"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">所属单位</span>
          <span class="value" v-text="WorksInfo.works.orgName"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">有效通讯地址</span>
          <span class="value" v-text="WorksInfo.works.addr"></span>
        </div>
      </div>
      <div v-if="WorksInfo.works.gameType === '高校类'">
        <div class="jinx-works-group">
          <span>指导老师信息</span>
          <div class="jinx-works-info">
            <span class="title">姓名</span>
            <span class="value" v-text="WorksInfo.works.tuname"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">联系电话</span>
            <span class="value" v-text="WorksInfo.works.tTel"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">电子邮箱</span>
            <span class="value" v-text="WorksInfo.works.tEmail"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">所属单位</span>
            <span class="value" v-text="WorksInfo.works.tOrgName"></span>
          </div>
        </div>
      </div>
      <div v-if="WorksInfo.works.gameType === '青少年类'">
        <div class="jinx-works-group">
          <span>监护人或指导老师信息</span>
          <div class="jinx-works-info">
            <span class="title">姓名</span>
            <span class="value" v-text="WorksInfo.works.tuname"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">联系电话</span>
            <span class="value" v-text="WorksInfo.works.tTel"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">所属单位</span>
            <span class="value" v-text="WorksInfo.works.tOrgName"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">指导用户类型</span>
            <span class="value" v-text="WorksInfo.works.guideType"></span>
          </div>
        </div>
      </div>
      <div class="jinx-works-info">
        <span class="title" style="display: inline-block;">作品创意说明</span>
        <span class="value" style="display: inline-block;" v-text="WorksInfo.works.creativeOverview"></span>
      </div>
    </div>

    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin: 15px 15px 0 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item.fileName"></span>
        <el-link v-if="isVideo(item.fileName) || isFlash(item.fileName)" :href="$FileGetServer + item.fileName" target="blank" type="primary" style="float: right;">下载</el-link>
      </div>
      <div v-if="isImage(item.fileName)" style="text-align: center;">
        <el-image :src="$FileGetServer + item.fileName" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$FileGetServer + item.fileName]">
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
        <audio :src="$FileGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
        <a :href="$PdfViewerPath + $PdfGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
      <div v-else-if="isOffice(item.fileName)" style="text-align: center;">
        <a :href="$OfficeViewerPath + $FileGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$FileGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";

export default {
  components: { JinxVideoPlayer },
  data() {
    return {
      Scored: false,
      WorksInfo: {
        works: {},
        works_file: [],
        empty: true
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
    this.getNextWork();
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    getNextWork: function() {
      let loading = this.$loading({ target: "#page" });
      let _this = this;
      this.axios
        .post("/api/gameWorks2/viewWorksByWid", qs.stringify({ wid: this.$route.query.wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.WorksInfo = JSON.parse(JSON.stringify(response.data.data));
            _this.WorksInfo.empty = false;
            if (_this.WorksInfo.works.state === 0) {
              _this.Scored = false;
            } else {
              _this.Scored = true;
            }

            _this.game_type = _this.WorksInfo.works.gameType;
            if (_this.WorksInfo.works.gameType === "4") {
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
            } else {
              if (_this.WorksInfo.works.gameType === "3") {
                _this.WorksInfo.works.guideType = _this.$GuideType.find(p => p.code == _this.WorksInfo.works.guideType).value;
              }
              _this.WorksInfo.works.gameType = _this.$WorksGroupCode.find(p => p.code == _this.WorksInfo.works.gameType).value;
              _this.WorksInfo.works.worksType = _this.$WorksTypeCode.find(p => p.code == _this.WorksInfo.works.worksType).value;
              _this.WorksInfo.works.materialSurce = _this.$MaterialSurceCode.find(p => p.code == _this.WorksInfo.works.materialSurce).value;
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
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    handleDownload: function(file) {
      window.location.href = file;
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-works-group {
  margin: 5px 0;
  padding: 10px 30px;
}

.jinx-works-info {
  margin: 5px 0;
  border-bottom: 1px dashed #e1e2e3;
  padding: 10px 30px;
  word-break: break-all;

  .title {
    width: 150px;
    font-weight: bold;
  }

  .value {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
