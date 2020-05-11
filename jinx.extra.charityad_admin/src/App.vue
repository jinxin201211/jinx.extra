<template>
  <div id="app"><router-view v-if="isRouterAlive" /></div>
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
  mounted: function() {
    this.$store.commit("syncAccount");
    // if (this.$cookies.isKey("account") && this.$cookies.isKey("token")) {
    //   let account = this.$cookies.get("account");
    //   let token = this.$cookies.get("token");
    //   this.$store.commit("changeAccount", { Token: token, Account: account });
    //   this.$cookies.set("token", token, 60 * 60 * 24 * 7);
    //   this.$cookies.set("account", account, 60 * 60 * 24 * 7);
    // }
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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "微软雅黑", "simhei", "黑体", "Microsoft JhengHei", "华文细黑", "STHeiti", "MingLiu", "SimSun", Arial, Helv, Helvetica, sans-serif;
  font-size: 14px;
}

#app {
  height: 100%;
  width: 100%;
}

a {
  color: #333;
  text-decoration: none;
}
</style>
