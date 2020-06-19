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
      FileDownloads: ["2020.6.17公益广告大赛报名流程.docx", "20.6.17河北省公益广告大赛作品格式要求.docx", "20.6.17河北省广告大赛评审办法.pdf", "20.6.18河北省公益广告大赛征集启事（修改）.docx"]
    };
  },
  mounted: function() {},
  methods: {
    handleDownload(index) {
      window.open(this.$FileGetServer + this.FileDownloads[index]);
      // window.location.href = this.$FileGetServer + this.FileDownloads[index];
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 0 auto;
  // padding: 30px 150px;
  box-sizing: border-box;
  // -moz-box-shadow: 0px -6px 20px #e0e4e9;
  // -webkit-box-shadow: 0px -6px 20px #e0e4e9;
  // box-shadow: 0px -6px 20px #e0e4e9;
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
