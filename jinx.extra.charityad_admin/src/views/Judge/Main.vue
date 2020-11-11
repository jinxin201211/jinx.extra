<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>评委管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-select v-model="query.role" placeholder="角色" style="width: 150px; margin-right: 10px;" size="">
        <el-option v-for="item in SelectRole" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.worksType" placeholder="作品类别" style="width: 150px; margin-right: 10px;" size="">
        <el-option v-for="item in SelectWorksType" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.type" placeholder="用户组" style="width: 150px; margin-right: 10px;" size="">
        <el-option v-for="item in SelectType" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-select v-model="query.groupLeader" placeholder="是否小组长" style="width: 150px; margin-right: 10px;" size="">
        <el-option v-for="item in SelectGroupLeader" :key="item.code" :label="item.value" :value="item.code"> </el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
      <el-button @click="handleAdd">添加评委</el-button>
    </div>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="uname" label="用户名"> </el-table-column>
      <el-table-column prop="tel" label="手机号码"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <!--<el-table-column prop="series" label="作品主题"> </el-table-column>-->
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="type" label="用户组"> </el-table-column>
      <el-table-column prop="groupLeader" label="是否小组长"> </el-table-column>
      <el-table-column prop="ctime" label="创建时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page> </el-pagination>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      SelectRole: [
        { code: "", value: "全部角色" },
        { code: "judge", value: "裁判" },
        { code: "admin", value: "管理员" }
      ],
      SelectWorksType: [{ code: "", value: "全部作品类别" }, ...this.$WorksTypeCode],
      SelectType: [{ code: "", value: "全部用户组" }, ...this.$UserType],
      SelectGroupLeader: [
        { code: "", value: "是否小组长" },
        { code: "1", value: "是" },
        { code: "0", value: "否" }
      ],
      List: [],
      query: {
        role: "judge",
        worksType: "",
        type: "",
        groupLeader: "",
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false
      // SeriesCode: [
      //   { code: "A", name: "中国梦系列" },
      //   { code: "B", name: "营商环境系列" },
      //   { code: "C", name: "生态保护系列" },
      //   { code: "D", name: "传统文化系列" },
      //   { code: "E", name: "社会热点系列" },
      //   { code: "F", name: "其他主题" }
      // ]
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
      let that = this;
      this.axios
        .post("/api/sysUser/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.List.forEach((e, i) => {
              // let series = that.$WorksSeriesCode.find(p => p.code == e.series);
              // if (series != null) {
              //   e.series = series.value;
              // } else {
              //   e.series = "/";
              // }
              let works_type = that.$WorksTypeCode.find(p => p.code == e.worksType);
              if (works_type != null) {
                e.worksType = works_type.value;
              } else {
                e.worksType = "/";
              }
              let type = that.$UserType.find(p => p.code == e.type);
              if (type != null) {
                e.type = type.value;
              } else {
                e.type = "/";
              }
              e.groupLeader = e.groupLeader === "1" ? "是" : "否";
            });
            that.List.sort((a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime());
            that.total = response.data.count;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
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
    handleSizeChange: function(val) {
      this.query.limit = val;
      this.getList();
    },
    handleCurrentChange: function(val) {
      this.query.page = val;
      this.getList();
    },
    handleAdd: function() {
      this.$router.push("addjudge");
    },
    handleEdit: function(data) {
      this.$router.push({
        path: "/editjudge",
        query: {
          uid: data.uid
        }
      });
    },
    handleDelete: function(data) {
      this.$confirm("此操作将删除该评委, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteData(data);
        })
        .catch(e => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteData: function(data) {
      let that = this;
      this.axios
        .post("/api/sysUser/delete", qs.stringify({ uid: data.uid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              type: "success",
              message: "删除成功!"
            });
            that.getList();
          } else {
            that.$message({
              showClose: true,
              message: "删除失败",
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "删除失败",
            type: "warning"
          });
        });
    }
  }
};
</script>
