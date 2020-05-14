<template>
  <div id="page" style="padding: 20px 0; padding-bottom: 300px; position: relative; height: 100%; overflow: hidden; box-sizing: border-box;">
    <div style="height: 100%; overflow-y: auto; padding: 0 20px; padding-bottom: 20px;">
      <el-page-header @back="handleBack" content="作品打分" style="margin-bottom: 20px;"> </el-page-header>
      <div style="margin-top: 20px;">
        <el-card>
          <div>
            <span style="font-size: 24px; font-weight: bold;" v-text="WorksInfo.works.worksName"></span>
          </div>
          <div>
            <span>命题类别：</span>
            <span v-text="WorksInfo.works.propositionType"></span>
          </div>
          <div>
            <span>命题名称：</span>
            <span v-text="WorksInfo.works.proindexpositionName"></span>
          </div>
        </el-card>
        <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
          <div slot="header" class="clearfix">
            <span v-text="'文件' + (index + 1)"></span>
          </div>
          <div v-if="isImage(item.fileName)" style="text-align: center;">
            <img :src="$ImageGetServer + item.fileName" style="width: 960px; margin: 0 auto;" />
          </div>
          <div v-else-if="isVideo(item.fileName)" style="text-align: center;">
            <video :src="$ImageGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 video 标签。</video>
          </div>
          <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
            <a :href="$ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
          <div v-else style="text-align: center;">
            <a :href="$ImageGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
          <!--<div>
          <el-link @click="handleDownload($ImageGetServer + item.fileName)">下载文件</el-link>
        </div>-->
        </el-card>
      </div>
    </div>

    <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff; box-sizing: border-box;">
      <div style="position: relative;" class="jinx-score-area" v-show="!WorksInfo.empty">
        <div class="ranks">
          <div class="rank" v-for="(item, index) in ScoreRule.Rank" :key="'ranks' + index">
            <span class="rank-name" v-text="item.Name"></span>
          </div>
        </div>
        <div class="score-area" v-show="!Scored">
          <div class="scores" v-for="(item, index) in ScoreRule.Rank" :key="'keys' + index">
            <span :class="{ active: score === ScoreResult.Rank[index] }" class="score" v-for="score in ScoreRule.Score" :key="item + score" v-text="score" @click="handleScoreClick(score, index)"></span>
          </div>
        </div>
        <div class="score-area disabled" v-show="Scored">
          <div class="scores" v-for="(item, index) in ScoreRule.Rank" :key="'keys' + index">
            <span :class="{ active: score === ScoreResult.Rank[index] }" class="score" v-for="score in ScoreRule.Score" :key="item + score" v-text="score"></span>
          </div>
        </div>
        <div class="result">
          <div style="margin-bottom: 10px;">总得分</div>
          <div style="margin-bottom: 30px; font-size: 24px; font-weight: bold;"><span v-text="ScoreResult.Sum">8.500</span></div>
          <el-button size="small" type="primary" @click="handleSubmit" :loading="submit_status.loading" :disabled="submit_status.disabled">确 定</el-button>
        </div>
      </div>
      <div style="text-align: center;">
        <!--<el-button size="small" type="primary" @click="handleSubmit">上一个</el-button>-->
        <el-button size="small" type="primary" @click="handleNextWorks" :loading="next_status.loading" :disabled="next_status.disabled">下一个</el-button>
        <el-button size="small" type="primary" @click="handleBack">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      ScoreRule: {
        Rank: [
          {
            Name: "维度1 30%",
            Percentage: 0.3
          },
          {
            Name: "维度2 30%",
            Percentage: 0.3
          },
          {
            Name: "维度3 20%",
            Percentage: 0.2
          },
          {
            Name: "维度4 20%",
            Percentage: 0.2
          }
        ],
        Score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      Scored: false,
      ScoreResult: {
        Rank: [0, 0, 0, 0],
        Sum: 0
      },
      WorksInfo: {
        works: {},
        works_file: {},
        works_author: {},
        empty: true
      },
      submit_status: {
        loading: false,
        disabled: false
      },
      next_status: {
        loading: false,
        disabled: false
      }
    };
  },
  mounted() {
    this.getNextWork();
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    handleNextWorks: function() {
      this.getNextWork();
    },
    getNextWork: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.next_status.loading = true;
      this.axios
        .post("/api/gameWorks/getWorks")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;
            that.WorksInfo.empty = false;
            that.ScoreResult.Rank[0] = that.WorksInfo.works.score1;
            that.ScoreResult.Rank[1] = that.WorksInfo.works.score2;
            that.ScoreResult.Rank[2] = that.WorksInfo.works.score3;
            that.ScoreResult.Rank[3] = that.WorksInfo.works.score4;
            that.ScoreResult.Sum = that.WorksInfo.works.scoreTotal;
            if (that.WorksInfo.works.state === 1) {
              that.Scored = true;
            } else {
              that.Scored = false;
            }
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          that.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          that.next_status.loading = false;
          that.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    handleSubmit: function() {
      let complete = true;
      for (let i = 0; i < this.ScoreRule.Rank.length; i++) {
        if (this.ScoreResult.Rank[i] === 0) {
          complete = false;
        }
      }

      if (!complete) {
        this.$message({
          type: "warning",
          message: "还有打分项没有打分，不能提交"
        });
        return;
      }
      this.$confirm("分数提交之后不能修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.submit();
      });
    },
    submit: function() {
      let that = this;
      let data = {
        wid: this.WorksInfo.works.wid,
        score1: this.ScoreResult.Rank[0],
        score2: this.ScoreResult.Rank[1],
        score3: this.ScoreResult.Rank[2],
        score4: this.ScoreResult.Rank[3],
        scoreTotal: this.ScoreResult.Sum
      };
      this.axios
        .post("/api/gameWorks/appraisal", qs.stringify(data))
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
              message: "提交失败",
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
    },
    isImage: function(file) {
      console.log(file);
      if (file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif")) {
        return true;
      } else {
        return false;
      }
    },
    isVideo: function(file) {
      console.log(file);
      if (file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".flv") || file.endsWith(".mov") || file.endsWith(".mkv")) {
        return true;
      } else {
        return false;
      }
    },
    isPDF: function(file) {
      console.log(file);
      if (file.endsWith(".pdf")) {
        return true;
      } else {
        return false;
      }
    },
    handleDownload: function(file) {
      window.location.href = file;
    },
    handleScoreClick(score, index) {
      this.ScoreResult.Rank[index] = score;
      console.log(this.ScoreResult.Rank);

      let sum = 0;
      for (let i = 0; i < this.ScoreRule.Rank.length; i++) {
        sum += this.ScoreResult.Rank[i] * this.ScoreRule.Rank[i].Percentage;
      }
      this.ScoreResult.Sum = sum.toFixed(3);
    }
  }
};
</script>

