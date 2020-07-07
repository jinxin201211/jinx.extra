<template>
  <div>
    <div>
      <el-button id="btnDateRange7" size="small" @click="handleDateRange7">7天</el-button>
      <el-date-picker id="pickerDateRange" v-model="date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable size="small"> </el-date-picker>
    </div>

    <div class="chart" id="barPenalize"></div>
  </div>
</template>

<script>
import HighCharts from "highcharts";
import moment from "moment";

export default {
  data() {
    return {
      date_range: [moment().add(-6, "days")._d, new Date()],
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
  mounted() {
    HighCharts.chart("barPenalize", this.chartOptions);
    setTimeout(() => {
      // this.chartOptions.series = [];
      // let x;
      // this.chartOptions.series = this.$WorksGroupCode.filter(p => p.code !== "4").map(p => (x = { name: p.value, data: [] }));
      this.chartOptions.xAxis.categories = [];
      for (let i = this.date_range[0]; i <= this.date_range[1]; i = moment(i).add(1, "days")._d) {
        this.chartOptions.xAxis.categories.push(moment(i).format("YYYY-MM-DD"));
      }
      HighCharts.chart("barPenalize", this.chartOptions);
    }, 3000);
  },
  methods: {
    handleDateRange7() {
      this.date_range = [moment().add(-6, "days")._d, new Date()];
    }
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
