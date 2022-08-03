<template>
  <jinx-layout>
    <div class="jinx-panel">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件下载</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="jinx-downloads">
        <div class="download" @click="handleDownload(index)" v-for="(item, index) in FileDownloads" :key="'download' + index"><span v-text="item"></span><i class="icon el-icon-arrow-right"></i></div>
      </div>
    </div>
  </jinx-layout>
</template>

<script>
import JinxLayout from "@/components/JinxLayout.vue";
import qs from "qs";

export default {
  components: { JinxLayout },
  data: function() {
    return {
      // FileDownloads: ["河北省公益广告大赛报名流程.pdf", "河北省公益广告大赛评审办法.pdf", "河北省公益广告大赛章程.pdf", "河北省公益广告大赛征集启事.pdf", "河北省公益广告大赛作品格式要求.pdf", "公益广告大赛公开文件.zip", "2020年河北省公益广告大赛组合标识.zip"]
      FileDownloads: ["公益广告大赛公开文件.zip", "2022年河北省公益广告大赛组合标识.zip", "奖金发放确认函.docx", "关于举办2022河北省公益广告大赛的通知"],
      FileNameDownloads: ["PublicFile.zip", "log.zip", "bonus.docx", "20220801173332.pdf"]
    };
  },
  mounted: function() {},
  methods: {
    handleDownload(index) {
      window.open(this.$FileGetServer + "resources/" + this.FileNameDownloads[index]);
      // window.location.href = this.$FileGetServer + this.FileNameDownloads[index];
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 0 auto;
  box-sizing: border-box;
}

.jinx-downloads {
  line-height: 50px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  .download {
    width: 100%;
    border-bottom: 1px solid #ebeef5;
    position: relative;
    cursor: pointer;

    .icon {
      top: 19px;
      right: 15px;
      position: absolute;
    }
  }

  .download:first-child {
    border-top: 1px solid #ebeef5;
  }
}
</style>