<style lang="less" scoped>
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

*::-webkit-scrollbar {
  width: 6px;
  height: 1px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #d7d8d9;
}
*::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background: #f1f2f3;
}
*::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  // border-radius: 10px;
  // background: #ededed;
}
@line-height: 30px;

.jinx-score-area {
  position: relative;
  padding: 0 200px 0 200px;

  .ranks {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    line-height: @line-height;
    padding-left: 20px;

    .rank {
      .rank-name {
        width: 100px;
        display: inline-block;
        margin: 5px 10px;
      }
    }
    .rank:not(:last-child) {
      border-bottom: 1px solid transparent;
      margin-bottom: 10px;
    }
  }

  @score-color: #ff6600;
  .score-area {
    .scores {
      // display: inline-block;
      line-height: @line-height;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-center;
      align-items: center;
      justify-content: space-around;

      .score {
        display: inline-block;
        margin: 5px 10px;
        cursor: pointer;
        width: @line-height;
        text-align: center;
        transition: background-color 0.2s, color 0.2s;
      }

      .score:hover,
      .score.active {
        background: @score-color;
        color: #ffffff;
      }
    }
    .scores:not(:last-child) {
      border-bottom: 1px solid black;
      margin-bottom: 10px;
    }
  }

  .score-area.disabled {
    .scores {
      .score {
        cursor: initial;
      }
      .score:hover {
        background: initial;
        color: initial;
      }
      .score.active {
        background: lighten(@score-color, 10%);
        color: #ffffff;
      }
    }
  }

  .result {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    width: 200px;
    padding-top: 20px;
  }
}
</style>
