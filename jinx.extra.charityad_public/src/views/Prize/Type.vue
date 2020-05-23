<template>
  <jinx-layout>
    <div class="jinx-panel">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>获奖查询</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="jinx-types" v-if="false">
        <div class="type"><div :class="{ active: group === 0 }" @click="group = 0">高校类</div></div>
        <div class="type"><div :class="{ active: group === 1 }" @click="group = 1">专业类</div></div>
        <div class="type"><div :class="{ active: group === 2 }" @click="group = 2">公众类</div></div>
      </div>

      <div class="jinx-types">
        <div class="type"><div :class="{ active: type === 0 }" @click="type = 0">平面类</div></div>
        <div class="type"><div :class="{ active: type === 1 }" @click="type = 1">文案类</div></div>
        <div class="type"><div :class="{ active: type === 2 }" @click="type = 2">广播类</div></div>
        <div class="type"><div :class="{ active: type === 3 }" @click="type = 3">视频类</div></div>
        <div class="type"><div :class="{ active: type === 4 }" @click="type = 4">动画类</div></div>
        <div class="type"><div :class="{ active: type === 5 }" @click="type = 5">互动类</div></div>
      </div>

      <el-card style="margin-bottom: 20px;" shadow="never">
        <div slot="header">
          <span>一等奖</span>
        </div>
        <el-table style="width: 100%">
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <el-table-column prop="date" label="作品编号"> </el-table-column>
          <el-table-column prop="name" label="作品名称"> </el-table-column>
          <el-table-column prop="address" label="指导老师"> </el-table-column>
          <el-table-column prop="address" label="所属单位"> </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-bottom: 20px;" shadow="never">
        <div slot="header">
          <span>二等奖</span>
        </div>
        <el-table style="width: 100%">
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <el-table-column prop="date" label="作品编号"> </el-table-column>
          <el-table-column prop="name" label="作品名称"> </el-table-column>
          <el-table-column prop="address" label="指导老师"> </el-table-column>
          <el-table-column prop="address" label="所属单位"> </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-bottom: 20px;" shadow="never">
        <div slot="header">
          <span>三等奖</span>
        </div>
        <el-table style="width: 100%">
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <el-table-column prop="date" label="作品编号"> </el-table-column>
          <el-table-column prop="name" label="作品名称"> </el-table-column>
          <el-table-column prop="address" label="指导老师"> </el-table-column>
          <el-table-column prop="address" label="所属单位"> </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-bottom: 20px;" shadow="never">
        <div slot="header">
          <span>优秀奖</span>
        </div>
        <el-table style="width: 100%">
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <el-table-column prop="date" label="作品编号"> </el-table-column>
          <el-table-column prop="name" label="作品名称"> </el-table-column>
          <el-table-column prop="address" label="指导老师"> </el-table-column>
          <el-table-column prop="address" label="所属单位"> </el-table-column>
        </el-table>
      </el-card>
    </div>
  </jinx-layout>
</template>

<script>
import JinxLayout from "@/components/JinxLayout.vue";
import qs from "qs";

export default {
  components: { JinxLayout },
  data: function() {
    return {
      group: 0,
      type: 0
    };
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 0 auto;
  box-sizing: border-box;
}

.jinx-types {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;

  .type {
    flex: 1;
    padding: 20px;

    div {
      border: 1px solid @primary-color;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s, color 0.3s, border-color 0.3s;
      border-radius: 7px;
    }

    div.active {
      background: @primary-color;
      border-color: @primary-color;
      color: #fefdfc;
    }
  }
}
</style>
