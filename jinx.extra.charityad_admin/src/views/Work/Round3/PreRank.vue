<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>获奖查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-tab-pane :label="gitem" :name="gindex + ''" v-for="(gitem, gindex) in GroupList" :key="'group' + gindex">
        <el-table ref="prizeTable" :data="Data.group[gindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick" @select="handleSelectRowChange">
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" width="80"> </el-table-column>
          <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
          <el-table-column prop="worksName" label="作品名称"> </el-table-column>
          <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
          <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
          <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
          <!--<el-table-column prop="scoreTotal" label="得分" width="120"> </el-table-column>-->
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-drawer title="查看作品" :visible.sync="drawer" direction="rtl" size="50%" :destroy-on-close="true">
      <jinx-works-viewer :wid="view_wid" ref="WorksViewer"></jinx-works-viewer>
    </el-drawer>
  </div>
</template>

<script>
import qs from "qs";
import JinxWorksViewer from "./components/JinxWorksViewer.vue";

export default {
  components: { JinxWorksViewer },
  data() {
    return {
      GroupList: ["高校类", "专业类", "公众类", "青少年类", "战疫类"],
      tab_active: "0",
      Data: {
        group: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }, { list: [] }]
      },
      List: [],
      // total: 0,
      loading: false,
      drawer: false,
      view_wid: -1,
      worksType: ""
    };
  },
  mounted() {
    let user = this.$store.state.User;
    if (user.worksType) {
      this.worksType = user.worksType;
    }
    this.getList();
  },
  methods: {
    handleRefreshList: function() {
      this.getList();
    },
    getList() {
      this.loading = true;
      let _this = this;
      this.Data = {
        group: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }, { list: [] }]
      };
      this.axios
        .post("/api/gameWorks2/getRankByMap", qs.stringify({ worksType: this.worksType }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data;
            // _this.List = response.data.data.list;
            data.forEach(p => {
              let game_type = _this.$WorksGroupCode.find(x => x.code == p.gameType);
              p.gameType = game_type == null ? "" : game_type.value;
              let type = _this.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              let source = _this.$MaterialSurceCode.find(x => x.code == p.materialSurce);
              p.materialSurce = source == null ? "" : source.value;
            });

            let game_type0 = _this.getGameTypeByCode("0");
            _this.Data.group[0].list = data.filter(p => p.gameType === game_type0);

            let game_type1 = _this.getGameTypeByCode("1");
            _this.Data.group[1].list = data.filter(p => p.gameType === game_type1);

            let game_type2 = _this.getGameTypeByCode("2");
            _this.Data.group[2].list = data.filter(p => p.gameType === game_type2);

            let game_type3 = _this.getGameTypeByCode("3");
            _this.Data.group[3].list = data.filter(p => p.gameType === game_type3);

            let game_type4 = _this.getGameTypeByCode("4");
            _this.Data.group[4].list = data.filter(p => p.gameType === game_type4);

            _this.$nextTick(() => {
              let markRows = _this.Data.group[0].list.filter(p => p.mark === "1");
              console.log(markRows);
              _this.toggleSelection(markRows);
            });
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    getGameTypeByCode(code) {
      let game_type = this.$WorksGroupCode.find(x => x.code == code);
      return game_type == null ? code : game_type.value;
    },
    handleView: function(data) {
      this.view_wid = data.wid;
      this.drawer = true;
    },
    handleRowDbclick: function(row, column, event) {
      this.view_wid = row.wid;
      this.drawer = true;
    },
    toggleSelection(rows) {
      const _this = this;
      if (rows) {
        rows.forEach(row => {
          _this.$refs.prizeTable[0].toggleRowSelection(row);
        });
      } else {
        _this.$refs.prizeTable[0].clearSelection();
      }
    },
    handleSelectRowChange(selection, row) {
      let mark = "";
      if (selection.includes(row)) {
        console.log(true);
        mark = "1";
      } else {
        console.log(false);
        mark = "0";
      }
      console.log(selection, row);

      let data = {
        wid: row.wid,
        mark: mark
      };
      const _this = this;
      this.axios
        .post("/api/gameWorksRank/mark", data)
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data;
            _this.$message({
              showClose: true,
              message: mark === "1" ? "标记成功" : "取消标记成功",
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: mark === "1" ? "标记失败" : "取消标记失败",
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: mark === "1" ? "标记失败" : "取消标记失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style>
:focus {
  outline: 0;
}
</style>

<style lang="less" scoped>
/deep/ .el-card {
  margin-top: 20px;
}

/deep/ .el-drawer {
  overflow-y: scroll;
}

/deep/ .el-table__header .el-checkbox {
  opacity: 0;
  display: none;
}
</style>
