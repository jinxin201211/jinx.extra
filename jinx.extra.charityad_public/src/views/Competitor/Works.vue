<template>
  <div class="jinx-page">
    <el-breadcrumb separator="/" style="margin: 30px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的作品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="List" stripe style="width: 100%; margin: 30px auto;" @row-dblclick="handleRowDbclick">
      <el-table-column type="index" width="50"> </el-table-column>
      <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
      <el-table-column prop="wno" label="作品编号"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="gameType" label="参加对象"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="tUname" label="指导老师"> </el-table-column>
      <el-table-column prop="submitState" label="提交状态"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleSubmit(scope.row)" type="text" size="small" v-if="scope.row.submitState == '未提交'">提交</el-button>
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleModify(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
      List: []
    };
  },
  mounted: function() {
    let that = this;
    this.List = [];
    this.axios
      .post("/api/gameWorks2/getWorksList", qs.stringify({ page: 1, limit: 999 }))
      .then(function(response) {
        console.log(response);
        if (response && response.data.code == "0") {
          that.List = response.data.data;
          that.List.forEach(p => {
            p.worksType = that.$WorksTypeCode.find(x => x.code == p.worksType).value;
            p.worksSeries = that.$WorksSeriesCode.find(x => x.code == p.worksSeries).value;
            p.gameType = that.$WorksGroupCode.find(x => x.code == p.gameType).value;
            p.submitState = p.submitState == null || p.submitState == "" ? "未提交" : "已提交";
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
  inject: ["reload"],
  methods: {
    handleView: function(data) {
      this.$router.push({
        path: "/competitor/work",
        query: {
          wid: data.wid
        }
      });
    },
    handleRowDbclick: function(row, column, event) {
      this.$router.push({
        path: "/competitor/work",
        query: {
          wid: row.wid
        }
      });
    },
    handleModify: function(data) {
      this.$router.push({
        path: "/competitor/modify",
        query: {
          wid: data.wid
        }
      });
    },
    handleDelete: function(data) {
      this.$confirm("确认删除？")
        .then(_ => {
          let that = this;
          this.axios
            .post("/api/gameWorks2/delete", qs.stringify({ wid: data.wid }))
            .then(function(response) {
              if (response && response.data.code == "0") {
                that.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                that.reload();
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
              that.$message({
                showClose: true,
                message: "删除失败",
                type: "warning"
              });
            });
        })
        .catch(_ => {});
    },
    handleSubmit: function(data) {
      let that = this;
      this.axios
        .post("/api/gameWorks2/submit", qs.stringify({ wid: data.wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            that.reload();
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "提交失败",
            type: "warning"
          });
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
