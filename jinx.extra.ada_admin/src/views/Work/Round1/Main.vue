<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分(第一轮)</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <!--<el-input v-model="query.author1" placeholder="请输入作者姓名" size="" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-input v-model="query.orgName" placeholder="请输入所属单位" size="" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-input v-model="query.worksName" placeholder="请输入作品名称" size="" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>-->
      <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
      <el-button @click="handleBeginScore" type="primary">开始评审</el-button>
    </div>
    <div style="line-height: 40px; color: #787878;">
      <span style="margin: 0 20px;">总数：<span v-text="statistics.total_num"></span></span>
      <span style="margin: 0 20px;">已评审数：<span v-text="statistics.appraisal_num"></span></span>
      <span style="margin: 0 20px;">通过数：<span v-text="statistics.pass_num"></span></span>
    </div>

    <el-table :data="List" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="wno" label="作品编号" width="180"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
      <el-table-column prop="worksSeriesName" label="命题名称"> </el-table-column>
      <el-table-column prop="state" label="评审结果" width="120"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleWorksScore(scope)" type="text" size="small" v-if="scope.row.state === '-'">评审</el-button>
          <el-button @click="handleWorksScore(scope)" type="text" size="small" v-else>已评审</el-button>
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
        limit: 10,
        gameType: "",
        author1: "",
        orgName: "",
        worksName: ""
      },
      total: 0,
      loading: false,
      statistics: {
        total_num: 0,
        appraisal_num: 0,
        pass_num: 0
      }
    };
  },
  mounted() {
    this.getList();
    this.getProgress();
  },
  methods: {
    handleRefreshList: function() {
      this.query.page = 1;
      this.getList();
      this.getProgress();
    },
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameWorks3/getNoAppraisalList_Round1", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.List.forEach(p => {
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;

              p.state = p.state == null || p.state * 1 === 0 ? "-" : p.state * 1 === 1 ? "通过" : "不通过";
              let authors = [];
              if (p.author1 != null && p.author1 != "") {
                authors.push(p.author1);
              }
              if (p.author2 != null && p.author2 != "") {
                authors.push(p.author2);
              }
              if (p.author3 != null && p.author3 != "") {
                authors.push(p.author3);
              }
              if (p.author4 != null && p.author4 != "") {
                authors.push(p.author4);
              }
              if (p.author5 != null && p.author5 != "") {
                authors.push(p.author5);
              }
              p.author1 = authors.join("，");
            });
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
            message: "查询列表失败",
            type: "warning"
          });
        });
    },
    getProgress() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameWorks3/AppraisalProgress_Round1")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.statistics.total_num = response.data.data.total_num;
            that.statistics.appraisal_num = response.data.data.appraisal_num;
            that.statistics.pass_num = response.data.data.pass_num;
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
          that.$message({
            showClose: true,
            message: "查询进度失败",
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
    handleBeginScore: function() {
      this.score(0);
    },
    handleWorksScore: function(scope) {
      this.score(scope.$index);
    },
    handleRowDbclick: function(row, column, event) {
      let index = this.List.indexOf(row);
      if (index != -1) {
        this.score(index);
      }
    },
    score: function(index) {
      this.$router.push({
        path: "/score/round1/score",
        query: {
          limit: this.query.limit,
          page: this.query.page,
          gameType: this.query.gameType,
          author1: this.query.author1,
          orgName: this.query.orgName,
          worksName: this.query.worksName,
          index: index
        }
      });
    }
  }
};
</script>
