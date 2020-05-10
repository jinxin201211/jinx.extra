<template>
  <div style="background: #f1f1f1;">
    <div class="jinx-banner" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner.jpg') + ')' }"></div>
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
export default {
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {}
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
