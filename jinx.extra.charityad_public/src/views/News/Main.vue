<template>
  <jinx-layout>
    <div class="jinx-panel">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新闻正文</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="title" style="" v-text="title"></div>
      <div class="subtitle" v-show="subTitle != null && subTitle != ''" style="" v-text="subTitle"></div>
      <div class="time" style=""><span v-text="time"></span></div>
      <div class="divider"></div>
      <div id="news"></div>
      <div class="divider"></div>
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
      title: "",
      subTitle: "",
      time: ""
    };
  },
  mounted: function() {
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
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 0 auto;
  box-sizing: border-box;

  .title {
    margin-top: 30px;
    padding: 0 20px;
    text-align: center;
    font-size: 33px;
    color: #404040;
  }

  .subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    color: #404040;
  }

  .time {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    color: #404040;
  }

  .divider {
    background-image: url("../../assets/images/news/divider.jpg");
    margin: 30px auto;
    width: 100%;
    height: 8px;
  }
}
</style>
