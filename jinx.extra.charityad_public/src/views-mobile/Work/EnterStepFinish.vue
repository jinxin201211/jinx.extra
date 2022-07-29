<template>
  <div>
    <van-nav-bar title="作品提交" left-arrow @click-left="$router.go(-1)" />
    <div class="submit">
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 300px">
        <i class="el-icon-success" style="font-size: 84px; color: #67c23a; margin-bottom: 30px;"></i>
        <span>提交成功</span>
      </div>

      <div style="text-align: center;">
        <el-button type="primary" @click="$router.replace('/m/competitor/works')">结束提交</el-button>
      </div>
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
  padding: 15px;
}
</style>
