<template>
  <div class="jinx-layout">
    <div class="jinx-header">
      <div style="padding: 0 20px; float: left; line-height: 60px; font-weight: bold; font-size: 24px;">全国平面公益广告大赛</div>
      <div style="float: right;">
        <el-menu mode="horizontal" default-active="1">
          <el-submenu index="1">
            <template slot="title"><span v-text="User.uname"></span></template>
            <el-menu-item @click="dialogTableVisible = true">修改密码</el-menu-item>
            <el-menu-item @click="handleSignout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="jinx-side">
      <el-menu :default-active="active" background-color="#333333" text-color="#fff" active-text-color="#ffd04b" @select="handleMenuSelect">
        <el-menu-item index="1">
          <span slot="title">评委管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">日志管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">发布新闻</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">发布公告</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">作品打分</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="jinx-body">
      <router-view></router-view>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
      <jinx-reset-password @closeDialog="dialogTableVisible = false"></jinx-reset-password>
    </el-dialog>
  </div>
</template>

<script>
import JinxResetPassword from "@/components/JinxResetPassword.vue";

export default {
  name: "Home",
  components: { JinxResetPassword },
  data() {
    return {
      active: "",
      RouteList: ["/judge", "/log", "/news", "/announcement"],
      User: this.$store.getters.getUser,
      dialogTableVisible: false
    };
  },
  mounted() {
    if (this.$route.path === "/") {
      this.$router.replace(this.RouteList[0]);
    }
    if (this.RouteList.indexOf(this.$route.path) != -1) {
      this.active = this.RouteList.indexOf(this.$route.path) + 1 + "";
    }
  },
  methods: {
    handleMenuSelect: function(index) {
      this.$router.replace(this.RouteList[index * 1 - 1]);
    },
    handleSignout: function() {
      let that = this;
      this.axios
        .post("/api/sysUser/logout")
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$store.commit("resetAccount");
            that.$router.replace("/login");
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
            message: "退出失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
@side-width: 220px;
@header-height: 60px;
.jinx-layout {
  height: 100%;
  width: 100%;
  background: #f1f2f3;
  position: relative;
  padding-top: @header-height;
  padding-left: @side-width;
  box-sizing: border-box;
}
.jinx-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background: #ffffff;
  box-sizing: border-box;
  color: #000000;
  z-index: 2;
}
.jinx-side {
  position: absolute;
  top: 0;
  left: 0;
  width: @side-width;
  height: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background: #000000;
  padding-top: @header-height;
  box-sizing: border-box;
  z-index: 1;
}
.jinx-body {
  height: 100%;
  width: 100%;
  background: #ffffff;
  overflow-y: auto;
}
.jinx-body::-webkit-scrollbar {
  width: 6px;
  height: 1px;
}
.jinx-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #d7d8d9;
}
.jinx-body::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background: #f1f2f3;
}
.jinx-body::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  // border-radius: 10px;
  // background: #ededed;
}

.el-menu {
  height: 100%;
  border: none;
}
</style>
