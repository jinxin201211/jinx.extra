<template>
  <div style="padding: 20px; padding-bottom: 40px; position: relative; height: 100%; box-sizing: border-box;">
    <el-page-header @back="handleBack" content="编辑新闻" style="margin-bottom: 20px;"> </el-page-header>
    <div style="margin-top: 20px;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>
      </el-form>
      <jinx-wang-editor :isClear="isClear" @change="handleEditorChange" :value="form.content"></jinx-wang-editor>
    </div>
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; text-align: center; padding: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 5px 0px; background: #ffffff;">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import JinxWangEditor from "@/components/JinxWangEditor.vue";
import qs from "qs";

export default {
  data() {
    return {
      isClear: false,
      form: {
        id: -1,
        title: "#迪士尼确认花木兰档期#",
        subTitle: "",
        content: "",
        type: "1",
        state: "1"
      }
    };
  },
  components: { JinxWangEditor },
  mounted() {
    let that = this;
    this.axios
      .get("/api/gameNews/getOne", { params: { id: this.$route.query.id } })
      .then(function(response) {
        if (response && response.data.code == "0") {
          that.form.id = response.data.data.id;
          that.form.title = response.data.data.title;
          that.form.subTitle = response.data.data.subTitle;
          that.form.content = response.data.data.content;
          that.form.type = response.data.data.type;
          that.form.state = response.data.data.state;
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
          message: "获取新闻失败",
          type: "warning"
        });
      });
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
    },
    handleEditorChange: function(val) {
      this.form.content = val;
    },
    handleSubmit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.content === null || this.form.content === "") {
            this.$confirm("新闻内容为空, 确认提交?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.submit();
              })
              .catch(() => {});
          } else {
            this.submit();
          }
        } else {
          this.$message("验证失败");
          return false;
        }
      });
    },
    submit: function() {
      let that = this;
      this.axios
        .post("/api/gameNews/edit", qs.stringify(this.form))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            that.$router.go(-1);
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
            message: "提交失败",
            type: "warning"
          });
        });
    }
  }
};
</script>
