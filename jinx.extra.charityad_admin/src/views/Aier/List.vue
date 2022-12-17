<template>
  <div style="padding: 20px;">
    <div>
      <el-input v-model="query.name" placeholder="参赛姓名" size="" style="width: 150px; margin-right: 10px;"></el-input>
      <el-select v-model="query.group" placeholder="所属赛组" style="width: 150px; margin-right: 10px;" size="" :clearable="true">
        <el-option v-for="item in ListSelectGroup" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.city" placeholder="所在地市" style="width: 150px; margin-right: 10px;" size="" :clearable="true">
        <el-option v-for="item in ListSelectCity" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.issue" placeholder="眼健康需求" style="width: 150px; margin-right: 10px;" size="" :clearable="true">
        <el-option v-for="item in ListSelectIssue" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.reservation" placeholder="是否需要预约眼科专家" style="width: 210px; margin-right: 10px;" size="" :clearable="true">
        <el-option v-for="item in ListSelectReservation" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
    </div>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="参赛姓名"> </el-table-column>
      <el-table-column prop="age" label="参赛年龄"> </el-table-column>
      <el-table-column prop="telephone" label="参赛电话"> </el-table-column>
      <el-table-column prop="groupType" label="所属赛组"> </el-table-column>
      <el-table-column prop="city" label="所在地市"> </el-table-column>
      <el-table-column prop="issue" label="眼健康需求"> </el-table-column>
      <el-table-column prop="reservation" label="是否需要预约眼科专家"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page> </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ListSelectGroup: [
        {
          code: "0",
          value: "高校组"
        },
        {
          code: "1",
          value: "专业组"
        },
        {
          code: "2",
          value: "公众组"
        },
        {
          code: "3",
          value: "青少年组"
        }
      ],
      ListSelectCity: [
        {
          code: "0",
          value: "石家庄市"
        },
        {
          code: "1",
          value: "邯郸市"
        },
        {
          code: "2",
          value: "保定市"
        },
        {
          code: "3",
          value: "张家口市"
        },
        {
          code: "4",
          value: "承德市"
        },
        {
          code: "5",
          value: "唐山市"
        },
        {
          code: "6",
          value: "廊坊市"
        },
        {
          code: "7",
          value: "沧州市"
        },
        {
          code: "8",
          value: "衡水市"
        },
        {
          code: "9",
          value: "邢台市"
        },
        {
          code: "10",
          value: "秦皇岛市"
        }
      ],
      ListSelectIssue: [
        {
          code: "0",
          value: "儿童青少年近视问题"
        },
        {
          code: "1",
          value: "年轻人近视手术问题"
        },
        {
          code: "2",
          value: "中老年白内障、青光眼问题"
        },
        {
          code: "3",
          value: "眼干眼涩干眼问题"
        },
        {
          code: "4",
          value: "各种眼底病及其他眼科问题"
        }
      ],
      ListSelectReservation: [
        {
          code: "1",
          value: "是"
        },
        {
          code: "0",
          value: "否"
        }
      ],
      List: [],
      query: {
        name: "",
        group: "",
        city: "",
        issue: "",
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false
    };
  },
  mounted() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    handleRefreshList: function() {
      this.getList();
    },
    getList() {
      this.loading = true;
      let _this = this;
      this.axios
        .post("/api/aierSignup/getListByPage", this.query)
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.List = response.data.data;
            _this.List.forEach((e, i) => {
              e.groupType = _this.ListSelectGroup.find(p => p.code === e.groupType).value;
              e.city = _this.ListSelectCity.find(p => p.code === e.city).value;
              e.issue = _this.ListSelectIssue.find(p => p.code === e.issue).value;
              e.reservation = _this.ListSelectReservation.find(p => p.code === e.reservation).value;
            });
            _this.List.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());
            _this.total = response.data.count;
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: "查询失败",
            type: "warning"
          });
        });
    },
    handleSizeChange: function(val) {
      this.query.limit = val;
      this.getList();
    },
    handleCurrentChange: function(val) {
      this.query.page = val;
      this.getList();
    }
  }
};
</script>
