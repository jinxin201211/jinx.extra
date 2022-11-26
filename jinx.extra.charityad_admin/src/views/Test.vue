<template>
  <div>
    <el-card style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item"></span>
        <el-link v-if="isVideo(item)" :href="$ImageGetServer + item" target="blank" type="primary" style="float: right;">下载</el-link>
      </div>
      <div v-if="isImage(item)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item]">
          <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div v-else-if="isVideo(item)" style="text-align: center;">
        <jinx-video-player :src="item"></jinx-video-player>
      </div>
      <div v-else-if="isFlash(item)" style="text-align: center;">
        <jinx-flash-player :src="item"></jinx-flash-player>
      </div>
      <div v-else-if="isAudio(item)" style="text-align: center;">
        <audio :src="$ImageGetServer + item" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item)" style="text-align: center;">
        <a :href="$PdfViewerPath + $PdfGetServer + item" v-text="item" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$ImageGetServer + item" v-text="item" target="_blank"></a>
      </div>
    </el-card>
    <el-card style="margin-top: 15px;" v-if="!item.endsWith('mp4')">
      <div slot="header" class="clearfix">
        <span v-text="'文件' + (index + 1) + '. ' + item2"></span>
        <el-link v-if="isVideo(item2)" :href="$ImageGetServer + item2" target="blank" type="primary" style="float: right;">下载</el-link>
      </div>
      <div v-if="isImage(item2)" style="text-align: center;">
        <el-image :src="$ImageGetServer + item2" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$ImageGetServer + item2]">
          <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div v-else-if="isVideo(item2)" style="text-align: center;">
        <jinx-video-player :src="item2"></jinx-video-player>
      </div>
      <div v-else-if="isAudio(item2)" style="text-align: center;">
        <audio :src="$ImageGetServer + item2" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
      </div>
      <div v-else-if="isPDF(item2)" style="text-align: center;">
        <a :href="$PdfViewerPath + $PdfGetServer + item2" v-text="item2" target="_blank"></a>
      </div>
      <div v-else style="text-align: center;">
        <a :href="$ImageGetServer + item2" v-text="item2" target="_blank"></a>
      </div>
    </el-card>

    <el-button @click="handlePrev">上一个</el-button>
    <el-button @click="handleNext">下一个</el-button>
  </div>
</template>

