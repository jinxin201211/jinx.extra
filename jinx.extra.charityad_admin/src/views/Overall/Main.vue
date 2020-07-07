<template>
  <div style="padding: 20px;">
    <div style="margin-bottom: 20px;">
      <el-button class="jinx-radio-button" v-if="type !== 0" @click="type = 0" size="small">注册量统计</el-button>
      <el-button class="jinx-radio-button" type="primary" v-if="type === 0" size="small">注册量统计</el-button>
      <el-button class="jinx-radio-button" v-if="type !== 1" @click="type = 1" size="small">作品量统计(根据作品类别)</el-button>
      <el-button class="jinx-radio-button" type="primary" v-if="type === 1" size="small">作品量统计(根据作品类别)</el-button>
      <el-button class="jinx-radio-button" v-if="type !== 2" @click="type = 2" size="small">作品量统计(根据参赛组别)</el-button>
      <el-button class="jinx-radio-button" type="primary" v-if="type === 2" size="small">作品量统计(根据参赛组别)</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 0
    };
  },
  watch: {
    type() {
      if (this.type === 2) {
        this.$router.replace("/overall/uploadbyusertype");
      } else if (this.type === 1) {
        this.$router.replace("/overall/uploadbyworktype");
      } else {
        this.$router.replace("/overall/registration");
      }
    }
  },
  created() {
    let children_routes = ["Registration", "UploadByWorkType", "UploadByUserType"];
    this.type = children_routes.indexOf(this.$route.name);
    if (this.type === 2) {
      this.$router.replace("/overall/uploadbyusertype");
    } else if (this.type === 1) {
      this.$router.replace("/overall/uploadbyworktype");
    } else {
      this.$router.replace("/overall/registration");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .jinx-radio-button {
  border-radius: 0;
  border: none;
}
/deep/ .jinx-radio-button.el-button--default {
  background: #f3f5f7;
}
</style>
