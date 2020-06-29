<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>评审结果</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="TabsActive">
      <el-tab-pane label="各校报送赛区评选作品数量汇总统计表" name="1">
        <el-button @click="handleRefreshSchoolStat" :loading="loading_school_stat">刷新列表</el-button>
        <el-button @click="handleExportSchoolStat">导出表格</el-button>
        <el-table :data="TableDataSchoolStat" style="width: 100%" v-loading="loading_school_stat">
          <el-table-column prop="school" label="学校"> </el-table-column>
          <el-table-column prop="school_no" label="赛区院校编号"> </el-table-column>
          <el-table-column :prop="item.code" :label="item.code + ' ' + item.value" v-for="(item, index) in $WorksTypeCode" :key="'school_stat_column' + index"> </el-table-column>
          <el-table-column prop="total" label="合计"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="赛区报送全国总评审作品数量统计表" name="2">
        <el-button @click="handleRefreshPrizeStat" :loading="loading_prize_stat">刷新列表</el-button>
        <el-button @click="handleExportPrizeStat">导出表格</el-button>
        <el-table :data="TableDataPrizeStat" style="width: 100%" v-loading="loading_prize_stat">
          <el-table-column prop="prize_name" label="奖项"> </el-table-column>
          <el-table-column :prop="item.code" :label="item.code + ' ' + item.value" v-for="(item, index) in $WorksTypeCode" :key="'school_stat_column' + index"> </el-table-column>
          <el-table-column prop="total" label="合计"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="赛区获奖名单" name="3">
        <el-button @click="handleRefreshPrize" :loading="loading_prize">刷新列表</el-button>
        <el-button @click="handleExportPrize">导出表格</el-button>
        <el-button @click="handleExportPrizeAttachment">导出附件</el-button>
        <el-table :data="TableDataPrize" style="width: 100%" v-loading="loading_prize">
          <el-table-column prop="seq" label="序号"> </el-table-column>
          <el-table-column prop="works_type" label="作品类别"> </el-table-column>
          <el-table-column prop="works_series_name" label="命题名称"> </el-table-column>
          <el-table-column prop="wno" label="参赛编号"> </el-table-column>
          <el-table-column prop="works_name" label="作品名称"> </el-table-column>
          <el-table-column prop="author1" label="作者"> </el-table-column>
          <el-table-column prop="tel" label="作者电话"> </el-table-column>
          <el-table-column prop="t_uname" label="指导教师"> </el-table-column>
          <el-table-column prop="t_tel" label="教师电话"> </el-table-column>
          <el-table-column prop="school" label="学校"> </el-table-column>
          <el-table-column prop="department" label="院系"> </el-table-column>
          <el-table-column prop="other" label="其他"> </el-table-column>
          <el-table-column prop="major" label="专业"> </el-table-column>
          <el-table-column prop="prize" label="获奖等级"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { jinx_download } from "@/assets/js/download.js";
export default {
  data() {
    return {
      TabsActive: "1",
      TableDataSchoolStat: [],
      TableDataPrizeStat: [],
      TableDataPrize: [],
      loading_school_stat: false,
      loading_prize_stat: false,
      loading_prize: false
    };
  },
  mounted() {
    this.handleRefreshSchoolStat();
    this.handleRefreshPrizeStat();
    this.handleRefreshPrize();
  },
  methods: {
    handleRefreshSchoolStat() {
      let that = this;
      that.loading_school_stat = true;
      this.axios
        .get("/api/gameWorks3/GetWorksSummaryNumBySchool")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.TableDataSchoolStat = response.data.data;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.loading_school_stat = false;
        })
        .catch(function(err) {
          console.log(err);
          that.loading_school_stat = false;
          that.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleRefreshPrizeStat() {
      let that = this;
      that.loading_prize_stat = true;
      this.axios
        .get("/api/gameWorks3/GetWorksSummaryNumByPrize")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.TableDataPrizeStat = response.data.data;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.loading_prize_stat = false;
        })
        .catch(function(err) {
          console.log(err);
          that.loading_prize_stat = false;
          that.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleRefreshPrize() {
      let that = this;
      that.loading_prize = true;
      this.axios
        .get("/api/gameWorks3/GetWorksPrizeList")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.TableDataPrize = response.data.data;
            that.TableDataPrize.forEach(p => {
              let translate = that.$WorksTypeCode.filter(x => x.code == p.works_type);
              if (translate.length > 0) {
                p.works_type = translate[0].code + " " + translate[0].value;
              }
            });
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.loading_prize = false;
        })
        .catch(function(err) {
          console.log(err);
          that.loading_prize = false;
          that.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleExportSchoolStat() {
      // window.location.href = this.$ImagePostServer + "/gameWorks3/GetWorksSummaryNumBySchool_ExcelDownload";
      let url = this.$ImagePostServer + "/gameWorks3/GetWorksSummaryNumBySchool_ExcelDownload";
      jinx_download(url, {});
    },
    handleExportPrizeStat() {
      // window.location.href = this.$ImagePostServer + "/gameWorks3/GetWorksSummaryNumByPrize_ExcelDownload";
      let url = this.$ImagePostServer + "/gameWorks3/GetWorksSummaryNumByPrize_ExcelDownload";
      jinx_download(url, {});
    },
    handleExportPrize() {
      // window.location.href = this.$ImagePostServer + "/gameWorks3/GetWorksPrizeList_ExcelDownload";
      let url = this.$ImagePostServer + "/gameWorks3/GetWorksPrizeList_ExcelDownload";
      jinx_download(url, {});
    },
    handleExportPrizeAttachment() {
      // window.location.href = this.$ImagePostServer + "/gameWorks3/GetWorksPrizeList_AttachmentDownload";
      let url = this.$ImagePostServer + "/gameWorks3/GetWorksPrizeList_AttachmentDownload";
      jinx_download(url, {});
    }
  }
};
</script>
