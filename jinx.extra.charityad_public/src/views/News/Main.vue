<template>
  <jinx-layout>
    <div class="jinx-news">
      <div class="title" style="" v-text="title"></div>
      <div class="subtitle" v-show="subTitle != null && subTitle != ''" style="" v-text="subTitle"></div>
      <div class="time" style="">时间：<span v-text="time"></span></div>
      <div id="news"></div>
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
.jinx-news {
  width: @typical-width;
  margin: 0 auto;
  margin-top: 20px;

  .title {
    font-size: 24px;
    text-align: center;
    color: #424242;
  }

  .time {
    font-size: 14px;
    text-align: center;
    color: #666666;
    padding: 5px 0 20px;
  }
}
</style>
