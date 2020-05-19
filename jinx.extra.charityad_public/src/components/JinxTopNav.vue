<template>
  <div class="jinx-header">
    <div class="jinx-base_inner">
      <div class="float">
        <span><a href="#" @click.stop.prevent="handleAddFavorite">加入收藏</a></span>
        <span><a @click="scrollToSection('anchor_contact_us')" style="cursor: pointer;">联系我们</a></span>
      </div>
      <div class="float_right" v-if="(account == null || account == '') && authorize">
        <span>
          <router-link to="/account/signin">登录</router-link>
        </span>
        <span>|</span>
        <span>
          <router-link to="/account/signup">注册</router-link>
        </span>
      </div>
      <div class="float_right" v-if="account != null && account != '' && authorize">
        <span>
          <router-link to="/">获奖查询</router-link>
        </span>
        <span>|</span>
        <span>
          <router-link to="/work">作品提交</router-link>
        </span>
        <span>|</span>
        <span v-text="account + '，您好！'"></span>
        <span>|</span>
        <span><a @click="handleSignOut" href="#">退出</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["authorize"],
  data() {
    return {
      account: this.$store.state.Account
    };
  },
  mounted() {
    console.log("--------------JinxTopNav----------------");
    console.log(this.$store.state.Account);
    // console.log("JinxTopNav");
    // console.log(this.login);
  },
  inject: ["reload"],
  methods: {
    handleAddFavorite: function() {
      const sURL = window.location;
      const sTitle = document.title;
      try {
        window.external.addFavorite(sURL, sTitle);
      } catch (e) {
        try {
          window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
          this.$alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
      }
    },
    handleSignOut: function() {
      this.$store.commit("resetAccount");
      this.$store.commit("removeCookie");
      this.reload();
    },
    scrollToSection(path) {
      this.$emit("scrolltoview", path);
      // let section = document.getElementById(path);
      // if (section) {
      //   section.scrollIntoView({ behavior: "smooth" });
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-header {
  min-width: @typical-width;
  height: 42px;
  background: #000000;
  width: 100%;

  & > div {
    line-height: 42px;
    margin: 0 auto;
    width: @typical-width;
    span {
      display: inline-block;
    }
  }

  a {
    color: #fff;
  }

  span {
    color: #fff;
    padding: 0 14px;
  }
}

.float {
  float: left;
}

.float_right {
  float: right;
}
</style>
