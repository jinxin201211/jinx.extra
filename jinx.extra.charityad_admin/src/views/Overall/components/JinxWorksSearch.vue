<template>
  <div style="padding: 20px;">
    <el-table :data="List" v-loading="loading" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="gameType" label="参赛组别"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="orgName" label="所属部门"> </el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="查看作品" :visible.sync="drawer" direction="rtl" size="50%" :append-to-body="true" :destroy-on-close="true">
      <jinx-works-viewer :wid="view_wid" ref="WorksViewer"></jinx-works-viewer>
    </el-drawer>
  </div>
</template>

<script>
import qs from "qs";
import JinxWorksViewer from "./JinxWorksViewer.vue";

export default {
  components: { JinxWorksViewer },
  props: ["date", "gameType", "worksType", "size"],
  data() {
    return {
      List: [],
      query: {
        page: 1,
        limit: 10,
        sDate: "",
        eDate: "",
        gameType: "",
        worksType: ""
      },
      total: 0,
      loading: false,
      drawer: false,
      view_wid: -1
    };
  },
  mounted() {
    this.query.sDate = this.date;
    this.query.eDate = this.date;
    this.query.gameType = this.gameType;
    this.query.worksType = this.worksType;
    this.query.limit = this.size;
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameWorks2/getData", qs.stringify(this.query))
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
              p.scoreTotal = p.scoreTotal == null || p.scoreTotal * 1 === 0 ? "-" : p.scoreTotal;
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
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleView: function(data) {
      this.view_wid = data.wid;
      this.drawer = true;
    },
    handleRowDbclick: function(row, column, event) {
      this.view_wid = row.wid;
      this.drawer = true;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-drawer {
  overflow-y: scroll;
}
</style>
