<template>
  <div class="submit">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="active" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写基本资料"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div>承诺书</div>
    <div style="text-align: center;">
      <el-checkbox name="agree" v-model="agree">勾选同意<el-link @click.stop.prevent="">《承诺书》</el-link></el-checkbox>
    </div>

    <el-divider></el-divider>
    <div style="text-align: center;">
      <el-button type="primary" @click="$router.replace('/work/workinfo')" :disabled="!agree">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: 0,
      agree: false
    };
  }
};
</script>

<style lang="less" scoped>
.submit {
  width: @typical-width;
  margin: 20px auto;
}
</style>
