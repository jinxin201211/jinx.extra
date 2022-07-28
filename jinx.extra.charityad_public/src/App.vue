<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created: function() {
    this.$store.commit("syncAccount");
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "微软雅黑", "simhei", "黑体", "Microsoft JhengHei", "华文细黑", "STHeiti", "MingLiu", "SimSun", Arial, Helv, Helvetica, sans-serif;
  font-size: 14px;
}

a {
  color: #333;
  text-decoration: none;
}
</style>
