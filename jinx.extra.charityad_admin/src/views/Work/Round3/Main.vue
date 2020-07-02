<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分(第三轮)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-tab-pane :label="gitem" :name="gindex + ''" v-for="(gitem, gindex) in GroupList" :key="'group' + gindex">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
        <el-button @click="handleSubmit" :loading="submit_status" type="primary">确认修改</el-button>

        <el-table :data="Data.group[gindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
          <el-table-column type="index" width="50"> </el-table-column>
          <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
          <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
          <el-table-column prop="worksName" label="作品名称"> </el-table-column>
          <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
          <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
          <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
          <el-table-column prop="scoreTotal" label="累计积分" width="120"> </el-table-column>
          <el-table-column label="设置奖项" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.prize" placeholder="设置作品奖项" size="small">
                <el-option label="设置作品奖项" :value="null"></el-option>
                <el-option label="一等奖" :value="1"></el-option>
                <el-option label="二等奖" :value="2"></el-option>
                <el-option label="三等奖" :value="3"></el-option>
                <el-option label="优秀奖" :value="4"></el-option>
              </el-select>
            </template>
          </el-table-column>
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
      GroupList: ["高校类", "专业类", "公众类", "战疫类"],
      tab_active: "0",
      Data: {
        group: [
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          }
        ]
      },
      List: [],
      // total: 0,
      loading: false,
      drawer: false,
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
      let that = this;
      this.Data = {
        group: [
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
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
            data.forEach(p => {
              let game_type = that.$WorksGroupCode.find(x => x.code == p.gameType);
              p.gameType = game_type == null ? "" : game_type.value;
              let series = that.$WorksSeriesCode.find(x => x.code == p.worksSeries);
              p.worksSeries = series == null ? "" : series.value;
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              let source = that.$MaterialSurceCode.find(x => x.code == p.materialSurce);
              p.materialSurce = source == null ? "" : source.value;
            });

            let game_type0 = that.getGameTypeByCode("0");
            that.Data.group[0].list = data
              .filter(p => p.gameType === game_type0)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type1 = that.getGameTypeByCode("1");
            that.Data.group[1].list = data
              .filter(p => p.gameType === game_type1)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type2 = that.getGameTypeByCode("2");
            that.Data.group[2].list = data
              .filter(p => p.gameType === game_type2)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type4 = that.getGameTypeByCode("4");
            that.Data.group[3].list = data
              .filter(p => p.gameType === game_type4)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
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
    handleSubmit: function() {
      let that = this;
      let update = [];
      for (let i = 0; i < this.Data.group.length; i++) {
        for (let k = 0; k < this.Data.group[i].list.length; k++) {
          if (this.Data.group[i].list[k].prize != null) {
            update.push({
              wid: this.Data.group[i].list[k].wid,
              prize: this.Data.group[i].list[k].prize
            });
          }
        }
      }
      that.submit_status = true;
      this.axios
        .post("/api/gameWorks2/appraisal_round3", qs.stringify({ jsonString: JSON.stringify(update) }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            that.getList();
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.submit_status = false;
        })
        .catch(function(err) {
          console.log(err);
          that.submit_status = false;
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
