<template>
  <div class="jinx-page">
    <el-breadcrumb separator="/" style="margin: 30px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的作品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="List" stripe style="width: 100%; margin: 30px auto;">
      <el-table-column type="index" width="50"> </el-table-column>
      <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
      <el-table-column prop="wid" label="作品编号"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="tUname" label="指导老师"> </el-table-column>
      <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      loading: false,
      WorksSeriesCode: [
        { code: "A", value: "中国梦系列" },
        { code: "B", value: "营商环境系列" },
        { code: "C", value: "生态保护系列" },
        { code: "D", value: "传统文化系列" },
        { code: "E", value: "社会热点系列" },
        { code: "F", value: "其他主题" }
      ],
      WorksTypeCode: [
        { code: "1", value: "平面类" },
        { code: "2", value: "文案类" },
        { code: "3", value: "广播类" },
        { code: "4", value: "视频类" },
        { code: "5", value: "动画类" },
        { code: "6", value: "互动类" }
      ],
      List: []
    };
  },
  mounted: function() {
    let that = this;
    this.List = [];
    this.axios
      .post("/api/gameWorks2/getWorksList")
      .then(function(response) {
        console.log(response);
        if (response && response.data.code == "0") {
          that.List = response.data.data;
          that.List.forEach(p => {
            p.worksType = that.WorksTypeCode.find(x => x.code == p.worksType).value;
            p.worksSeries = that.WorksSeriesCode.find(x => x.code == p.worksSeries).value;
            let authors = [];
            for (let i = 1; i <= 5; i++) {
              if (p["author" + i] !== "") {
                authors.push(p["author" + i]);
              }
            }
            p.author1 = authors.join("，");
          });
        } else {
          that.$message({
            showClose: true,
            message: "获取作品列表失败",
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
          message: "获取作品列表失败",
          type: "warning"
        });
      });
  },
  methods: {
    handleView: function(data) {
      this.$router.push({
        path: "/competitor/work",
        query: {
          wid: data.wid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-page {
  width: @typical-width;
  margin: 0 auto;
}
</style>
