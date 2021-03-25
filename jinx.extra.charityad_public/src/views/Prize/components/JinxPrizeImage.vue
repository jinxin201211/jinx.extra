<template>
  <div>
    <el-image :src="src" v-if="device === 'PC'" style="width: 100%;" :preview-src-list="list">
      <div slot="placeholder" class="image-slot" style="padding: 50% 0; background: #ebedf0; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <span>加载中<span class="dot">...</span></span>
        </div>
      </div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <el-image :src="src" v-else style="width: 100%;" @click="handleImagesPreview">
      <div slot="placeholder" class="image-slot" style="padding: 50% 0; background: #ebedf0; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <span>加载中<span class="dot">...</span></span>
        </div>
      </div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
  props: ["list", "src", "index", "device"],
  data() {
    return {};
  },
  methods: {
    handleImagesPreview() {
      this.$imagepreview({
        images: this.list,
        startPosition: this.index
      });
    }
  }
};
</script>
