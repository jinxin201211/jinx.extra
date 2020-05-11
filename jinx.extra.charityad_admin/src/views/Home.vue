<template>
  <div class="jinx-layout">
    <div class="jinx-header">
      <div>大广赛</div>
    </div>
    <div class="jinx-side"></div>
    <div class="jinx-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style lang="less" scoped>
@side-width: 220px;
@header-height: 50px;
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
</style>
