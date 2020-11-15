<template>
  <div id="page" class="jinx-page">
    <el-breadcrumb separator="/" style="margin: 30px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的作品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
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
          <span>作品主题</span>
          <span class="value" v-text="WorksInfo.works.worksSeries"></span>
        </div>
        <div class="jinx-works-info">
          <span>作品类别</span>
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
          <span class="title">联系电话</span>
          <span class="value" v-text="WorksInfo.works.tel"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">电子邮箱</span>
          <span class="value" v-text="WorksInfo.works.email"></span>
          <span class="title">QQ</span>
          <span class="value" v-text="WorksInfo.works.qq"></span>
        </div>
        <div class="jinx-works-info">
          <span class="title">所属单位</span>
          <span class="value" v-text="WorksInfo.works.orgName"></span>
          <span class="title">有效通讯地址</span>
          <span class="value" v-text="WorksInfo.works.addr"></span>
        </div>
      </div>
      <div v-if="WorksInfo.works.tuname !== null && WorksInfo.works.tuname !== ''">
        <div class="jinx-works-group">
          <span>指导老师信息</span>
          <div class="jinx-works-info">
            <span class="title">姓名</span>
            <span class="value" v-text="WorksInfo.works.tuname"></span>
            <span class="title">联系电话</span>
            <span class="value" v-text="WorksInfo.works.tTel"></span>
          </div>
          <div class="jinx-works-info">
            <span class="title">电子邮箱</span>
            <span class="value" v-text="WorksInfo.works.tEmail"></span>
            <span class="title">所属单位</span>
            <span class="value" v-text="WorksInfo.works.tOrgName"></span>
          </div>
        </div>
      </div>
      <div class="jinx-works-info">
        <span class="title" style="display: inline-block;">作品创意说明</span>
        <span class="value" style="display: inline-block;" v-text="WorksInfo.works.creativeOverview"></span>
      </div>
    </el-card>

    <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
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
        <a :href="$PdfViewerPath + $FileGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
      </div>
      <div v-else-if="isOffice(item.fileName)" style="text-align: center;">
        <a :href="$OfficeViewerPath + $ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
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
      // loading: false
    };
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
      let that = this;
      // this.next_status.loading = true;
      this.axios
        .post("/api/gameWorks2/getWorksByWid", qs.stringify({ wid: this.$route.query.wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = JSON.parse(JSON.stringify(response.data.data));
            that.WorksInfo.empty = false;
            if (that.WorksInfo.works.state === 0) {
              that.Scored = false;
            } else {
              that.Scored = true;
            }

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
    },
    handleDownload: function(file) {
      window.location.href = file;
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-page {
  width: @typical-width;
  margin: 0 auto;
}

.jinx-works-group {
  margin: 5px 0;
  padding: 10px 30px;
}

.jinx-works-info {
  margin: 5px 0;
  border-bottom: 1px dashed #e1e2e3;
  padding: 10px 30px;

  .title {
    width: 150px;
    font-weight: bold;
    // margin: 0 10px;
  }

  .value {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
