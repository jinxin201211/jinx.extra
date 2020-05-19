<template>
  <div class="submit">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="3" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写报名表"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div style="text-align: center;"><i class="el-icon-success" style="font-size: 36px; display: inline-block; vertical-align: middle;"></i><span>提交成功</span></div>

    <el-divider></el-divider>
    <div style="text-align: center;">
      <el-button type="primary" @click="$router.replace('/')">结束提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.submit {
  width: @typical-width;
  margin: 20px auto;
}
</style>
