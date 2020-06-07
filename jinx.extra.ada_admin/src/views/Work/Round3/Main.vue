<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分(第三轮)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-tab-pane :label="gitem" :name="gindex + ''" v-for="(gitem, gindex) in GroupList" :key="'group' + gindex">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
        <span style="margin-left: 20px; color: #666666;" v-text="`一等奖${Data.group[gindex].prize[0].list.length}名， 二等奖${Data.group[gindex].prize[1].list.length}名， 三等奖${Data.group[gindex].prize[2].list.length}名， 优秀奖${Data.group[gindex].prize[3].list.length}名`"></span>

        <el-card shadow="never" v-for="(pitem, pindex) in PrizeList" :key="'prize' + pindex">
          <div slot="header">
            <span v-text="pitem"></span>
          </div>
          <el-table :data="Data.group[gindex].prize[pindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象" width="120"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
            <el-table-column prop="scoreTotal" label="得分" width="120"> </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-tooltip content="提升等级" placement="top" :open-delay="1000">
                  <el-button @click="handleMoveUp(gindex, pindex, scope.$index, scope.row)" type="text"><i class="el-icon-top"></i></el-button>
                </el-tooltip>
                <el-tooltip content="降低等级" placement="top" :open-delay="1000">
                  <el-button @click="handleMoveDown(gindex, pindex, scope.$index, scope.row)" type="text"><i class="el-icon-bottom"></i></el-button>
                </el-tooltip>
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
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
      GroupList: ["高校类", "专业类", "公众类"],
      PrizeList: ["一等奖", "二等奖", "三等奖", "优秀奖"],
      tab_active: "0",
      Data: {
        group: [
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
      List: [],
      // total: 0,
      loading: false,
      drawer: false,
      view_wid: -1
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
      let that = this;
      this.Data = {
        group: [
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
      this.axios
        .post("/api/gameWorks2/getNoAppraisalList_Round3")
        .then(function(response) {
          console.log(response);
          if (response && response.data.code == "0") {
            let data = response.data.data;
            // that.List = response.data.data.list;
            // that.List.forEach(p => {
            //   let game_type = that.$WorksGroupCode.find(x => x.code == p.gameType);
            //   p.gameType = game_type == null ? "" : game_type.value;
            //   let series = that.$WorksSeriesCode.find(x => x.code == p.worksSeries);
            //   p.worksSeries = series == null ? "" : series.value;
            //   let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
            //   p.worksType = type == null ? "" : type.value;
            //   let source = that.$MaterialSurceCode.find(x => x.code == p.materialSurce);
            //   p.materialSurce = source == null ? "" : source.value;
            // });
            // that.total = response.data.count;
            // let data = [
            //   {
            //     worksName: "高校组一等奖1",
            //     wid: 2972,
            //     gameType: "0",
            //     prize: 1
            //   },
            //   {
            //     worksName: "高校组二等奖1",
            //     wid: 2972,
            //     gameType: "0",
            //     prize: 2
            //   },
            //   {
            //     worksName: "高校组二等奖2",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 2
            //   },
            //   {
            //     worksName: "高校组三等奖1",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "高校组三等奖2",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "高校组三等奖3",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "高校组优秀奖1",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "高校组优秀奖2",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "高校组优秀奖3",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "高校组优秀奖4",
            //     gameType: "0",
            //     wid: 2972,
            //     prize: 4
            //   },

            //   {
            //     worksName: "专业组一等奖1",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 1
            //   },
            //   {
            //     worksName: "专业组二等奖1",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 2
            //   },
            //   {
            //     worksName: "专业组二等奖2",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 2
            //   },
            //   {
            //     worksName: "专业组三等奖1",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "专业组三等奖2",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "专业组三等奖3",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "专业组优秀奖1",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "专业组优秀奖2",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "专业组优秀奖3",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "专业组优秀奖4",
            //     gameType: "1",
            //     wid: 2972,
            //     prize: 4
            //   },

            //   {
            //     worksName: "公众组一等奖1",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 1
            //   },
            //   {
            //     worksName: "公众组二等奖1",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 2
            //   },
            //   {
            //     worksName: "公众组二等奖2",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 2
            //   },
            //   {
            //     worksName: "公众组三等奖1",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "公众组三等奖2",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "公众组三等奖3",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 3
            //   },
            //   {
            //     worksName: "公众组优秀奖1",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "公众组优秀奖2",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "公众组优秀奖3",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 4
            //   },
            //   {
            //     worksName: "公众组优秀奖4",
            //     gameType: "2",
            //     wid: 2972,
            //     prize: 4
            //   }
            // ];

            that.Data.group[0].prize[0].list = data.filter(p => p.gameType === "0" && p.prize === 1);
            that.Data.group[0].prize[1].list = data.filter(p => p.gameType === "0" && p.prize === 2);
            that.Data.group[0].prize[2].list = data.filter(p => p.gameType === "0" && p.prize === 3);
            that.Data.group[0].prize[3].list = data.filter(p => p.gameType === "0" && p.prize === 4);

            that.Data.group[1].prize[0].list = data.filter(p => p.gameType === "1" && p.prize === 1);
            that.Data.group[1].prize[1].list = data.filter(p => p.gameType === "1" && p.prize === 2);
            that.Data.group[1].prize[2].list = data.filter(p => p.gameType === "1" && p.prize === 3);
            that.Data.group[1].prize[3].list = data.filter(p => p.gameType === "1" && p.prize === 4);

            that.Data.group[2].prize[0].list = data.filter(p => p.gameType === "2" && p.prize === 1);
            that.Data.group[2].prize[1].list = data.filter(p => p.gameType === "2" && p.prize === 2);
            that.Data.group[2].prize[2].list = data.filter(p => p.gameType === "2" && p.prize === 3);
            that.Data.group[2].prize[3].list = data.filter(p => p.gameType === "2" && p.prize === 4);
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
    },
    handleMoveUp: function(group, prize, index, data) {
      if (prize === 0) {
        return;
      }

      let up = this.Data.group[group].prize[prize].list.splice(index, 1)[0];
      let down = this.Data.group[group].prize[prize - 1].list.splice(this.Data.group[group].prize[prize - 1].list.length - 1, 1)[0];
      this.Data.group[group].prize[prize].list = [down].concat(this.Data.group[group].prize[prize].list);
      this.Data.group[group].prize[prize - 1].list.push(up);
      this.submit();
    },
    handleMoveDown: function(group, prize, index, data) {
      if (prize === 3) {
        return;
      }

      let down = this.Data.group[group].prize[prize].list.splice(index, 1)[0];
      if (this.Data.group[group].prize[prize + 1].list.length > 0) {
        let up = this.Data.group[group].prize[prize + 1].list.splice(0, 1)[0];
        this.Data.group[group].prize[prize].list.push(up);
      }
      this.Data.group[group].prize[prize + 1].list = [down].concat(this.Data.group[group].prize[prize + 1].list);
      this.submit();
    },
    submit: function() {
      let that = this;
      let update = [];
      for (let i = 0; i < this.Data.group.length; i++) {
        for (let j = 0; j < this.Data.group[i].prize.length; j++) {
          for (let k = 0; k < this.Data.group[i].prize[j].list.length; k++) {
            update.push({
              wid: this.Data.group[i].prize[j].list[k].wid,
              prize: j + 1
            });
          }
        }
      }
      this.axios
        .post("/api/gameWorks2/appraisal_round3", qs.stringify({ jsonString: JSON.stringify(update) }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            that.Scored = true;
            that.submit_status.disabled = true;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.submit_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          that.submit_status.loading = false;
          that.$message({
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
