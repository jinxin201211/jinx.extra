<template>
  <div class="submit">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="1" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写报名表"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-form ref="form" :model="form" label-width="120px" style="padding: 0 20px; margin: 30px auto;">
      <el-card>
        <div slot="header" style="text-align: center;">
          <span>2020河北省公益广告大赛作品征集报名表（高校类）</span>
        </div>
        <el-form-item label="作品编号">
          <el-input v-model="form.major" maxlength="100" readonly disabled></el-input>
        </el-form-item>
        <el-form-item
          label="作品名称"
          prop="name"
          :rules="[
            { required: true, message: '请输入作品名称', trigger: 'blur' },
            { min: 0, max: 200, message: '最多 200 个字符', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.name" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="作品类别">
          <el-row>
            <el-col :span="12">
              <el-radio-group v-model="form.topic_type">
                <el-radio label="A">A:中国梦系列</el-radio>
                <el-radio label="B">B:营商环境系列</el-radio>
                <el-radio label="C">C:生态保护系列</el-radio>
                <el-radio label="D">D:传统文化系列</el-radio>
                <el-radio label="E">E:社会热点系列</el-radio>
                <el-radio label="F">F:其他主题</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-radio-group v-model="form.topic_type">
                <el-radio label="1">1:平面类</el-radio>
                <el-radio label="2">2:文案类</el-radio>
                <el-radio label="3">3:广播类</el-radio>
                <el-radio label="4">4:视频类</el-radio>
                <el-radio label="5">5:动画类</el-radio>
                <el-radio label="6">6:互动类</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作品素材来源">
          <el-radio-group v-model="form.topic_type">
            <el-radio label="0">我保重此作品是我的原创</el-radio>
            <el-radio label="1">我使用了素材</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="作者姓名" prop="topic_name" :rules="[{ required: true, message: '请选择命题名称', trigger: 'blur' }]">
          <div>
            <el-input v-model="form.name" maxlength="200" style="width: 150px;"><template slot="prepend">1</template></el-input>
            <el-input v-model="form.name" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">2</template></el-input>
            <el-input v-model="form.name" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">3</template></el-input>
            <el-input v-model="form.name" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">4</template></el-input>
            <el-input v-model="form.name" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">5</template></el-input>
          </div>
        </el-form-item>
        <el-card style="margin: 20px;" shadow="never">
          <div slot="header" style="text-align: center;">
            <span>第一作者联系方式</span>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属单位">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效通讯地址">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin: 20px;" shadow="never">
          <div slot="header" style="text-align: center;">
            <span>指导老师信息</span>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属单位">
                <el-input v-model="form.name" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin: 20px;" shadow="never">
          <div slot="header" style="text-align: center;">
            <span>作品创意说明</span>
          </div>
          <el-input type="textarea" maxlength="2000" show-word-limit v-model="form.summary"></el-input>
        </el-card>
      </el-card>
    </el-form>

    <div style="text-align: center;">
      <el-button type="primary" @click="handleNextStep" :loading="loading" :disabled="disabled">下一步</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      form: {
        // region: "",
        // major: "",
        // name: "",
        // topic_type: "",
        // topic_name: "",
        // summary: "",
        // source: ""
        region: "选项1",
        major: "专业",
        name: "名称",
        topic_type: "Ba",
        topic_name: "选项1",
        summary: "概述",
        source: "选项3"
      },
      loading: false,
      disabled: false,
      wid: ""
    };
  },
  mounted: function() {},
  methods: {
    handleNextStep: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.wid = "123456";
          this.disabled = true;
          this.$router.replace({
            path: "/work/file",
            query: { wid: this.wid }
            // name: "authorinfo",
            // params: { wid: this.wid }
          });
          // this.submit(); //todo
        } else {
          return false;
        }
      });
    },
    submit: function() {
      this.loading = true;
      let that = this;
      let data = {
        area: this.form.region,
        creativeOverview: this.form.summary,
        major: this.form.major,
        materialSurce: this.form.source,
        propositionName: this.form.topic_name,
        propositionType: this.form.topic_type,
        worksName: this.form.name
      };
      this.axios
        .post("/api/gameWorks/add", qs.stringify(data))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.wid = response.data.data;
            that.disabled = true;
            that.$router.replace({
              path: "/work/file",
              query: { wid: that.wid }
              // name: "authorinfo",
              // params: { wid: this.wid }
            });
          } else {
            that.$message({
              showClose: true,
              message: "提交失败",
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

<style lang="less" scoped>
.submit {
  width: @typical-width;
  margin: 20px auto;
}
</style>
