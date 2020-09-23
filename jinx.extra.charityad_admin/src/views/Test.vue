<template>
  <div>
    <jinx-video-player :src="FileName"></jinx-video-player>
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
      FileName: "202008091955550629_视频类-黄志丹、魏志宇-《良心口罩》-吉林艺术学院.mp4"
    };
  }
};
</script>
