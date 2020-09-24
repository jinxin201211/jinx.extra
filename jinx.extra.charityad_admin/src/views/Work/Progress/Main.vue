<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>评审进度</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-input v-model="query.teacher" placeholder="请输入评审老师" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-select v-model="query.worktype" placeholder="请选择作品类别" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectWorkType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="query.round" placeholder="请选择轮次" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectRound" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading" type="primary">查 询</el-button>
    </div>

    <el-table :data="List" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="wno" label="作品编号" width="160"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="orgName" label="所属部门"> </el-table-column>
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
      ListSelectWorkType: [],
      ListSelectRound: [],
      List: [],
      query: {
        // role: "judge",
        page: 1,
        limit: 10,
        teacher: "",
        worktype: "",
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
      },
      {
        value: "3",
        label: "第三轮"
      }
    ];
  },
  mounted() {
    this.getList();
    // this.getProgress();
  },
  methods: {
    handleRefreshList: function() {
      this.query.page = 1;
      this.getList();
      // this.getProgress();
    },
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameProgress/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.List.forEach(p => {
              let game_type = that.$WorksGroupCode.find(x => x.code == p.gameType);
              p.gameType = game_type == null ? "" : game_type.value;
              let series = that.$WorksSeriesCode.find(x => x.code == p.worksSeries);
              p.worksSeries = series == null ? "" : series.value;
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              let source = that.$MaterialSurceCode.find(x => x.code == p.materialSurce);
              p.materialSurce = source == null ? "" : source.value;

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
        .post("/api/gameWorks2/AppraisalProgress_Round1")
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
