a<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;" :authorize="false" @scrolltoview="handleScrollToView"></jinx-top-nav>
    <jinx-nav-menu :menu="menuList2" style="position: absolute; top: 42px; z-index: 1;" @scrolltoview="handleScrollToView"></jinx-nav-menu>
    <div id="anchor_home" class="jinx-banner"></div>

    <slot></slot>

    <div class="jinx-footer">
      <div>版权所有&nbsp;2005-2020&nbsp;全国大学生广告艺术大赛&nbsp;（www.sun-ada.net）</div>
      <div>Copyright ＠ 2005-2020&nbsp;www.sun-ada.net All rights reserved.</div>
      <div>京ICP备06010242号-2 工业和信息化部备案管理系统（http://beian.miit.gov.cn）网站统计</div>
    </div>
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
        { title: "联系我们", path: "anchor_contact_us" }
      ]
    };
  },
  mounted: function() {},
  methods: {
    handleScrollToView: function(path) {
      this.$router.push({
        name: "Home",
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
  height: 500px;
  color: #000;
  // background-color: @primary-color;
  background-position: center;
  background-size: contain;
  background-image: url("../assets/images/广告大赛网站图3.png");
  position: relative;
}

.jinx-footer {
  min-width: @typical-width;
  // margin-top: 98px;
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
