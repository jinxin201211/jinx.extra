<template>
  <div class="jinx-nav">
    <ul class="jinx-menu">
      <li class="jinx-menu-item" :class="{ 'jinx-submenu': item.children && item.children.length > 0, hover: hover === index }" v-for="(item, index) in menu" :key="'menu' + index" @mouseover="hover = index" @mouseout="hover = -1" @click="scrollToSection(item.path)">
        <span v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["menu"],
  data: function() {
    return {
      hover: -1
    };
  },
  mounted: function() {},
  methods: {
    scrollToSection(path) {
      this.$emit("scrolltoview", path);
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-nav {
  width: 100%;
  min-width: @typical-width;
  box-sizing: border-box;
  background: #ffffff;
  padding: 0;
  box-shadow: 0px 2px 24px 6px rgba(51, 51, 51, 0.6);
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  .jinx-menu {
    margin: 0 auto;
    padding: 0;
    width: @typical-width;
    list-style: none;
    height: 60px;
    line-height: 60px;
    text-align: right;

    .jinx-menu-item {
      display: inline-block;
      margin: 0 30px;
      text-align: center;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      cursor: pointer;
      z-index: 999;
      position: relative;

      span {
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      }
    }

    .jinx-menu-item::after {
      content: "";
      position: absolute;
      bottom: 6px;
      left: 10%;
      width: 80%;
      height: 3px;
      border-radius: 3px;
      background: @primary-color;
      visibility: hidden;
      opacity: 0;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s, opacity 0.3s;
    }

    .jinx-menu-item:hover {
      span {
        color: @primary-color;
      }
    }
    .jinx-menu-item:hover:after {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
