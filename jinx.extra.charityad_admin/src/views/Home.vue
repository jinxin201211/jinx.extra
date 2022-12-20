<template>
  <div class="jinx-layout">
    <div class="jinx-header">
      <div style="padding: 0 20px; float: left; line-height: 60px; font-weight: bold; font-size: 24px;">{{ $WebSiteName }}</div>
      <div style="float: right;">
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item @click="handleFullscreen"><i class="el-icon-full-screen"></i></el-menu-item>
          <el-menu-item @click="routerViewKey = routerViewKey + 1"><i class="el-icon-refresh-right"></i></el-menu-item>
          <el-submenu index="1">
            <template slot="title"><span v-text="User.uname"></span></template>
            <el-menu-item @click="dialogTableVisible = true">修改密码</el-menu-item>
            <el-menu-item @click="handleSignout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="jinx-side">
      <el-menu :default-active="active" @select="handleMenuSelect" class="jinx-custom-menu red">
        <el-menu-item :index="item.path" v-for="(item, index) in RouteList" :key="'menu' + index">
          <span slot="title" v-text="item.title"></span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="jinx-body">
      <router-view :key="routerViewKey"></router-view>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true" width="540px">
      <jinx-reset-password @closeDialog="dialogTableVisible = false"></jinx-reset-password>
    </el-dialog>
  </div>
</template>

<script>
import JinxResetPassword from "@/components/JinxResetPassword.vue";
import screenfull from "screenfull";

export default {
  name: "Home",
  components: { JinxResetPassword },
  data() {
    return {
      active: "",
      FullRouteList: [
        { path: "/overall", access: ["admin"], title: "数据统计" },
        { path: "/judge", access: ["admin"], title: "评委管理" },
        { path: "/config", access: ["admin"], title: "系统配置" },
        { path: "/log", access: ["admin"], title: "日志管理" },
        { path: "/news", access: ["admin"], title: "发布新闻" },
        { path: "/announcement", access: ["admin"], title: "发布公告" },
        { path: "/workimport", access: ["admin"], title: "作品导入" },
        { path: "/workregular", access: ["judge", "leader", "audit", "preaudit", "rankaudit"], title: "评审办法" },
        { path: "/score/round0", access: ["admin"], title: "作品合规检查" },
        { path: "/score/round1", access: ["judge", "leader"], title: "作品打分(第一轮)" },
        { path: "/score/round2", access: ["judge", "leader"], title: "作品打分(第二轮)" },
        { path: "/score/round3", access: ["judge", "leader"], title: "作品打分(第三轮)" },
        { path: "/score/rank", access: ["judge", "leader", "audit"], title: "获奖查询" },
        { path: "/score/prerank", access: ["preaudit"], title: "获奖查询" },
        { path: "/score/auditrank", access: ["rankaudit"], title: "获奖查询" },
        { path: "/score/progress", access: ["admin"], title: "评审进度" }
        // { path: "/workrank", access: ["judge"], title: "作品排行" }
      ],
      RouteList: [],
      User: this.$store.state.User,
      dialogTableVisible: false,
      routerViewKey: 0
    };
  },
  mounted() {
    let role = this.User.role;
    this.RouteList = this.FullRouteList.filter(p => p.access.includes(role));
    if (this.$route.path === "/") {
      this.$router.replace(this.RouteList[0]);
    }

    if (this.$route.path != "/") {
      this.active = this.$route.meta.menu || this.$route.path;
    }
  },
  methods: {
    handleMenuSelect: function(index) {
      this.$router.replace(index);
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
    },
    handleFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "您的浏览器不支持全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  background: #ffffff;
  box-sizing: border-box;
  color: #000000;
  z-index: 999;
}
.jinx-side {
  position: absolute;
  top: 0;
  left: 0;
  width: @side-width;
  height: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
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

.el-menu {
  border: none;
}

@theme-blue-bg-color: #03152a;
@theme-blue-bg-color-active: #3b9eff;
@theme-blue-color: #eeeeee;
@theme-blue-color-active: #ffffff;
.el-menu.jinx-custom-menu.blue {
  height: 100%;
  border: none;
  background: @theme-blue-bg-color;

  .el-menu-item {
    background: @theme-blue-bg-color;
    color: @theme-blue-color;
  }
  .el-menu-item:hover {
    background: lighten(@theme-blue-bg-color-active, 10%);
    color: @theme-blue-color-active;
  }

  .el-menu-item.is-active {
    background: @theme-blue-bg-color-active;
    color: @theme-blue-color-active;
  }
}

@theme-green-bg-color: #28333e;
@theme-green-bg-color-active: #009688;
@theme-green-color: #eeeeee;
@theme-green-color-active: #ffffff;
.el-menu.jinx-custom-menu.green {
  height: 100%;
  // border: none;
  background: @theme-green-bg-color;

  .el-menu-item {
    background: @theme-green-bg-color;
    color: @theme-green-color;
  }
  .el-menu-item:hover {
    background: lighten(@theme-green-bg-color-active, 10%);
    color: @theme-green-color-active;
  }

  .el-menu-item.is-active {
    background: @theme-green-bg-color-active;
    color: @theme-green-color-active;
  }
}

@theme-red-bg-color: #303132;
@theme-red-bg-color-active: #c71d26;
@theme-red-color: #eeeeee;
@theme-red-color-active: #ffffff;
.el-menu.jinx-custom-menu.red {
  height: 100%;
  // border: none;
  background: @theme-red-bg-color;

  .el-menu-item {
    background: @theme-red-bg-color;
    color: @theme-red-color;
  }
  .el-menu-item:hover {
    background: darken(@theme-red-bg-color-active, 10%);
    color: @theme-red-color-active;
    // box-shadow: 0 0 2px rgba(0, 0, 0, 0.9) inset;
  }

  .el-menu-item.is-active {
    background: @theme-red-bg-color-active;
    color: @theme-red-color-active;
    // box-shadow: 0 0 2px rgba(0, 0, 0, 0.9) inset;
  }
}
</style>
