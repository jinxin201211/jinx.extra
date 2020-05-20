<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
    <el-button @click="handleScore">开始打分</el-button>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
      <el-table-column fixed="right" label="操作" width="180" v-if="false">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
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
        role: "judge",
        page: 1,
        limit: 10
      },
      total: 0,
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
      MaterialSurceCode: [
        { code: "1", value: "我保重此作品是我的原创" },
        { code: "2", value: "我使用了素材" }
      ]
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
        .post("/api/gameWorks2/getNoAppraisalList")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.List.forEach(p => {
              console.log(p);
              console.log(that.WorksSeriesCode.find(x => x.code == p.worksSeries));
              console.log(that.WorksTypeCode.find(x => x.code == p.worksType));
              console.log(that.MaterialSurceCode.find(x => x.code == p.materialSurce));
              let series = that.WorksSeriesCode.find(x => x.code == p.worksSeries);
              p.worksSeries = series == null ? "" : series.value;
              let type = that.WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              let source = that.MaterialSurceCode.find(x => x.code == p.materialSurce);
              p.materialSurce = source == null ? "" : source.value;
            });
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
    },
    handleScore: function() {
      this.$router.push("/worksappraisal");
    },
    handleView: function(data) {
      this.$router.push({
        path: "/viewwork",
        query: {
          wid: data.wid
        }
      });
    }
  }
};
</script>