<script>
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";
import JinxFlashPlayer from "@/components/JinxFlashPlayer.vue";
export default {
  components: {
    JinxVideoPlayer,
    JinxFlashPlayer
  },
  data() {
    return {
      FileName: "202010301319390197_《请善待我》河北地质大学.avi",
      List: [
        "202010022320340268_动画类-龚雨燕高云霄-最美河北，拒绝白色海洋-河北大学.mp4",
        "202010302127530269_保护环境.fla",
        "202010031001460898_动画类-李雪祎-如果它们是猎手-河北大学.mp4",
        "202010161307080611_动画类-肖晨-《记忆是一扇扇彩色的窗——我和我的小康》-江苏大学.mp4",
        "202010161309090884_动画类-肖晨-《全国普法宣传日—反奸防谍》-江苏大学.mp4",
        "202010251307470807_动画类-姓名-传承中山文化-河北传媒学院.zip",
        "202010261430210592_动画类-范霖、韦品桃、张文静、朱惠君、刘林峰-善言-湖南工业大学包装设计艺术学院.mp4",
        "202010291350090018_善美河北，光盘行动.mp4",
        "202010291656080861_动画类-孙梅-反对浪费- 四川轻化工大学.mp4",
        "202010292322270479_动画类—甘雨荷 齐赟喆 邸玉珍—这就是我们要的满分？.mp4",
        "202010300952580230_动画类+胡洪川+《勿以善小而不为篇》+成都职业技术学院.mp4",
        "202010301417150851_动画类-肖文慧、林迪、闫凯迪、陈璐瑜、仇雨婷-《垃圾分类》-河北美术学院.mp4",
        "202010301831070063_沙尘暴1.swf",
        "202010301840360934_06姜智宸环保投稿.swf",
        "202010301846110116_环保.gif",
        "202010302002350385_地球.swf",
        "202010302009470014_废电池回收.gif",
        "202010302010210767_地球.swf",
        "202010302043470518_比赛小组作业.swf",
        "202010302053090341_动画类 郄方玥 让垃圾有个好归宿 河北传媒学院.mp4",
        "202010302109560292_动画类-小组作业-节约用水-河北传媒学院.swf",
        "202010302127530269_保护环境.fla",
        "202010302313380806_w.gif",
        "202010302327380344_暖.swf",
        "202010302333460563_动画类王芸芸瓶子的反击河北传媒学院.mp4",
        "202010311316170781_动画类-孙佳惠，姜欣冉，仇文静-中国梦-河北美术学院.mp4",
        "202010311529160269_动画类-袁睿瑶 孟薇 陈夷璠 姚沫言-保护环境-河北传媒学院.avi",
        "202010311735210029_动画类-杜畅-守护地球-河北传媒学院.mp4",
        "202010311915440910_动画类-王丽萍，秦雯，李安斯琪，许明磊-暖-河北传媒学院.zip",
        "202010312013520207_动画类- 邱薇莉、刘笑男、刘倩倩、孟如莹-《病从口入》-河北传媒学院.zip",
        "202010312032430925_动画类-王江艳 刘子莹 李长浩 严嘉楠-河北师范大学.mp4",
        "202010312106270122_动画类-蒋洋科 刘英美 程琳琳 裴宁-保护环境-河北传媒学院.avi",
        "202010312129100487_动画类-刘佳欣 徐誉宁 谢艳婷 黄玉华-大气环保-河北传媒学院.mp4",
        "202010312250020308_动画类-李琰、李菁菁、姜瑞雪、顾丽娜、张琳萍-呼唤阅读-河北传媒学院.swf",
        "202010312330370040_动画类 董子玉张晓蒙王佳琪王淋 《节约用电》河北传媒学院.mp4",
        "202010312330590960_动画类张晓薇《我们只有一个地球》河北传媒学院.mp4",
        "202010312336480499_动画类 于春雨、李博涵、高雯雯、郭瑜洁 “节约用水——一滴水” 河北传媒学院.mp4",
        "202010312339040811_动画类—樊春妍—最后一滴水—河北传媒学院.mp4"
      ],
      item: "",
      item2: "",
      index: 0
    };
  },
  mounted() {
    this.List = this.List.filter(p => p.endsWith(".swf")); //.endsWith()
    this.item = this.List[this.index];
    this.item2 = this.item.endsWith("avi") ? this.item.replace("avi", "mp4") : this.item.endsWith("mpg") ? this.item.replace("mpg", "mp4") : this.item.endsWith("mov") ? this.item.replace("mov", "mp4") : this.item.endsWith("3gp") ? this.item.replace("3gp", "mp4") : this.item.endsWith("flv") ? this.item.replace("flv", "mp4") : "";
  },

  methods: {
    handlePrev() {
      this.index--;

      this.item = this.List[this.index];
      this.item2 = this.item.endsWith("avi") ? this.item.replace("avi", "mp4") : this.item.endsWith("mpg") ? this.item.replace("mpg", "mp4") : this.item.endsWith("mov") ? this.item.replace("mov", "mp4") : this.item.endsWith("3gp") ? this.item.replace("3gp", "mp4") : this.item.endsWith("flv") ? this.item.replace("flv", "mp4") : "";
    },
    handleNext() {
      this.index++;

      this.item = this.List[this.index];
      this.item2 = this.item.endsWith("avi") ? this.item.replace("avi", "mp4") : this.item.endsWith("mpg") ? this.item.replace("mpg", "mp4") : this.item.endsWith("mov") ? this.item.replace("mov", "mp4") : this.item.endsWith("3gp") ? this.item.replace("3gp", "mp4") : this.item.endsWith("flv") ? this.item.replace("flv", "mp4") : "";
    }
  }
};
</script>
