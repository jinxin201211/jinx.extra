<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布新闻</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
    <el-button @click="handleAdd">发布新闻</el-button>

    <el-table :data="NewsList" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="ctime" label="发布时间" width="180"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page> </el-pagination>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      NewsList: [],
      query: {
        type: "1",
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false
    };
  },
  mounted() {
    this.getNewsList();
  },
  activated() {
    this.getNewsList();
  },
  methods: {
    handleRefreshList: function() {
      this.getNewsList();
    },
    getNewsList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameNews/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.NewsList = response.data.data;
            that.total = response.data.count;
            // that.$message({
            //   showClose: true,
            //   message: "发布成功",
            //   type: "success"
            // });
          } else {
            that.$message({
              showClose: true,
              message: "查询失败",
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
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleSizeChange: function(val) {
      this.query.limit = val;
      this.getNewsList();
    },
    handleCurrentChange: function(val) {
      this.query.page = val;
      this.getNewsList();
    },
    handleAdd: function() {
      this.$router.push("addnews");
    },
    handleView: function(data) {
      this.$router.push({
        path: "/viewnews",
        query: {
          id: data.id
        }
      });
    },
    handleEdit: function(data) {
      this.$router.push({
        path: "/editnews",
        query: {
          id: data.id
        }
      });
    },
    handleDelete: function(data) {
      this.$confirm("此操作将删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteData(data);
        })
        .catch(e => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteData: function(data) {
      let that = this;
      this.axios
        .post("/api/gameNews/delete", qs.stringify({ id: data.id }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              type: "success",
              message: "删除成功!"
            });
            that.getNewsList();
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
    }
  }
};
</script>
