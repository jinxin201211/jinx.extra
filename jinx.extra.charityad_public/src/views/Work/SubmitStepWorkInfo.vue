<template>
  <div class="submit">
    <el-steps :active="active" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写基本资料"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div>
      <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px; margin: 0 auto;">
        <el-form-item label="赛区">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option v-for="item in RegionList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属专业"
          prop="major"
          :rules="[
            { required: true, message: '请输入所属专业', trigger: 'blur' },
            { min: 0, max: 100, message: '最多 100 个字符', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.major" maxlength="100"></el-input>
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
        <el-form-item label="命题类别">
          <el-radio-group v-model="form.topic_type">
            <el-radio label="A">A平面类</el-radio>
            <el-radio label="Ba">Ba视频类影视广告</el-radio>
            <el-radio label="Bb">Bb视频类微电影广告</el-radio>
            <el-radio label="Bc">Bc视频类短视频</el-radio>
            <el-radio label="C">C动画类</el-radio>
            <el-radio label="D">D互动类</el-radio>
            <el-radio label="E">E广播类</el-radio>
            <el-radio label="F">F策划室类</el-radio>
            <el-radio label="Ga">Ga文案类广告语</el-radio>
            <el-radio label="Gb">Gb文案类长文案</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="命题名称" prop="topic_name" :rules="[{ required: true, message: '请选择命题名称', trigger: 'blur' }]">
          <el-select v-model="form.topic_name" placeholder="请选择">
            <el-option v-for="item in TopicNameList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创意概述">
          <el-input type="textarea" maxlength="200" show-word-limit v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item label="素材来源">
          <el-select v-model="form.source" placeholder="请选择">
            <el-option v-for="item in SourceList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要承诺">
          <span style="color: red; font-size: 24px;">我承诺，本作品未抄袭其他已发布的作品，也未参加其他赛事。</span>
        </el-form-item>
      </el-form>
    </div>

    <el-divider></el-divider>
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
      active: 1,
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
      RegionList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      TopicNameList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      SourceList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
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
          // this.wid = "123456";
          // this.disabled = true;
          // this.$router.push({
          //   // path: "/work/authorinfo",
          //   name: "authorinfo",
          //   params: { wid: this.wid }
          // });
          this.submit(); //todo
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
            that.$router.push({
              name: "authorinfo",
              params: { wid: that.wid }
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
