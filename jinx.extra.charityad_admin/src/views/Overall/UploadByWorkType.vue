<template>
  <div id="page">
    <div>
      <el-button id="btnDateRange7" size="small" @click="handleDateRange7">7天</el-button>
      <el-date-picker id="pickerDateRange" v-model="date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable size="small" @change="handleDateRangeChange"> </el-date-picker>
    </div>

    <highcharts :options="chartOptions"></highcharts>

    <div class="data-table-box">
      <div class="data-title">
        日期数据报表
        <div class="download fr" @click="handleExportStat">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="icon">
            <path
              d="M138.667 778.667v106.666h746.665V778.667c0-29.456 23.878-53.335 53.334-53.335s53.333 23.88 53.333 53.335v106.666c0 58.912-47.755 106.668-106.667 106.668H138.668c-58.912 0-106.667-47.756-106.667-106.668V778.667c0-29.456 23.878-53.335 53.335-53.335s53.332 23.88 53.332 53.335zM458.665 597.27V85.333c0-29.456 23.878-53.334 53.334-53.334s53.333 23.878 53.333 53.335V597.27l281.889-282.86a53.44 53.44 0 0175.753 0c20.923 20.993 20.923 55.03 0 76.022l-371.21 372.49A53.322 53.322 0 01512 778.636a53.322 53.322 0 01-39.766-15.712l-371.21-372.49c-20.922-20.993-20.922-55.031 0-76.022a53.44 53.44 0 0175.754 0L458.666 597.27z"
            ></path></svg
          ><span>导出数据</span>
        </div>
      </div>
    </div>
    <el-table :data="Table.Data" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="日期" sortable> </el-table-column>
      <el-table-column v-for="(item, index) in Table.Column" :prop="item.prop" :label="item.label" :key="'col' + index" sortable width="120">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleCellClick(scope, index, scope.row[item.prop])">{{ scope.row[item.prop] }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="合计" sortable width="120">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleTotalClick(scope)">{{ scope.row.total }}</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="查看作品列表" :visible.sync="drawer.show" direction="rtl" size="75%" :destroy-on-close="true">
      <jinx-works-search :date="drawer.date" :game-type="drawer.gameType" :size="drawer.size" ref="WorksViewer"></jinx-works-search>
    </el-drawer>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import moment from "moment";
import qs from "qs";
import JinxWorksSearch from "./components/JinxWorksSearch.vue";

