<template>
  <jinx-layout>
    <div class="jinx-panel">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新闻宣传</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="jinx-downloads">
        <div class="download" @click="handleOpen(item)" v-for="(item, index) in ListPropaganda" :key="'propaganda' + index">
          <span class="title" v-text="`${item.media} - ${item.platform} - ${item.content}`"></span>
          <span class="time" v-text="item.publishTime"></span>
          <i class="icon el-icon-arrow-right"></i>
        </div>
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
      ListPropaganda: [
        {
          media: "河北新闻广播",
          platform: "公众号",
          content: "开赛信息",
          address: "https://mp.weixin.qq.com/s/i-KrDycW30ysM12mKOEs-w",
          publishTime: "2022-08-05 18:55"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      this.axios
        .post("/api/gameNewsPropagate/getList")
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.ListPropaganda = response.data.data;
          } else {
            _this.$message({
              showClose: true,
              message: "获取新闻宣传失败",
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: "获取新闻宣传失败",
            type: "warning"
          });
        });
    },
    handleOpen(data) {
      if (data.url) {
        window.open(data.url);
      }
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-right: 45px;

    .title {
      font-weight: bold;
      font-size: 16px;
    }

    .time {
      color: #abaabb;
    }

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
