<template>
  <div style="padding: 20px;">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品导入</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-bottom: 20px;">
      <el-upload class="upload-demo" ref="upload" :action="action" :auto-upload="false" :headers="header" :on-success="handleSuccess" :on-error="handleError" :before-upload="handleBeforeUpload">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
        <div slot="tip" class="el-upload__tip">点击‘选取文件’按钮从本地选取Excel文件，然后点击‘导入’即可完成作品导入，只能上传xls,xlsx文件</div>
      </el-upload>
    </el-card>

    <div>
      <el-select
        v-model="query.school"
        placeholder="全部"
        @change="
          query.page = 1;
          getList();
        "
        style="width: 200px; margin-right: 10px;"
      >
        <el-option v-for="(item, index) in SchoolOptionList" :key="item + index" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>
    </div>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="wno" label="作品编号"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别" width="120"> </el-table-column>
      <el-table-column prop="worksSeriesName" label="命题名称"> </el-table-column>
      <el-table-column prop="author1" label="作者"> </el-table-column>
      <el-table-column prop="tuname" label="指导教师"> </el-table-column>
      <el-table-column prop="school" label="学校"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleUpload(scope.row)" type="text" size="small" v-if="false">上传作品附件</el-button>
          <el-button @click="handleShow(scope.row)" type="text" size="small" v-show="scope.row.frontShow == 0" v-if="false">设为前台展示</el-button>
          <el-button @click="handleUnshow(scope.row)" type="text" size="small" v-show="scope.row.frontShow == 1" v-if="false">取消前台展示</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" hide-on-single-page> </el-pagination>

    <el-drawer title="查看作品" :visible.sync="view_drawer" direction="rtl" size="50%" :destroy-on-close="true">
      <jinx-works-viewer :wid="view_wid" ref="WorksViewer"></jinx-works-viewer>
    </el-drawer>
    <el-drawer title="上传作品附件" :visible.sync="file_upload_drawer" direction="rtl" size="50%" :destroy-on-close="true">
      <jinx-works-file-upload :wid="file_upload_wid" ref="WorksFileLoad"></jinx-works-file-upload>
    </el-drawer>
  </div>
</template>

<script>
import qs from "qs";
import JinxWorksViewer from "./components/JinxWorksViewer.vue";
import JinxWorksFileUpload from "./components/JinxWorksFileUpload.vue";

export default {
  components: { JinxWorksViewer, JinxWorksFileUpload },
  data() {
    return {
      action: this.$ImagePostServer + "/gameWorks3/excelImport",
      header: {
        "lw-token": this.$store.state.Token
      },
      List: [],
      SchoolOptionList: [],
      query: {
        school: "",
        page: 1,
        limit: 10
      },
      total: 0,
      loading: false,
      view_drawer: false,
      view_wid: -1,
      file_upload_drawer: false,
      file_upload_wid: -1
    };
  },
  mounted() {
    this.getSchool();
    this.getList();
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleBeforeUpload(file) {
      if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
        this.$message.error(`请选择Excel文件上传`);
        return false;
      }
      return true;
    },
    handleSuccess: function(response, file, fileList) {
      console.log(response);
      if (response.code == 0) {
        this.$message({
          showClose: true,
          message: response.data,
          type: "info"
        });
      } else {
        this.$message({
          showClose: true,
          message: `${file.name} 上传失败`,
          type: "error"
        });
      }
    },
    handleError: function(err, file, fileList) {
      console.log(err);
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
      });
    },
    getSchool() {
      let that = this;
      this.SchoolOptionList = [{ label: "全部", value: "" }];
      this.axios
        .post("/api/gameWorks3/getSchool")
        .then(function(response) {
          if (response && response.data.code == "0") {
            console.log(response.data.data);
            let data = response.data.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].school) {
                that.SchoolOptionList.push({
                  label: data[i].school,
                  value: data[i].school
                });
              }
            }
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "获取学校列表失败",
            type: "warning"
          });
        });
    },
    handleRefreshList: function() {
      this.getList();
    },
    getList() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameWorks3/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.List = response.data.data;
            that.List.forEach(p => {
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
            });
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
    handleView: function(data) {
      this.view_wid = data.wid;
      this.view_drawer = true;
    },
    handleDelete: function(data) {
      this.$confirm("确认删除？")
        .then(_ => {
          let that = this;
          this.axios
            .post("/api/gameWorks3/delete", qs.stringify({ wid: data.wid }))
            .then(function(response) {
              if (response && response.data.code == "0") {
                that.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                that.getList();
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.msg,
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
        })
        .catch(_ => {});
    },
    handleUpload: function(data) {
      this.file_upload_wid = data.wid;
      this.file_upload_drawer = true;
    },
    handleShow: function(data) {
      let that = this;
      let model = {
        wid: data.wid,
        frontShow: 1
      };
      this.axios
        .post("/api/gameWorks3/setFrontShow", qs.stringify(model))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "设置成功",
              type: "warning"
            });
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.getList();
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "设置失败",
            type: "warning"
          });
        });
    },
    handleUnshow: function(data) {
      let that = this;
      let model = {
        wid: data.wid,
        frontShow: 0
      };
      this.axios
        .post("/api/gameWorks3/setFrontShow", qs.stringify(model))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "设置成功",
              type: "warning"
            });
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.getList();
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "设置失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style>
:focus {
  outline: 0;
}
</style>

<style lang="less" scoped>
/deep/ .el-card {
  margin-top: 20px;
}

/deep/ .el-drawer {
  overflow-y: scroll;
}
</style>
