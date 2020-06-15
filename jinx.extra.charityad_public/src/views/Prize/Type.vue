<template>
  <div class="jinx-panel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>获奖查询</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="jinx-types" v-if="false">
      <div class="type" v-for="(item, index) in $WorksGroupCode" :key="'WorksGroupCode' + index"><div :class="{ active: group === item.code * 1 }" @click="group = item.code * 1" v-text="item.value"></div></div>
    </div>

    <div class="jinx-types">
      <div class="type" v-for="(item, index) in $WorksTypeCode" :key="'WorksTypeCode' + index"><div :class="{ active: type === item.code * 1 }" @click="handleTypeClick(item.code * 1)" v-text="item.value"></div></div>
    </div>

    <el-card style="margin-bottom: 20px;" shadow="never">
      <div slot="header">
        <span>一等奖</span>
      </div>
      <el-table style="width: 100%" :data="FirstPrizeList" @row-dblclick="handleRowDbclick">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="wno" label="作品编号"> </el-table-column>
        <el-table-column prop="gameType" label="参赛组别"> </el-table-column>
        <el-table-column prop="worksName" label="作品名称"> </el-table-column>
        <el-table-column prop="worksType" label="作品类别"> </el-table-column>
        <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
        <el-table-column prop="tUname" label="指导老师"> </el-table-column>
        <el-table-column prop="orgName" label="所属单位"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-bottom: 20px;" shadow="never">
      <div slot="header">
        <span>二等奖</span>
      </div>
      <el-table style="width: 100%" :data="SecondPrizeList" @row-dblclick="handleRowDbclick">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="wno" label="作品编号"> </el-table-column>
        <el-table-column prop="gameType" label="参赛组别"> </el-table-column>
        <el-table-column prop="worksName" label="作品名称"> </el-table-column>
        <el-table-column prop="worksType" label="作品类别"> </el-table-column>
        <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
        <el-table-column prop="tUname" label="指导老师"> </el-table-column>
        <el-table-column prop="orgName" label="所属单位"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-bottom: 20px;" shadow="never">
      <div slot="header">
        <span>三等奖</span>
      </div>
      <el-table style="width: 100%" :data="ThirdPrizeList" @row-dblclick="handleRowDbclick">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="wno" label="作品编号"> </el-table-column>
        <el-table-column prop="gameType" label="参赛组别"> </el-table-column>
        <el-table-column prop="worksName" label="作品名称"> </el-table-column>
        <el-table-column prop="worksType" label="作品类别"> </el-table-column>
        <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
        <el-table-column prop="tUname" label="指导老师"> </el-table-column>
        <el-table-column prop="orgName" label="所属单位"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-bottom: 20px;" shadow="never">
      <div slot="header">
        <span>优秀奖</span>
      </div>
      <el-table style="width: 100%" :data="FourthPrizeList" @row-dblclick="handleRowDbclick">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="wno" label="作品编号"> </el-table-column>
        <el-table-column prop="gameType" label="参赛组别"> </el-table-column>
        <el-table-column prop="worksName" label="作品名称"> </el-table-column>
        <el-table-column prop="worksType" label="作品类别"> </el-table-column>
        <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
        <el-table-column prop="tUname" label="指导老师"> </el-table-column>
        <el-table-column prop="orgName" label="所属单位"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      group: 0,
      type: 1,
      FirstPrizeList: [],
      SecondPrizeList: [],
      ThirdPrizeList: [],
      FourthPrizeList: []
    };
  },
  mounted: function() {
    this.getRankList();
  },
  methods: {
    handleTypeClick(type) {
      this.type = type;
      this.getRankList();
    },
    getRankList: function() {
      let that = this;
      this.FirstPrizeList = [];
      this.SecondPrizeList = [];
      this.ThirdPrizeList = [];
      this.FourthPrizeList = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.axios
        .post("/api/gameWorksRank/getRankByMap", qs.stringify({ worksType: this.type }))
        .then(function(response) {
          console.log(response);
          if (response && response.data.code == "0") {
            let data = response.data.data;

            data.forEach(p => {
              let works_type = that.$WorksTypeCode.find(x => x.code === p.worksType);
              if (works_type != null) {
                p.worksType = works_type.value;
              }
              let game_type = that.$WorksGroupCode.find(x => x.code === p.gameType);
              if (game_type != null) {
                p.gameType = game_type.value;
              }
              let works_series = that.$WorksSeriesCode.find(x => x.code === p.worksSeries);
              if (works_series != null) {
                p.worksSeries = works_series.value;
              }
            });

            that.FirstPrizeList = data.filter(p => p.prize == 1);
            that.SecondPrizeList = data.filter(p => p.prize == 2);
            that.ThirdPrizeList = data.filter(p => p.prize == 3);
            that.FourthPrizeList = data.filter(p => p.prize == 4);
          } else {
            that.$message({
              showClose: true,
              message: "获奖结果查询失败",
              type: "warning"
            });
          }
          loading.close();
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          that.$message({
            showClose: true,
            message: "获奖结果查询失败",
            type: "warning"
          });
        });
    },
    handleView: function(data) {
      this.$router.push({
        path: "/prize/work",
        query: {
          wid: data.wid
        }
      });
    },
    handleRowDbclick: function(row, column, event) {
      this.$router.push({
        path: "/prize/work",
        query: {
          wid: row.wid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 0 auto;
  box-sizing: border-box;
}

.jinx-types {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;

  .type {
    flex: 1;
    padding: 20px;

    div {
      border: 1px solid @primary-color;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s, color 0.3s, border-color 0.3s;
      border-radius: 7px;
    }

    div.active {
      background: @primary-color;
      border-color: @primary-color;
      color: #fefdfc;
    }
  }
}
</style>
