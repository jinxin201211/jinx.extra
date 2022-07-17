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

        <el-table :data="Data.group[gindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
          <el-table-column type="index" width="50"> </el-table-column>
          <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
          <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
          <el-table-column prop="worksName" label="作品名称"> </el-table-column>
          <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
          <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
          <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
          <el-table-column prop="scoreTotal" label="累计积分" width="120"> </el-table-column>
          <el-table-column label="设置奖项" width="150" v-if="User.role === 'leader'">
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
      GroupList: ["高校类", "专业类", "公众类", "青少年类", "战疫类"],
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
          },
          {
            list: []
          }
        ]
      },
      List: [],
      User: this.$store.state.User,
      // total: 0,
      loading: false,
      drawer: false,
      view_wid: -1,
      submit_status: false
    };
  },
  mounted() {
    // console.log(this.User);
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
          },
          {
            list: []
          }
        ]
      };
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
            _this.Data.group[0].list = data
              .filter(p => p.gameType === game_type0)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type1 = _this.getGameTypeByCode("1");
            _this.Data.group[1].list = data
              .filter(p => p.gameType === game_type1)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type2 = _this.getGameTypeByCode("2");
            _this.Data.group[2].list = data
              .filter(p => p.gameType === game_type2)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type3 = _this.getGameTypeByCode("3");
            _this.Data.group[3].list = data
              .filter(p => p.gameType === game_type3)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
              });

            let game_type4 = _this.getGameTypeByCode("4");
            _this.Data.group[4].list = data
              .filter(p => p.gameType === game_type4)
              .sort((a, b) => {
                return a.prize == null && b.prize == null ? 1 : a.prize == null ? 1 : b.prize == null ? -1 : a.prize - b.prize;
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
    handleSubmit: function() {
      let _this = this;
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