export default {
  components: { highcharts: Chart, JinxWorksSearch },
  data() {
    return {
      date_range: [moment().add(-6, "days")._d, new Date()],
      WorksType: this.$WorksTypeCode,
      WorksTypeValue: this.$WorksTypeCode.map(p => p.value),
      WorksTypeCode: this.$WorksTypeCode.map(p => p.code),
      DateList: [],
      StatData: [],
      Table: {
        Column: [],
        Data: []
      },
      drawer: {
        show: false,
        date: "",
        gameType: "",
        size: ""
      },
      chartOptions: {
        chart: {
          type: "column",
          spacing: [20, 80, 25, 80]
        },
        credits: {
          enabled: false
        },
        title: {
          text: "作品量统计(根据作品类别)"
        },
        xAxis: {
          categories: ["2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07"],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [
          {
            name: "平面类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "文案类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "广播类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "视频类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "动画类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "互动类",
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  created() {
    let x;
    this.chartOptions.series = [];
    this.chartOptions.series = this.WorksType.map(p => (x = { name: p.value, data: [] }));
    this.Table.Column = [];
    this.Table.Column = this.WorksType.map(p => (x = { prop: "column" + p.code, label: p.value }));
    this.DateList = [];
    this.chartOptions.xAxis.categories = [];
    for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
      this.chartOptions.xAxis.categories.push(moment(i).format("YYYY-MM-DD"));
      this.DateList.push(moment(i).format("YYYY-MM-DD"));
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleDateRange7() {
      this.date_range = [moment().add(-6, "days")._d, new Date()];
      this.getData();
    },
    handleDateRangeChange() {
      this.getData();
    },
    getData() {
      let kssj = moment(this.date_range[0]).format("YYYY-MM-DD");
      let jssj = moment(this.date_range[1]).format("YYYY-MM-DD");

      this.DateList = [];
      for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
        this.DateList.push(moment(i).format("YYYY-MM-DD"));
      }

      let loading = this.$loading({ target: "#page" });
      let that = this;
      this.axios
        .post("/api/gameWorks2/GetUploadInfo_WorksType", qs.stringify({ sDate: kssj, eDate: jssj }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data;
            that.StatData = [];
            for (let i = 0; i < that.DateList.length; i++) {
              let rowdata = [];

              for (let j = 0; j < that.WorksTypeCode.length; j++) {
                let stat = data.find(p => p.date === that.DateList[i] && p.works_type === that.WorksTypeCode[j]);
                if (stat != null) {
                  rowdata.push(stat.num);
                } else {
                  rowdata.push(0);
                }
              }
              that.StatData.push(rowdata);
            }
            that.refreshChart();
            that.refreshTable();
          } else {
            that.$message({
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
          that.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    refreshChart() {
      this.chartOptions.xAxis.categories = [];
      for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
        this.chartOptions.xAxis.categories.push(moment(i).format("YYYY-MM-DD"));
      }
      for (let i = 0; i < this.chartOptions.series.length; i++) {
        let data = [];
        for (let j = 0; j < this.DateList.length; j++) {
          data.push(this.StatData[j][i]);
        }
        this.chartOptions.series[i].data = data;
      }
    },
    refreshTable() {
      this.Table.Data = [];
      for (let i = 0; i < this.DateList.length; i++) {
        let data = {};
        data["date"] = moment(this.DateList[i]).format("YYYY年MM月DD日");
        let total = 0;
        for (let j = 0; j < this.WorksTypeCode.length; j++) {
          data["column" + this.WorksTypeCode[j]] = this.StatData[i][j];
          total += this.StatData[i][j];
        }
        data["total"] = total;
        this.Table.Data.push(data);
      }
    },
    handleExportStat() {
      let head = ["日期"];
      let filter = ["date"];
      for (let i = 0; i < this.WorksType.length; i++) {
        head.push(this.WorksType[i].value);
        filter.push("column" + this.WorksType[i].code);
      }
      head.push("合计");
      filter.push("total");
      this.getExcel(head, filter, this.Table.Data, `作品量统计(根据作品类别) ${moment(this.date_range[0]).format("YYYY-MM-DD")} ~ ${moment(this.date_range[1]).format("YYYY-MM-DD")}`);
    },
    getExcel(head, filter, list, title) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/assets/js/excel/Export2Excel.js");
        const data = this.formatJson(filter, list);
        export_json_to_excel(head, data, title);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleCellClick(scope, index, data) {
      let date = moment(scope.row.date, "YYYY年MM月DD日").format("YYYY-MM-DD");
      let works_type = this.WorksTypeCode[index];
      this.drawer.date = date;
      this.drawer.worksType = works_type;
      this.drawer.show = true;
      this.drawer.size = data;
    },
    handleTotalClick(scope, index) {
      let date = moment(scope.row.date, "YYYY年MM月DD日").format("YYYY-MM-DD");
      this.drawer.date = date;
      this.drawer.show = true;
      this.drawer.size = scope.row.total;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ #btnDateRange7 {
  border: none;
  background: #f3f5f7;
  padding: 10px 15px;
  margin-right: 10px;
}
/deep/ .el-date-editor {
  width: 270px;
  background: #f3f5f7;
  border: none;

  input {
    background: #f3f5f7;
  }
}

/deep/ .data-title {
  background: #fff;
  height: 48px;
  line-height: 48px;
  font-weight: 600;
  color: #474747;
  font-size: 16px;
  border-bottom: 1px solid #e9e9e9;
  text-align: left;
}
/deep/ div.download {
  display: inline-block;
  cursor: pointer;
}
/deep/ div.download svg.icon {
  width: 13px;
  height: 13px;
  fill: #3399ea;
  vertical-align: -1px;
}
/deep/ div.download span {
  color: #3399ea;
  font-size: 14px;
}
/deep/ .fr {
  float: right;
}
/deep/ .el-drawer {
  overflow-y: scroll;
}
</style>

<style>
:focus {
  outline: 0;
}
</style>
