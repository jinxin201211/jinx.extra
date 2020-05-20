<template>
  <div style="padding: 20px;">
    <el-page-header @back="handleBack" content="查看新闻" style="margin-bottom: 20px;"> </el-page-header>
    <div style="font-size: 24px; text-align: center; color: #424242;" v-text="title"></div>
    <div v-show="subTitle != null && subTitle != ''" style="font-size: 16px; text-align: center; color: #424242;" v-text="subTitle"></div>
    <div style="font-size: 14px; text-align: center; color: #666666; padding: 5px 0 20px">时间：<span v-text="time"></span></div>
    <div id="news"></div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      title: "",
      subTitle: "",
      time: ""
    };
  },
  mounted() {
    let that = this;
    this.axios
      .get("/api/gameNews/getOne", { params: { id: this.$route.query.id } })
      .then(function(response) {
        if (response && response.data.code == "0") {
          that.title = response.data.data.title;
          that.subTitle = response.data.data.subTitle;
          that.time = response.data.data.ctime;
          document.getElementById("news").innerHTML = response.data.data.content;
        } else {
          that.$message({
            showClose: true,
            message: "获取新闻失败",
            type: "warning"
          });
        }
        that.loading = false;
      })
      .catch(function(err) {
        console.log(err);
        that.loading = false;
        that.$message({
          showClose: true,
          message: "获取新闻失败",
          type: "warning"
        });
      });
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>
