<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;" :authorize="true" @scrolltoview="handleScrollToView"></jinx-top-nav>
    <jinx-nav-menu :menu="menuList2" style="position: absolute; top: 42px; z-index: 1;" @scrolltoview="handleScrollToView"></jinx-nav-menu>
    <div id="anchor_home" class="jinx-banner"></div>

    <slot></slot>

    <!-- <div class="jinx-footer">
      <div>版权所有&nbsp;2020&nbsp;河北省广告研究院&nbsp;（{{ $Host }}）</div>
      <div>
        <span style="display: inline-block; vertical-align: bottom; margin-right: 20px;">© 2020&nbsp;</span>
        <a :href="$Domain">{{ $Host }}</a>
      </div>
      <div>冀ICP备18011017号-3 冀公网安备 13010802000630号</div>
    </div> -->
  </div>
</template>

<script>
import JinxNavMenu from "@/components/JinxNavMenu.vue";
import JinxTopNav from "@/components/JinxTopNav.vue";
import qs from "qs";
import moment from "moment";

export default {
  components: { JinxNavMenu, JinxTopNav },
  data: function() {
    return {
      menuList2: [
        { title: "首页", path: "anchor_home" },
        { title: "大赛介绍", path: "anchor_contest_intro" },
        { title: "新闻动态", path: "anchor_news" },
        { title: "作品展示", path: "anchor_works" },
        { title: "优秀作品资源库", path: "anchor_display" },
        { title: "新闻宣传", path: "anchor_propagate" },
        { title: "文件下载", path: "anchor_downloads" },
        { title: "联系我们", path: "anchor_contact_us" }
      ]
    };
  },
  mounted: function() {},
  methods: {
    handleScrollToView: function(path) {
      this.$router.push({
        name: "home",
        params: {
          view: path
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-banner {
  min-width: @typical-width;
  height: 480px;
  background-position: center;
  background-size: cover;
  background-image: url("../../../assets/images/banner2022/banner-aier2-s.jpg");
  position: relative;
}

.jinx-footer {
  min-width: @typical-width;
  padding-top: 10px;
  background: #292929;

  div {
    margin: 0 auto;
    color: #fff;
    padding: 8px 0;
    text-align: center;
  }

  a {
    color: #fff;
  }

  div:first-child {
    padding-top: 30px;
  }

  div:last-child {
    padding-bottom: 30px;
  }
}
</style>
