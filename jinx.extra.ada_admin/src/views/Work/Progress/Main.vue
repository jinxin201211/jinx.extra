<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>评审进度</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-input v-model="query.uname" placeholder="请输入评审老师" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-select v-model="query.worksType" placeholder="请选择作品类别" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectWorkType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="query.round" placeholder="请选择轮次" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectRound" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading" type="primary">查 询</el-button>
    </div>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="uname" label="评审老师" width="160"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="round" label="轮次" width="120"> </el-table-column>
      <el-table-column prop="gameTotalNum" label="总作品数"> </el-table-column>
      <el-table-column prop="appraisalTotalNum" label="需要评审作品数" width="120"> </el-table-column>
      <el-table-column prop="appraisalFinishNum" label="已评审作品数"> </el-table-column>
      <el-table-column prop="utime" label="更新时间"> </el-table-column>
      <el-table-column prop="ctime" label="创建时间"> </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page> </el-pagination>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      ListSelectWorkType: [],
      ListSelectRound: [],
      List: [],
      query: {
        // role: "judge",
        page: 1,
        limit: 10,
        uname: "",
        worksType: "",
        round: ""
      },
      total: 0,
      loading: false
    };
  },
  created() {
    this.ListSelectWorkType.push({
      value: "",
      label: "请选择作品类别"
    });
    for (let i = 0; i < this.$WorksTypeCode.length; i++) {
      this.ListSelectWorkType.push({
        value: this.$WorksTypeCode[i].code,
        label: this.$WorksTypeCode[i].value
      });
    }
    this.ListSelectRound = [
      {
        value: "",
        label: "请选择轮次"
      },
      {
        value: "1",
        label: "第一轮"
      },
      {
        value: "2",
        label: "第二轮"
      }
    ];
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleRefreshList: function() {
      this.query.page = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameProcess/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.total = response.data.count;
            that.List = response.data.data;
            that.List.forEach(p => {
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              p.round = ["第一轮", "第二轮"][p.round - 1];
            });
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
            message: "查询列表失败",
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
