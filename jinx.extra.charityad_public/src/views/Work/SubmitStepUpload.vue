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
      <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">文件上传要求：</div>
      <p><b>A平面类作品上传要求</b></p>
      <p>一件作品最多上传3个jpg文件（每个路径传一个文件）</p>
      <p>单个文件不大于4Mb</p>
      <p>作品规格为A3(297x420mm)不限横竖版，色彩模式RGB，分辨率300dpi。</p>
      <p>（如“上传文件”按钮无法正常显示，请更换浏览器再次登录上传文件，建议使用谷歌浏览器或IE浏览器）</p>

      <el-divider></el-divider>

      <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">上传作品文件：</div>
      <el-upload class="upload-demo" ref="upload" :action="action" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="handleSuccess" :on-error="handleError" :limit="3" :multiple="true" :on-exceed="handleExceed" :data="param" acc>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10Mb</div>
      </el-upload>
    </div>

    <el-divider></el-divider>

    <div style="text-align: center;">
      <el-button type="primary" @click="handleSubmit">提交本作品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: 2,
      fileList: [],
      successList: [],
      param: {
        wid: this.$route.query.wid
      },
      action: window.$FileUploadServer + "/gameWorksFile/upload"
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.successList.splice(this.successList.indexOf(file), 1);
    },
    handlePreview(file) {},
    handleSuccess: function(response, file, fileList) {
      this.successList.push(file);
      this.successList.sort((a, b) => a.uid - b.uid);
    },
    handleError: function(err, file, fileList) {
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
      });
    },
    handleExceed: function() {
      this.$message({
        showClose: true,
        message: `超出文件个数限制`,
        type: "error"
      });
    },
    handleSubmit: function() {
      if (this.successList.length == 0) {
        this.$message({
          showClose: true,
          message: `请至少选择一个文件后再提交`,
          type: "warning"
        });
      }
      // let data = [];
      // for (let i = 0; i < this.successList.length; i++) {}
      this.$router.replace("/work/submit");
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
