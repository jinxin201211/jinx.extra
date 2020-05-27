<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品打分(第三轮)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="tab_active">
      <el-tab-pane label="高校类" name="1">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
        <span style="margin-left: 20px; color: #666666;" v-text="`一等奖${Data.group[0].prize[0].list.length}名， 二等奖${Data.group[0].prize[1].list.length}名， 三等奖${Data.group[0].prize[2].list.length}名， 优秀奖${Data.group[0].prize[3].list.length}名`"></span>

        <el-card shadow="never">
          <div slot="header">
            <span>一等奖</span>
          </div>
          <el-table :data="Data.group[0].prize[0].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-tooltip content="提升等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveUp(0, 1, scope.$index, scope.row)" type="text" size="small">丄</el-button>
                </el-tooltip>
                <el-tooltip content="降低等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveDown(0, 1, scope.$index, scope.row)" type="text" size="small">丅</el-button>
                </el-tooltip>
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>二等奖</span>
          </div>
          <el-table :data="Data.group[0].prize[1].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-tooltip content="提升等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveUp(0, 1, scope.$index, scope.row)" type="text"><i class="el-icon-top"></i></el-button>
                </el-tooltip>
                <el-tooltip content="降低等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveDown(0, 1, scope.$index, scope.row)" type="text"><i class="el-icon-bottom"></i></el-button>
                </el-tooltip>
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>三等奖</span>
          </div>
          <el-table :data="Data.group[0].prize[2].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-tooltip content="提升等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveUp(0, 1, scope.$index, scope.row)" type="text" size="small">丄</el-button>
                </el-tooltip>
                <el-tooltip content="降低等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveDown(0, 1, scope.$index, scope.row)" type="text" size="small">丅</el-button>
                </el-tooltip>
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>优秀奖</span>
          </div>
          <el-table :data="Data.group[0].prize[3].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-tooltip content="提升等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveUp(0, 1, scope.$index, scope.row)" type="text" size="small">丄</el-button>
                </el-tooltip>
                <el-tooltip content="降低等级" placement="top" :open-delay="2000">
                  <el-button @click="handleMoveDown(0, 1, scope.$index, scope.row)" type="text" size="small">丅</el-button>
                </el-tooltip>
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="专业类" name="2">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>

        <el-card shadow="never">
          <div slot="header">
            <span>一等奖</span>
          </div>
          <el-table :data="Data.group[1].prize[0].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>二等奖</span>
          </div>
          <el-table :data="Data.group[1].prize[1].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>三等奖</span>
          </div>
          <el-table :data="Data.group[1].prize[2].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>优秀奖</span>
          </div>
          <el-table :data="Data.group[1].prize[3].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="公众类" name="3">
        <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>

        <el-card shadow="never">
          <div slot="header">
            <span>一等奖</span>
          </div>
          <el-table :data="Data.group[2].prize[0].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>二等奖</span>
          </div>
          <el-table :data="Data.group[2].prize[1].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>三等奖</span>
          </div>
          <el-table :data="Data.group[2].prize[2].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>优秀奖</span>
          </div>
          <el-table :data="Data.group[2].prize[3].list" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
            <el-table-column prop="wno" label="作品编号"> </el-table-column>
            <el-table-column prop="worksName" label="作品名称"> </el-table-column>
            <el-table-column prop="gameType" label="参赛对象"> </el-table-column>
            <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
            <el-table-column prop="worksType" label="作品类别"> </el-table-column>
            <!--<el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="180" v-if="false">
              <template slot-scope="scope">
                <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      tab_active: "1",
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
      loading: false
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
            let data = [
              {
                worksName: "高校组一等奖1",
                gameType: "0",
                prize: 1
              },
              {
                worksName: "高校组二等奖1",
                gameType: "0",
                prize: 2
              },
              {
                worksName: "高校组二等奖2",
                gameType: "0",
                prize: 2
              },
              {
                worksName: "高校组三等奖1",
                gameType: "0",
                prize: 3
              },
              {
                worksName: "高校组三等奖2",
                gameType: "0",
                prize: 3
              },
              {
                worksName: "高校组三等奖3",
                gameType: "0",
                prize: 3
              },
              {
                worksName: "高校组优秀奖1",
                gameType: "0",
                prize: 4
              },
              {
                worksName: "高校组优秀奖2",
                gameType: "0",
                prize: 4
              },
              {
                worksName: "高校组优秀奖3",
                gameType: "0",
                prize: 4
              },
              {
                worksName: "高校组优秀奖4",
                gameType: "0",
                prize: 4
              },

              {
                worksName: "专业组一等奖1",
                gameType: "1",
                prize: 1
              },
              {
                worksName: "专业组二等奖1",
                gameType: "1",
                prize: 2
              },
              {
                worksName: "专业组二等奖2",
                gameType: "1",
                prize: 2
              },
              {
                worksName: "专业组三等奖1",
                gameType: "1",
                prize: 3
              },
              {
                worksName: "专业组三等奖2",
                gameType: "1",
                prize: 3
              },
              {
                worksName: "专业组三等奖3",
                gameType: "1",
                prize: 3
              },
              {
                worksName: "专业组优秀奖1",
                gameType: "1",
                prize: 4
              },
              {
                worksName: "专业组优秀奖2",
                gameType: "1",
                prize: 4
              },
              {
                worksName: "专业组优秀奖3",
                gameType: "1",
                prize: 4
              },
              {
                worksName: "专业组优秀奖4",
                gameType: "1",
                prize: 4
              },

              {
                worksName: "公众组一等奖1",
                gameType: "2",
                prize: 1
              },
              {
                worksName: "公众组二等奖1",
                gameType: "2",
                prize: 2
              },
              {
                worksName: "公众组二等奖2",
                gameType: "2",
                prize: 2
              },
              {
                worksName: "公众组三等奖1",
                gameType: "2",
                prize: 3
              },
              {
                worksName: "公众组三等奖2",
                gameType: "2",
                prize: 3
              },
              {
                worksName: "公众组三等奖3",
                gameType: "2",
                prize: 3
              },
              {
                worksName: "公众组优秀奖1",
                gameType: "2",
                prize: 4
              },
              {
                worksName: "公众组优秀奖2",
                gameType: "2",
                prize: 4
              },
              {
                worksName: "公众组优秀奖3",
                gameType: "2",
                prize: 4
              },
              {
                worksName: "公众组优秀奖4",
                gameType: "2",
                prize: 4
              }
            ];

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
    handleView: function(data) {
      this.$router.push({
        path: "/viewwork",
        query: {
          wid: data.wid
        }
      });
    },
    handleMoveUp: function(group, prize, index, data) {
      if (prize === 0) {
        return;
      }

      let up = this.Data.group[group].prize[prize].list.splice(index, 1)[0];
      let down = this.Data.group[group].prize[prize - 1].list.splice(this.Data.group[group].prize[prize - 1].list, 1)[0];
      this.Data.group[group].prize[prize].list = [down].concat(this.Data.group[group].prize[prize].list);
      this.Data.group[group].prize[prize - 1].list.push(up);
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
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-card {
  margin-top: 20px;
}
</style>
