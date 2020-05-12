<template>
  <div>
    <div class="jinx-header">
      <div class="jinx-base_inner">
        <div class="float">
          <span><a @click.stop="handleAddFavorite">加入收藏</a></span>
          <span><a>联系我们</a></span>
        </div>
        <div class="float_right" v-if="account == null || account == ''">
          <span>
            <router-link to="/account/signin">登录</router-link>
          </span>
          <span>|</span>
          <span>
            <router-link to="/account/signup">注册</router-link>
          </span>
        </div>
        <div class="float_right" v-if="account != null && account != ''">
          <span>
            <router-link to="/">获奖查询</router-link>
          </span>
          <span>|</span>
          <span>
            <router-link to="/work/convenant">作品提交</router-link>
          </span>
          <span>|</span>
          <span v-text="account + '，您好！'"></span>
          <span>|</span>
          <span><a @click="handleSignOut" href="#">退出</a></span>
        </div>
      </div>
    </div>
    <div class="jinx-banner" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner.jpg') + ')' }"></div>
    <jinx-nav-menu :menu="menuList"></jinx-nav-menu>
    <div class="content">
      <router-view></router-view>
    </div>

    <div class="footer clear">
      <div>版权所有 2015-2025 <a href="http://www.people-media.cn/" target="_blank">人民日报传媒广告有限公司</a></div>
      <div>Copyright @ 2015-2025 <a href="http://www.people-media.cn/" target="_blank">www.people-media.cn</a></div>
      <div>京ICP备13004043号-5</div>
    </div>
  </div>
</template>

<script>
import JinxNavMenu from "@/components/JinxNavMenu.vue";

export default {
  name: "Home",
  components: { JinxNavMenu },
  data: function() {
    return {
      activeIndex: "1",
      menuList: [
        { title: "首页", path: "/" },
        { title: "活动简介", path: "introduce" },
        { title: "新闻动态", path: "news" },
        {
          title: "作品征集",
          path: "collect",
          children: [
            { title: "征集办法", path: "collect" },
            { title: "奖项设置", path: "awards" },
            { title: "作品展示", path: "works" }
          ]
        },
        { title: "往届回顾", path: "history" },
        { title: "关于我们", path: "about" }
      ],
      account: this.$store.state.Account
    };
  },
  mounted: function() {},
  inject: ["reload"],
  methods: {
    // handleMenuSelect: function() {
    //   let index = this.activeIndex * 1;
    //   // console.log(index);
    //   switch (index) {
    //     case 1:
    //       console.log("first");
    //       break;
    //     case 2:
    //       console.log("second");
    //       break;
    //     case 3:
    //       console.log("third");
    //       break;
    //     case 4:
    //       console.log("fourth");
    //       break;
    //     default:
    //       console.log("first");
    //       break;
    //   }
    // },
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
      this.$cookies.remove(window.$VuexPrefix + "token");
      this.$cookies.remove(window.$VuexPrefix + "account");
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-header {
  min-width: @typical-width;
  height: 42px;
  background: #292929;

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

.jinx-banner {
  min-width: @typical-width;
  height: 357px;
  color: #000;
  // background-image: url(/assets/images/banner.jpg);
  background-position: center;
}

.footer {
  min-width: 1058px;
  margin-top: 98px;
  background: #292929;

  div {
    margin: 0 auto;
    color: #fff;
    padding: 4px 0;
    text-align: center;
  }

  a {
    color: #fff;
  }

  div:first-child {
    padding-top: 28px;
  }

  div:last-child {
    padding-bottom: 18px;
  }
}
</style>
