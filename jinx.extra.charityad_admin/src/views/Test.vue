<template>
  <div>
    <jinx-video-player :src="FileName"></jinx-video-player>
    <el-image :src="$ImageGetServer + FileName" style="max-width: 960px; margin: 0 auto;">
      <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";
export default {
  components: {
    JinxVideoPlayer
  },
  data() {
    return {
      FileName: "202010301319390197_《请善待我》河北地质大学.avi"
    };
  }
};
</script>
