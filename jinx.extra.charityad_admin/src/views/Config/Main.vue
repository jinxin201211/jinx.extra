<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
    <el-button @click="handleStartJudge" :loading="loading_judge" type="primary">启动评审</el-button>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="sysKey" label="键"> </el-table-column>
      <el-table-column prop="sysValue" label="值"> </el-table-column>
      <el-table-column prop="remark" label="说明"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
      List: [],
      query: {
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false,
      loading_judge: false
    };
  },
  mounted() {
    this.getList();
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
        .post("/api/sysConfig/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.total = response.data.count;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
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
    },
    handleEdit: function(data) {
      this.$router.push({
        path: "/editconfig",
        query: {
          key: data.sysKey
        }
      });
    },
    handleStartJudge() {
      this.loading_judge = true;
      const _this = this;
      this.axios
        .get("/api//gameProcess/GenerateAppraisalInfoForRound1")
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.$message({
              showClose: true,
              message: "已启动",
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.loading_judge = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading_judge = false;
          _this.$message({
            showClose: true,
            message: "失败",
            type: "warning"
          });
        });
    }
  }
};
</script>
