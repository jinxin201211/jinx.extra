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

    <el-button @click="handleRefreshList" :loading="loading">刷新列表</el-button>

    <el-table :data="List" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <!--<el-table-column prop="area" label="赛区"> </el-table-column>-->
      <el-table-column prop="wno" label="作品编号"> </el-table-column>
      <el-table-column prop="worksName" label="作品名称"> </el-table-column>
      <!--<el-table-column prop="gameType" label="参赛组别"> </el-table-column>
      <el-table-column prop="worksSeries" label="作品主题"> </el-table-column>
      <el-table-column prop="worksType" label="作品类别"> </el-table-column>
      <el-table-column prop="scoreTotal" label="评审结果"> </el-table-column>
      <el-table-column prop="scoreTotal" label="得分"> </el-table-column>-->
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
      query: {
        // role: "judge",
        // gameType: 4,
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
    this.getList();
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleBeforeUpload(file) {
      // console.log(file);
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
      // file.serverid = response.data;
      // this.successList.push(file);
      // this.successList.sort((a, b) => a.uid - b.uid);
    },
    handleError: function(err, file, fileList) {
      console.log(err);
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
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
              // let game_type = that.$WorksGroupCode.find(x => x.code == p.gameType);
              // p.gameType = game_type == null ? "" : game_type.value;
              // let series = that.$WorksSeriesCode.find(x => x.code == p.worksSeries);
              // p.worksSeries = series == null ? "" : series.value;
              let type = that.$WorksTypeCode.find(x => x.code == p.worksType);
              p.worksType = type == null ? "" : type.value;
              let source = that.$MaterialSurceCode.find(x => x.code == p.materialSurce);
              p.materialSurce = source == null ? "" : source.value;
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
