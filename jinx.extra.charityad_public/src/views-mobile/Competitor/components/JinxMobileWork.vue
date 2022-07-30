<template>
  <div class="jinx-mobile-work" v-jinx-tap @click="$emit('view')">
    <div class="item"><span class="name">作品编号：</span><span class="value" v-text="info.wno"></span></div>
    <div class="item"><span class="name">作品名称：</span><span class="value" v-text="info.worksName"></span></div>
    <div style="display: flex;">
      <div class="item" style="flex: 1;"><span class="name">参赛组别：</span><span class="value" v-text="info.gameType"></span></div>
      <div class="item" style="flex: 1;"><span class="name">作品类别：</span><span class="value" v-text="info.worksType"></span></div>
    </div>
    <div class="item"><span class="name">作品主题：</span><span class="value" v-text="info.worksSeries"></span></div>
    <div style="display: flex;">
      <div class="item" style="flex: 1;"><span class="name">作者：</span><span class="value" v-text="info.author1"></span></div>
      <div class="item" style="flex: 1;"><span class="name">指导老师：</span><span class="value" v-text="info.tUname"></span></div>
    </div>
    <div class="item"><span class="name">提交状态：</span><span class="value" v-text="info.submitState"></span></div>

    <div>
      <el-button @click="$emit('submit')" type="text" size="small" v-if="info.submitState == '未提交'">提交</el-button>
      <el-button @click="$emit('view')" type="text" size="small">查看</el-button>
      <el-button @click="$emit('modify')" type="text" size="small">修改</el-button>
      <el-button @click="$emit('delete')" type="text" size="small">删除</el-button>
      <template v-if="info.ltGameCert != null && info.ltGameCert.length > 0">
        <el-button @click="$emit('download')" type="text" size="small">下载证书</el-button>
        <el-button @click="$emit('reply')" type="text" size="small">下载证明文件</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-mobile-work {
  // margin: 15px;
  margin: 0 15px 15px 15px;
  padding: 15px;
  box-shadow: 0 0 3px #dddddd;
  transition: background 0.2s ease-in-out;
}
.jinx-mobile-work:last-child {
  margin-bottom: 0;
}
.jinx-mobile-work.tapped {
  background: #dddddd;
}

.item {
  .name {
    font-weight: bold;
  }
}
</style>
