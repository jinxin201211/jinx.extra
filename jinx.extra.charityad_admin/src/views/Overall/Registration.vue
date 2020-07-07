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
      <el-table-column v-for="(item, index) in Table.Column" :prop="item.prop" :label="item.label" :key="'col' + index" sortable width="120"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import moment from "moment";
import qs from "qs";

export default {
  components: { highcharts: Chart },
  data() {
    return {
      date_range: [moment().add(-6, "days")._d, new Date()],
      UserGroup: this.$WorksGroupCode.filter(p => p.code !== "4"),
      UserGroupValue: this.$WorksGroupCode.filter(p => p.code !== "4").map(p => p.value),
      UserGroupCode: this.$WorksGroupCode.filter(p => p.code !== "4").map(p => p.code),
      DateList: [],
      StatData: [],
      Table: {
        Column: [],
        Data: []
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
          text: "注册量统计"
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
            name: "高校类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "专业类",
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "公众类",
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  created() {
    let x;
    this.chartOptions.series = [];
    this.chartOptions.series = this.UserGroup.map(p => (x = { name: p.value, data: [] }));
    this.Table.Column = [];
    this.Table.Column = this.UserGroup.map(p => (x = { prop: "column" + p.code, label: p.value }));
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
        .post("/api/gameWorks2/GetRegInfo", qs.stringify({ sDate: kssj, eDate: jssj }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data;
            that.StatData = [];
            for (let i = 0; i < that.DateList.length; i++) {
              let rowdata = [];

              for (let j = 0; j < that.UserGroupCode.length; j++) {
                let stat = data.find(p => p.date === that.DateList[i] && p.type === that.UserGroupCode[j]);
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
        for (let j = 0; j < this.UserGroupCode.length; j++) {
          data["column" + this.UserGroupCode[j]] = this.StatData[i][j];
        }
        this.Table.Data.push(data);
      }
    },
    handleExportStat() {
      let head = ["日期"];
      let filter = ["date"];
      for (let i = 0; i < this.UserGroup.length; i++) {
        head.push(this.UserGroup[i].value);
        filter.push("column" + this.UserGroup[i].code);
      }
      this.getExcel(head, filter, this.Table.Data, `注册量统计 ${moment(this.date_range[0]).format("YYYY-MM-DD")} ~ ${moment(this.date_range[1]).format("YYYY-MM-DD")}`);
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
</style>
