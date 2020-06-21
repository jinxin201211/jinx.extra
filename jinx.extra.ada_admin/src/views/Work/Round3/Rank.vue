<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>获奖查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
      <span style="margin-left: 20px; color: #666666;" v-text="`一等奖${Data.group[0].prize[0].list.length}名， 二等奖${Data.group[0].prize[1].list.length}名， 三等奖${Data.group[0].prize[2].list.length}名， 优秀奖${Data.group[0].prize[3].list.length}名`"></span>

      <el-card shadow="never" v-for="(pitem, pindex) in PrizeList" :key="'prize' + pindex">
        <div slot="header">
          <span v-text="pitem"></span>
        </div>
        <el-table :data="Data.group[0].prize[pindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick">
          <el-table-column type="index" width="50"> </el-table-column>
          <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
          <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
          <el-table-column prop="worksName" label="作品名称"> </el-table-column>
          <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
          <el-table-column prop="worksSeriesName" label="作品主题"> </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
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
      PrizeList: ["一等奖", "二等奖", "三等奖", "优秀奖"],
      tab_active: "0",
      Data: {
        group: [
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
          }
        ]
      };
      this.axios
        .post("/api/gameWorks3/getNoAppraisalList_Round3")
        .then(function(response) {
          console.log(response);
          if (response && response.data.code == "0") {
            let data = response.data.data;
            data.forEach(p => {
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
            });

            that.Data.group[0].prize[0].list = data.filter(p => p.prize === 1);
            that.Data.group[0].prize[1].list = data.filter(p => p.prize === 2);
            that.Data.group[0].prize[2].list = data.filter(p => p.prize === 3);
            that.Data.group[0].prize[3].list = data.filter(p => p.prize === 4);
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
