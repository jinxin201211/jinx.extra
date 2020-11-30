<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品合规检查</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-input v-model="query.wno" placeholder="请输入作品编号" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-input v-model="query.worksName" placeholder="请输入作品名称" style="width: 150px; margin-right: 10px;" @keyup.enter.native="handleRefreshList"></el-input>
      <el-select v-model="query.worksType" placeholder="请选择作品类别" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectWorkType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="query.standard" placeholder="请选择合规性" style="width: 150px; margin-right: 10px;" @change="handleRefreshList">
        <el-option v-for="item in ListSelectStandard" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading" type="primary">刷 新</el-button>
      <el-button @click="handleBeginScore" type="primary">开始检查</el-button>
    </div>
    <!--<div style="line-height: 40px; color: #787878;">
      <span style="margin: 0 20px;">作品总数：<span v-text="statistics.total_num"></span></span>
      <span style="margin: 0 20px;">需评审数：<span v-text="statistics.appraisal_total_num"></span></span>
      <span style="margin: 0 20px;">已评审数：<span v-text="statistics.appraisal_num"></span></span>
      <span style="margin: 0 20px;">通过数：<span v-text="statistics.pass_num"></span></span>
    </div>-->

    <el-table :data="List" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="wno" label="作品编号" width="160"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="orgName" label="所属部门"> </el-table-column>
      <el-table-column prop="standard" label="检查结果" width="120"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleWorksScore(scope)" type="text" size="small" v-if="scope.row.standard === '-'">检查</el-button>
          <el-button @click="handleWorksScore(scope)" type="text" size="small" v-else>已检查</el-button>
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
      // SelectGameType: [],
      ListSelectWorkType: [],
      ListSelectStandard: [
        { value: "0", label: "未检查" },
        { value: "1", label: "合规" },
        { value: "2", label: "不合规" }
      ],
      List: [],
      query: {
        // role: "judge",
        page: 1,
        limit: 10,
        worksType: "",
        wno: "",
        standard: "",
        worksName: ""
      },
      total: 0,
      loading: false
      // statistics: {
      //   total_num: 0,
      //   appraisal_total_num: 0,
      //   appraisal_num: 0,
      //   pass_num: 0
      // }
    };
  },
  mounted() {
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
    this.getList();
    // this.getProgress();
    // this.SelectGameType.push({
    //   value: "",
    //   label: "请选择参赛组别"
    // });
    // for (let i = 0; i < this.$WorksGroupCode.length; i++) {
    //   this.SelectGameType.push({
    //     value: this.$WorksGroupCode[i].code,
    //     label: this.$WorksGroupCode[i].value
    //   });
    // }
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
        .post("/api/gameWorks2/getCheckStandardlList", qs.stringify(this.query))
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

              p.standard = p.standard == 0 ? "未检查" : p.standard === 1 ? "合规" : p.standard === 2 ? "不合规" : "-";
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
            that.statistics.appraisal_total_num = response.data.data.appraisal_total_num;
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
        path: "/score/round0/check",
        query: {
          limit: this.query.limit,
          page: this.query.page,
          worksType: this.query.worksType,
          wno: this.query.wno,
          standard: this.query.standard,
          worksName: this.query.worksName,
          index: index
        }
      });
    }
  }
};
</script>
