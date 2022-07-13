<template>
  <video ref="jinx_video_player" :src="$FileGetServer + src" controls="controls" controlsList="nodownload" oncontextmenu="return false" style="max-width: 960px; width: 100%; margin: 0 auto;" muted webkit-playsinline="true" x5-video-player-type="h5-page" x5-video-orientation="portraint">您的浏览器不支持 video 标签。</video>
</template>

<script>
import flvjs from "flv.js/dist/flv.min.js";

export default {
  props: ["src"],
  mounted() {
    if (flvjs.isSupported()) {
      var videoElement = this.$refs.jinx_video_player;
      var flvPlayer = flvjs.createPlayer({
        type: this.getExtensionName(this.src),
        url: this.$FileGetServer + this.src
        // url: "/api/img/" + this.src //todo
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
    }
  },
  methods: {
    getExtensionName(filename) {
      if (!filename || typeof filename != "string") {
        return false;
      }
      let a = filename
        .split("")
        .reverse()
        .join("");
      let b = a
        .substring(0, a.search(/\./))
        .split("")
        .reverse()
        .join("");
      return b;
    }
  }
};
</script>
