<template>
  <video ref="jinx_video_player" :src="$ImageGetServer + src" controls="controls" style="max-width: 960px; width: 100%; margin: 0 auto;" muted>您的浏览器不支持 video 标签。</video>
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
        url: this.$ImageGetServer + this.src
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
