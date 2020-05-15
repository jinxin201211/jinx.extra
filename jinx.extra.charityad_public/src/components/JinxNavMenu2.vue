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
      console.log(path);
      // console.log(path.substring(1, path.length));
      // path = path.substring(1, path.length);
      let section = document.getElementById(path);
      console.log(section);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      // this.$router.replace(path)
    }
  }
};
</script>

<style lang="less" scoped>
// @primary-color: #cf331f;
// @typical-width: 1200px;

.jinx-nav {
  width: 100%;
  box-sizing: border-box;
  // border-bottom: 2px solid #c4c4c4;
  background: #ffffff;
  padding: 0;
  box-shadow: 0px 2px 24px 6px rgba(51, 51, 51, 0.6);
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  // .jinx-menu {
  //   list-style: none;
  // }

  .jinx-menu {
    margin: 0 auto;
    width: @typical-width;
    // display: flex;
    // display: -webkit-flex;
    // justify-content: space-between;
    list-style: none;
    // border-bottom: none;
    height: 60px;
    line-height: 60px;
    text-align: right;

    .jinx-menu-item {
      // padding: 10px;
      display: inline-block;
      margin: 0 30px;
      text-align: center;
      // box-sizing: content-box;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      cursor: pointer;
      // border-bottom: 4px solid transparent;
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
      // border-bottom-color: @primary-color;

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
