<template>
  <div>
    <!--<div v-if="!flashEnabled">
      <div>
        <el-link type="primary" :href="$ImageGetServer + src" v-text="src" target="_blank"></el-link>
      </div>
      <div>
        <el-link type="info" href="http://get.adobe.com/cn/flashplayer/" target="_blank">您的浏览器未安装Flash插件，现在安装？</el-link>
      </div>
    </div>
    <div v-else>-->
    <object style="max-width: 960px; width: 100%; margin: 0 auto;" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">
      <param :value="$ImageGetServer + src" name="movie" />
      <param value="high" name="quality" />
      <param value="transparent" name="wmode" />
      <param value="exactfit" name="SCALE" />
      <embed style="max-width: 960px; width: 100%; margin: 0 auto;" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" quality="high" :src="$ImageGetServer + src" />
    </object>
    <!--</div>-->
  </div>
</template>

<script>
export default {
  props: ["src"],
  data() {
    return {
      flashEnabled: false
    };
  },
  mounted() {
    // console.log(this.flashChecker());
    // if (!this.flashChecker().f) {
    //   this.flashEnabled = false;
    // } else {
    //   this.flashEnabled = true;
    // }
  },
  methods: {
    flashChecker() {
      let hasFlash = 0; //是否安装了flash
      let flashVersion = 0; //flash版本
      if (document.all) {
        let swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (swf) {
          hasFlash = 1;
          VSwf = swf.GetVariable("$version");
          flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
      } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
          let swf = navigator.plugins["Shockwave Flash"];
          if (swf) {
            hasFlash = 1;
            let words = swf.description.split(" ");
            for (let i = 0; i < words.length; ++i) {
              if (isNaN(parseInt(words[i]))) continue;
              flashVersion = parseInt(words[i]);
            }
          }
        }
      }
      return { f: hasFlash, v: flashVersion };
    }
  }
};
</script>
