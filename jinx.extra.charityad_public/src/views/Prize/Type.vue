<template>
  <div class="jinx-panel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>获奖查询</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="display: flex; padding: 20px 0;">
      <div class="jinx-types">
        <div class="type" v-for="(item, index) in $WorksTypeCode" :key="'WorksTypeCode' + index"><div :class="{ active: type === item.code * 1 }" @click="handleTypeClick(item.code * 1)" v-text="item.value"></div></div>
        <div class="type"><div :class="{ active: type === 'search' }" @click="handleTypeClick('search')" v-text="'作品获奖查询'"></div></div>
      </div>
      <div style="flex-grow: 1">
        <el-tabs v-model="tab_active" v-if="type !== 'search'">
          <el-tab-pane :label="item.value" v-for="(item, index) in $WorksGroupCode" :key="'WorksGroupCode' + index">
            <el-card shadow="never" v-for="(pitem, pindex) in PrizeList" :key="'prize' + pindex">
              <div slot="header">
                <span v-text="pitem"></span>
              </div>
              <el-table :data="Data.group[index].prize[pindex].list" stripe style="width: 100%" @row-dblclick="handleRowDbclick" :empty-text="EmptyText">
                <el-table-column type="index" width="50"> </el-table-column>
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
            </el-card>
          </el-tab-pane>
        </el-tabs>
        <div v-else>
          <div style="text-align: center;">
            <el-input v-model="Search" placeholder="请输入作品编号/作品名称/作者" style="width: 250px;"></el-input>
            <el-button type="primary" style="margin-left: 15px;" :loading="loading" @click="handleSearchPrize">查询</el-button>
          </div>
          <el-divider></el-divider>
          <el-table :data="SearchList" stripe style="width: 100%" @row-dblclick="handleRowDbclick" :empty-text="'空'">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="wno" label="作品编号" width="120"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛组别" width="120"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
            <el-table-column prop="prize" label="奖项" width="120"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分" width="120"> </el-table-column>-->
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      tab_active: "0",
      type: 1,
      PrizeList: ["一等奖", "二等奖", "三等奖", "优秀奖"],
      FullRankList: [],
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
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          }
        ]
      },
      EmptyText: "奖项空缺",
      Search: "",
      SearchList: [],
      loading: false,
      ResultPrize: ""
    };
  },
  mounted: function() {
    this.getAllRankList();
  },
  methods: {
    handleTypeClick(type) {
      this.type = type;
      if (type === "search") {
      } else {
        this.getRankList();
      }
    },
    getAllRankList: function() {
      let _this = this;
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
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          }
        ]
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.FullRankList = [];
      this.axios
        .post("/api/gameWorksRank/getAllRank")
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.FullRankList = response.data.data;
            _this.getRankList();
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          _this.$message({
            showClose: true,
            message: "获奖结果查询失败",
            type: "warning"
          });
        });
    },
    getRankList: function() {
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
          },
          {
            prize: [{ list: [] }, { list: [] }, { list: [] }, { list: [] }]
          }
        ]
      };
      let data = JSON.parse(JSON.stringify(this.FullRankList.filter(p => p.worksType === this.type + "")));
      data.forEach(p => {
        let game_type = this.$WorksGroupCode.find(x => x.code == p.gameType);
        p.gameType = game_type == null ? "" : game_type.value;
        let series = this.$WorksSeriesCode.find(x => x.code == p.worksSeries);
        p.worksSeries = series == null ? "" : series.value;
        let type = this.$WorksTypeCode.find(x => x.code == p.worksType);
        p.worksType = type == null ? "" : type.value;
        let source = this.$MaterialSurceCode.find(x => x.code == p.materialSurce);
        p.materialSurce = source == null ? "" : source.value;
      });

      let game_type0 = this.getGameTypeByCode("0");
      this.Data.group[0].prize[0].list = data.filter(p => p.gameType === game_type0 && p.prize === 1);
      this.Data.group[0].prize[1].list = data.filter(p => p.gameType === game_type0 && p.prize === 2);
      this.Data.group[0].prize[2].list = data.filter(p => p.gameType === game_type0 && p.prize === 3);
      this.Data.group[0].prize[3].list = data.filter(p => p.gameType === game_type0 && p.prize === 4);

      let game_type1 = this.getGameTypeByCode("1");
      this.Data.group[1].prize[0].list = data.filter(p => p.gameType === game_type1 && p.prize === 1);
      this.Data.group[1].prize[1].list = data.filter(p => p.gameType === game_type1 && p.prize === 2);
      this.Data.group[1].prize[2].list = data.filter(p => p.gameType === game_type1 && p.prize === 3);
      this.Data.group[1].prize[3].list = data.filter(p => p.gameType === game_type1 && p.prize === 4);

      let game_type2 = this.getGameTypeByCode("2");
      this.Data.group[2].prize[0].list = data.filter(p => p.gameType === game_type2 && p.prize === 1);
      this.Data.group[2].prize[1].list = data.filter(p => p.gameType === game_type2 && p.prize === 2);
      this.Data.group[2].prize[2].list = data.filter(p => p.gameType === game_type2 && p.prize === 3);
      this.Data.group[2].prize[3].list = data.filter(p => p.gameType === game_type2 && p.prize === 4);

      let game_type4 = this.getGameTypeByCode("4");
      this.Data.group[3].prize[0].list = data.filter(p => p.gameType === game_type4 && p.prize === 1);
      this.Data.group[3].prize[1].list = data.filter(p => p.gameType === game_type4 && p.prize === 2);
      this.Data.group[3].prize[2].list = data.filter(p => p.gameType === game_type4 && p.prize === 3);
      this.Data.group[3].prize[3].list = data.filter(p => p.gameType === game_type4 && p.prize === 4);
      this.EmptyText = data.length > 0 ? "奖项空缺" : "评审中";
    },
    getGameTypeByCode(code) {
      let game_type = this.$WorksGroupCode.find(x => x.code == code);
      return game_type == null ? code : game_type.value;
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
    },
    handleSearchPrize() {
      this.loading = true;
      if (this.Search.trim() === "") {
        this.SearchList = [];
      } else {
        let data = this.FullRankList.filter(p => p.wno.includes(this.Search) || p.worksName.includes(this.Search) || (p.author1 && p.author1.includes(this.Search)) || (p.author2 && p.author2.includes(this.Search)) || (p.author3 && p.author3.includes(this.Search)) || (p.author4 && p.author4.includes(this.Search)) || (p.author5 && p.author5.includes(this.Search)));
        this.SearchList = JSON.parse(JSON.stringify(data));
        this.SearchList.forEach(p => {
          let game_type = this.$WorksGroupCode.find(x => x.code == p.gameType);
          p.gameType = game_type == null ? "" : game_type.value;
          let series = this.$WorksSeriesCode.find(x => x.code == p.worksSeries);
          p.worksSeries = series == null ? "" : series.value;
          let type = this.$WorksTypeCode.find(x => x.code == p.worksType);
          p.worksType = type == null ? "" : type.value;
          let source = this.$MaterialSurceCode.find(x => x.code == p.materialSurce);
          p.materialSurce = source == null ? "" : source.value;
          p.prize = this.PrizeList[p.prize * 1 - 1];
        });
      }
      this.loading = false;
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
  // position: absolute;
  display: flex;
  flex-direction: column;
  // padding: 20px 0;
  justify-content: flex-start;
  width: 180px;
  padding-right: 20px;
  .type {
    width: 100%;
    div {
      // border: 1px solid @primary-color;
      background: #ececec;
      margin-bottom: 5px;
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
/deep/ .el-card {
  margin-top: 20px;
}
</style>
