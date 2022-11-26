<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分(第三轮)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-tab-pane :label="gitem" :name="gindex + ''" v-for="(gitem, gindex) in GroupList" :key="'group' + gindex">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
        <el-button @click="handleSubmit" :loading="submit_status" type="primary" v-if="User.role === 'leader'">确认修改</el-button>

        <el-card shadow="never" v-for="(pitem, pindex) in PrizeList" :key="'prize' + pindex">
          <div slot="header">
            <div style="display: flex; justify-content: space-between;">
              <span v-text="pitem"></span>
              <el-button size="mini" @click="handleShowModify(gindex, pindex)" :loading="loading">修改</el-button>
            </div>
          </div>
          <el-table :data="ResultData.group[gindex].prize[pindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
            <el-table-column prop="scoreTotal" label="累计积分" width="120"> </el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-drawer :title="ModifyConfig.title" :visible.sync="drawerModify" direction="rtl" size="75%" :destroy-on-close="true" @opened="handleModifyOpened">
      <div style="padding: 0 30px;">
        <el-button @click="handleModify" type="primary">确认修改</el-button>
        <el-table :data="ModifyList" ref="modifyTable" stripe style="width: 100%" @row-dblclick="handleRowDbclick" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
          <el-table-column prop="worksName" label="作品名称"> </el-table-column>
          <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
          <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
          <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
          <el-table-column prop="scoreTotal" label="累计积分" width="120"> </el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>

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
      PrizeList: ["一等奖", "二等奖", "三等奖", "优秀奖"],
      tab_active: "0",
      ResultData: {
        group: [
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          }
        ]
      },
      CandidateList: [],
      ModifyList: [],
      SelectedList: [],
      ModifyConfig: {
        title: "",
        pindex: -1,
        gindex: -1
      },
      List: [],
      User: this.$store.state.User,
      // total: 0,
      loading: false,
      drawer: false,
      drawerModify: false,
      view_wid: -1,
      submit_status: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleRefreshList: function() {
      this.getList();
    },
    getList() {
      this.loading = true;
      let _this = this;
      this.ResultData = {
        group: [
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          }
        ]
      };
      this.CandidateList = { group: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }, { list: [] }] };
      this.axios
        .post("/api/gameWorks2/getNoAppraisalList_Round3")
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
            _this.CandidateList.group[0].list = data.filter(p => p.gameType === game_type0);
            _this.ResultData.group[0].prize[0].list = data.filter(p => p.gameType === game_type0 && p.prize === 1);
            _this.ResultData.group[0].prize[1].list = data.filter(p => p.gameType === game_type0 && p.prize === 2);
            _this.ResultData.group[0].prize[2].list = data.filter(p => p.gameType === game_type0 && p.prize === 3);
            _this.ResultData.group[0].prize[3].list = data.filter(p => p.gameType === game_type0 && p.prize === 4);

            let game_type1 = _this.getGameTypeByCode("1");
            _this.CandidateList.group[1].list = data.filter(p => p.gameType === game_type1);
            _this.ResultData.group[1].prize[0].list = data.filter(p => p.gameType === game_type1 && p.prize === 1);
            _this.ResultData.group[1].prize[1].list = data.filter(p => p.gameType === game_type1 && p.prize === 2);
            _this.ResultData.group[1].prize[2].list = data.filter(p => p.gameType === game_type1 && p.prize === 3);
            _this.ResultData.group[1].prize[3].list = data.filter(p => p.gameType === game_type1 && p.prize === 4);

            let game_type2 = _this.getGameTypeByCode("2");
            _this.CandidateList.group[2].list = data.filter(p => p.gameType === game_type2);
            _this.ResultData.group[2].prize[0].list = data.filter(p => p.gameType === game_type2 && p.prize === 1);
            _this.ResultData.group[2].prize[1].list = data.filter(p => p.gameType === game_type2 && p.prize === 2);
            _this.ResultData.group[2].prize[2].list = data.filter(p => p.gameType === game_type2 && p.prize === 3);
            _this.ResultData.group[2].prize[3].list = data.filter(p => p.gameType === game_type2 && p.prize === 4);

            let game_type3 = _this.getGameTypeByCode("3");
            _this.CandidateList.group[3].list = data.filter(p => p.gameType === game_type3);
            _this.ResultData.group[3].prize[0].list = data.filter(p => p.gameType === game_type3 && p.prize === 1);
            _this.ResultData.group[3].prize[1].list = data.filter(p => p.gameType === game_type3 && p.prize === 2);
            _this.ResultData.group[3].prize[2].list = data.filter(p => p.gameType === game_type3 && p.prize === 3);
            _this.ResultData.group[3].prize[3].list = data.filter(p => p.gameType === game_type3 && p.prize === 4);

            let game_type4 = _this.getGameTypeByCode("4");
            _this.CandidateList.group[4].list = data.filter(p => p.gameType === game_type4);
            _this.ResultData.group[4].prize[0].list = data.filter(p => p.gameType === game_type4 && p.prize === 1);
            _this.ResultData.group[4].prize[1].list = data.filter(p => p.gameType === game_type4 && p.prize === 2);
            _this.ResultData.group[4].prize[2].list = data.filter(p => p.gameType === game_type4 && p.prize === 3);
            _this.ResultData.group[4].prize[3].list = data.filter(p => p.gameType === game_type4 && p.prize === 4);
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
    handleShowModify(gindex, pindex) {
      let otherPrizeList = this.ResultData.group[gindex].prize.filter((p, i) => i !== pindex).flatMap(p => p.list);
      this.ModifyList = this.CandidateList.group[gindex].list.filter(p => !otherPrizeList.includes(p));
      this.drawerModify = true;
      this.ModifyConfig.title = `设置奖项（${this.GroupList[gindex]}，${this.PrizeList[pindex]}）`;
      this.ModifyConfig.pindex = pindex;
      this.ModifyConfig.gindex = gindex;
    },
    handleModifyOpened() {
      let pindex = this.ModifyConfig.pindex;
      let gindex = this.ModifyConfig.gindex;
      let prizeList = this.ResultData.group[gindex].prize.filter((p, i) => i === pindex).flatMap(p => p.list);
      prizeList.forEach(p => {
        let rowindex = this.ModifyList.indexOf(p);
        this.$refs.modifyTable.toggleRowSelection(p);
      });
    },
    handleSelectionChange(val) {
      this.SelectedList = val;
    },
    handleModify() {
      this.ResultData.group[this.ModifyConfig.gindex].prize[this.ModifyConfig.pindex].list = this.SelectedList;
      this.drawerModify = false;
    },
    handleSubmit: function() {
      let _this = this;
      let update = [];
      for (let i = 0; i < this.ResultData.group.length; i++) {
        for (let j = 0; j < this.ResultData.group[i].prize.length; j++) {
          for (let k = 0; k < this.ResultData.group[i].prize[j].list.length; k++) {
            update.push({
              wid: this.ResultData.group[i].prize[j].list[k].wid,
              prize: j + 1
            });
          }
        }
      }
      _this.submit_status = true;
      this.axios
        .post("/api/gameWorks2/appraisal_round3", qs.stringify({ jsonString: JSON.stringify(update) }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            _this.getList();
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.submit_status = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.submit_status = false;
          _this.$message({
            showClose: true,
            message: "提交失败",
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
</style>
