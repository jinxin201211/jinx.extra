<template>
  <div class="jinx-nav">
    <ul class="jinx-menu horizontal">
      <li class="jinx-menu-item" :class="{ 'jinx-submenu': item.children && item.children.length > 0, hover: hover === index }" v-for="(item, index) in menu" :key="'menu' + index" @mouseover="hover = index" @mouseout="hover = -1" @click.stop="$router.push(item.path)">
        <span v-text="item.title"></span>
        <div class="jinx-menu-popup">
          <ul class="jinx-menu vertical">
            <li class="jinx-menu-item" v-for="(child, index) in item.children" :key="'submenu' + index" @click.stop="$router.push(child.path)"><span v-text="child.title">征集办法</span></li>
          </ul>
        </div>
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
  methods: {}
};
</script>

<style lang="less" scoped>
@typical-width: 1058px;
@primary-color: #d7000f;

.jinx-nav {
  box-sizing: border-box;
  border-bottom: 2px solid #c4c4c4;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  .jinx-menu {
    list-style: none;
  }

  .jinx-menu.horizontal {
    margin: 0 auto;
    width: @typical-width;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    // list-style: none;
    // border-bottom: none;
    height: 60px;
    line-height: 60px;

    & > .jinx-menu-item {
      padding: 10px;
      text-align: center;
      box-sizing: content-box;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      cursor: pointer;
      border-bottom: 4px solid transparent;
      z-index: 999;

      & > span {
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      }
    }

    & > .jinx-menu-item:hover {
      border-bottom-color: @primary-color;

      & > span {
        color: @primary-color;
      }
    }

    & > .jinx-submenu {
      position: relative;

      .jinx-menu-popup {
        position: absolute;
        top: 80px;
        left: 0;
        background: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        list-style: none;
        // display: none;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease;
      }
    }

    & > .jinx-submenu.hover {
      .jinx-menu-popup {
        visibility: visible;
        opacity: 1;
        top: 64px;
      }
    }
  }

  .jinx-menu.vertical {
    padding: 0;
    line-height: 40px;

    & > .jinx-menu-item {
      padding: 5px 40px;
      cursor: pointer;

      & > span {
        word-break: keep-all;
      }
    }

    & > .jinx-menu-item:hover {
      & > span {
        color: @primary-color;
      }
    }
  }
}
</style>
