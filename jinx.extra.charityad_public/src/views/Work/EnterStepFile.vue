<template>
  <div class="submit">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="2" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写报名表"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div>
      <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">文件上传要求：</div>
      <p>
        <b><span v-text="type"></span>作品上传要求</b>
      </p>
      <div v-html="rule"></div>
      <!--<p><b>A平面类作品上传要求</b></p>
      <p>一件作品最多上传3个jpg文件（每个路径传一个文件）</p>
      <p>单个文件不大于4Mb</p>
      <p>作品规格为A3(297x420mm)不限横竖版，色彩模式RGB，分辨率300dpi。</p>
      <p>（如“上传文件”按钮无法正常显示，请更换浏览器再次登录上传文件，建议使用谷歌浏览器或IE浏览器）</p>-->

      <el-divider></el-divider>

      <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">上传作品文件：</div>
      <el-upload class="upload-demo" ref="upload" :action="action" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="handleSuccess" :on-error="handleError" :limit="file_count_limit" :multiple="true" :on-exceed="handleExceed" :data="param" :before-upload="handleBeforeUpload" :before-remove="handleBeforeRemove">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">点击‘选取文件’按钮选取要上传的文件，选取完成后，点击‘上传到服务器’按钮将文件上传到服务器，待文件全部上传成功之后单击‘提交本作品’按钮结束本次上传，单个文件大小不超过<span v-text="maxSize"></span>Mb</div>
      </el-upload>
    </div>

    <el-divider></el-divider>

    <div style="text-align: center;">
      <el-button type="default" @click="handlePrevStep">上一步</el-button>
      <el-button type="primary" @click="handleSubmit">提交本作品</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      fileList: [],
      successList: [],
      serverFileList: [],
      param: {
        wid: this.$route.query.wid
      },
      action: window.$FileUploadServer + "/gameWorksFile/upload",
      maxSize: 10,
      file_count_limit: 100,
      rules: [
        {
          type: "1",
          name: "平面类（移动端、传统媒体）",
          desc: "<p>（1）数量要求：移动端静态广告，作品可超过6幅，可排版在3张画面上；传统媒体发布的静态广告，作品不超过3幅。</p><p>（2）提交文件格式为jpg，规格A3（297×420mm），分辨率300dpi。</p><p>（3）色彩模式为CMYK模式（用于线下印刷展览，作品大小小于10MB）。</p><p>（4）要求提交作品文件名为：平面类-姓名-作品名称-单位。</p><p>（5）作品右下角须标明“2020河北省公益广告大赛”的组合标识（标识素材从大赛官网下载）。</p><p>（6）每组参赛人员不得超过3人。</p>"
        },
        {
          type: "2",
          name: "文案类",
          desc: "<p>（1）作品内容为宣传口号、诗歌、故事等文案形式。</p><p>（2）作品提交形式为PDF。</p><p>（3）要求提交的作品文件名为：文案类-姓名-作品名称-单位。</p><p>（4）每组参赛人员不得超过3人。</p>"
        },
        {
          type: "3",
          name: "广播类",
          desc: "<p>（1）作品类型为广播广告和移动端APP音频广告。</p><p>（2）提交文件格式为mp3，广播时间30秒以内，系列作品不得超过3件。</p><p>（3）要求提交作品文件名为：广播类-姓名-作品名称-单位。</p><p>（4）每组参赛人员不得超过3人。</p>"
        },
        {
          type: "4",
          name: "视频类（影视、微电影）",
          desc: "<p>（1）作品类型为影视广告或带有故事情节的微电影广告。</p><p>（2）拍摄工具及制作软件不限，影视广告时间：15秒或30秒。微电影广告180秒以内。作品存储为mpg或avi格式，分辨率不低于720×576，不要倒计时。</p><p>（3）要求提交作品文件名为：视频类-姓名-作品名称-单位。</p><p>（4）作品结尾处展示“2020河北省公益广告大赛”的组合标识（标识素材从大赛官网下载）。</p><p>（5）每组参赛人员不得超过5人。</p>"
        },
        {
          type: "5",
          name: "动画类（移动端、电视）",
          desc:
            "<p>（1）移动端：符合移动端发布的动画广告作品，时间30秒以内。（推荐使用iH5平台制作，其他平台亦可）</p><p>（2）电视端：符合电视及电脑发布的动画广告作品。</p><p>（3）创作方式及制作软件不限，作品要符合动画广告的概念。24帧/秒，时间30秒以内，配音、配乐，系列作品不得超过3件，画面宽度600—960像素，不要倒计时。 </p><p>（4）要求提交作品文件名为：动画类-姓名-作品名称-单位。</p><p>（5）作品结尾处展示“2020河北省公益广告大赛”的组合标识（标识素材从大赛官网下载）。</p><p>（6）每组参赛人员不得超过5人。</p>"
        },
        {
          type: "6",
          name: "互动类（移动端、场景互动）",
          desc:
            "<p>（1）互动广告包括移动端（手机）iH5互动广告和场景互动广告（不限位置）。</p><p>（2）作品的格式：</p><p>①移动端（手机）iH5互动广告 </p><p>a、用iH5平台（www.iH5.cn）制作线上互动广告。可以为H5动画，H5游戏，H5电子杂志，H5交互视频等。 </p><p>b、作品分辨率要适合手机屏幕尺寸，即默认页面宽度640px，高度可以为1008px、1030px，页数不多于15页。 </p><p>c、作品需提交作品的链接及二维码，并提交作品链接和电子文档, 要求提交作品文件名为：互动类-姓名-作品名称-单位。</p><p>②场景互动广告以iH5文件形式加以演示说明，并提交作品链接，要求提交作品文件名均为：互动类-姓名-作品名称-单位。</p><p>（3）作品结尾处展示“2020河北省公益广告大赛”的组合标识（标识素材从大赛官网下载）。</p><p>（4）每组参赛人员不得超过4人。</p>"
        }
      ],
      type: "平面类",
      rule: ""
    };
  },
  mounted: function() {
    let type = this.$route.query.type;
    this.type = this.rules.find(p => p.type == type).name;
    this.rule = this.rules.find(p => p.type == type).desc;
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.successList.splice(this.successList.indexOf(file), 1);
    },
    handlePreview(file) {},
    handleSuccess: function(response, file, fileList) {
      file.serverid = response.data;
      this.successList.push(file);
      this.successList.sort((a, b) => a.uid - b.uid);
    },
    handleError: function(err, file, fileList) {
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
      });
    },
    handleExceed: function() {
      this.$message({
        showClose: true,
        message: `超出文件个数限制`,
        type: "error"
      });
    },
    handleBeforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.maxSize;
      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      return true;
    },
    handleBeforeRemove: function(file, list) {
      if (file.status === "success") {
        let delete_file = this.successList[list.indexOf(file)];
        let that = this;
        this.axios
          .post("/api/gameWorksFile/delete", qs.stringify({ id: delete_file.serverid }))
          .then(function(response) {
            if (response && response.data.code == "0") {
              //删除页面列表上的数据
              list.splice(list.indexOf(file), 1);
            } else {
              that.$message({
                showClose: true,
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message({
              showClose: true,
              message: "文件删除失败",
              type: "warning"
            });
          });
        return false;
      }
    },
    handleSubmit: function() {
      if (this.successList.length == 0) {
        this.$message({
          showClose: true,
          message: `请至少选择一个文件后再提交`,
          type: "warning"
        });
      } else {
        let that = this;
        this.axios
          .post("/api/gameWorks2/submit", qs.stringify({ wid: this.param.wid }))
          .then(function(response) {
            if (response && response.data.code == "0") {
              that.$message({
                showClose: true,
                message: "提交成功",
                type: "success"
              });
              that.$router.replace("/work/finish");
            } else {
              that.$message({
                showClose: true,
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message({
              showClose: true,
              message: "提交失败",
              type: "warning"
            });
          });
        // let data = [];
        // for (let i = 0; i < this.successList.length; i++) {}
      }
    },
    handlePrevStep: function() {
      let group = this.$store.state.User.type;
      // console.log(this.$store.state.User);
      // console.log(group);
      // group = 0; //todo
      if (group === 0) {
        this.$router.replace({
          path: "/work/groupschool",
          query: {
            wid: this.param.wid
          }
        });
      } else {
        this.$router.replace({
          path: "/work/grouppublic",
          query: {
            wid: this.param.wid
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.submit {
  width: @typical-width;
  margin: 20px auto;
}
</style>
