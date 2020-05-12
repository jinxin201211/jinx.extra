<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="uname" label="用户名"> </el-table-column>
      <el-table-column prop="ip" label="ip地址"> </el-table-column>
      <el-table-column prop="opType" label="操作类型"> </el-table-column>
      <el-table-column prop="url" label="接口"> </el-table-column>
      <el-table-column prop="ctime" label="时间"> </el-table-column>
      <!--<el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="0" hide-on-single-page> </el-pagination>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      List: [],
      query: {
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false
    };
  },
  mounted() {
    // this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    handleRefreshList: function() {
      this.getList();
    },
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/sysLog/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.total = response.data.count;
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
      this.getList();
    },
    handleCurrentChange: function(val) {
      this.query.page = val;
      this.getList();
    }
  }
};
</script>
