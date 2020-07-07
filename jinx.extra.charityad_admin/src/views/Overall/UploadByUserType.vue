<template>
  <div id="page">
    <div>
      <el-button id="btnDateRange7" size="small" @click="handleDateRange7">7天</el-button>
      <el-date-picker id="pickerDateRange" v-model="date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable size="small" @change="handleDateRangeChange"> </el-date-picker>
    </div>

    <div class="chart" id="barPenalize"></div>
  </div>
</template>

<script>
import HighCharts from "highcharts";
import moment from "moment";
import qs from "qs";

export default {
  data() {
    return {
      date_range: [moment().add(-6, "days")._d, new Date()],
      UserGroup: this.$WorksGroupCode.filter(p => p.code !== "4"),
      UserGroupValue: this.$WorksGroupCode.filter(p => p.code !== "4").map(p => p.value),
      UserGroupCode: this.$WorksGroupCode.filter(p => p.code !== "4").map(p => p.code),
      DateList: [],
      StatData: [],
      chartOptions: {
        chart: {
          type: "column"
        },
        title: {
          text: "注册量"
        },
        xAxis: {
          categories: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            name: "东京",
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
          },
          {
            name: "纽约",
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]
          },
          {
            name: "伦敦",
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0]
          },
          {
            name: "柏林",
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4]
          }
        ]
      }
    };
  },
  created() {
    this.chartOptions.series = [];
    let x;
    this.chartOptions.series = this.UserGroup.map(p => (x = { name: p.value, data: [] }));
    this.DateList = [];
    this.chartOptions.xAxis.categories = [];
    for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
      this.chartOptions.xAxis.categories.push(moment(i).format("YYYY-MM-DD"));
      this.DateList.push(moment(i).format("YYYY-MM-DD"));
    }
    console.log(this.chartOptions.xAxis.categories);
  },
  mounted() {
    this.chartOptions.series = [];
    let x;
    this.chartOptions.series = this.UserGroup.map(p => (x = { name: p.value, data: [] }));
    this.DateList = [];
    this.chartOptions.xAxis.categories = [];
    for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
      this.chartOptions.xAxis.categories.push(moment(i).format("YYYY-MM-DD"));
      this.DateList.push(moment(i).format("YYYY-MM-DD"));
    }
    HighCharts.chart("barPenalize", this.chartOptions);
    // HighCharts.chart("barPenalize", this.chartOptions);
    // setTimeout(() => {
    // }, 3000);
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
            console.log(response.data.data);
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
      console.log(this.StatData);
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
      console.log(this.chartOptions);
      HighCharts.chart("barPenalize", this.chartOptions);
    },
    refreshTable() {}
  }
};
</script>

<style lang="less" scoped>
/deep/ #btnDateRange7 {
  border: none;
  background: #f3f5f7;
  padding: 10px 15px;
  margin-right: 15px;
}
/deep/ .el-date-editor {
  width: 270px;
  background: #f3f5f7;
  border: none;

  input {
    background: #f3f5f7;
  }
}
</style>
