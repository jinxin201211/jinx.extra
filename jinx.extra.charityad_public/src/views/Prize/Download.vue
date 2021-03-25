<template>
  <div class="page" :class="{ pc: DeviceType === 'PC', mobile: DeviceType === 'Mobile' }">
    <!-- <jinx-prize-word :src="$FileGetServer + '202011120917140774_B-023尹彦利-文案-“济时者众 奋冀者先”-众美传媒.docx'"></jinx-prize-word>
    <jinx-prize-word :src="$FileGetServer + '202011120934130986_B-064王双双-《像战士一样战役！》-河北大学工商学院.docx'"></jinx-prize-word>
    <jinx-prize-word :src="$FileGetServer + '202010242311050408_文案类 贾菲璠 相与象 河北地质职工大学.docx'"></jinx-prize-word>
    <jinx-prize-word :src="$FileGetServer + '202010311711570037_互动类-张智嘉-美丽河北-河北地质职工大学.docx'"></jinx-prize-word> -->
    <div class="jinx-top" v-if="DeviceType === 'Mobile'">
      <div class="drawer" :class="{ touch: DrawerTouch }" @click="handleShowDrawer" @touchstart="DrawerTouch = true" @touchend="DrawerTouch = false">
        <svg t="1616599287703" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5387" fill="#ffffff">
          <path d="M47.86028 107.588411l112.261052 0 0 112.20272-112.261052 0 0-112.20272Z" p-id="5388"></path>
          <path d="M280.044244 107.588411l696.088312 0 0 112.20272-696.088312 0 0-112.20272Z" p-id="5389"></path>
          <path d="M47.86028 339.772375l112.261052 0 0 112.20272-112.261052 0 0-112.20272Z" p-id="5390"></path>
          <path d="M280.044244 339.772375l696.088312 0 0 112.20272-696.088312 0 0-112.20272Z" p-id="5391"></path>
          <path d="M47.86028 571.95634l112.261052 0 0 112.20272-112.261052 0 0-112.20272Z" p-id="5392"></path>
          <path d="M280.044244 571.95634l696.088312 0 0 112.20272-696.088312 0 0-112.20272Z" p-id="5393"></path>
          <path d="M47.86028 804.140304l112.261052 0 0 112.20272-112.261052 0 0-112.20272Z" p-id="5394"></path>
          <path d="M280.044244 804.140304l696.088312 0 0 112.20272-696.088312 0 0-112.20272Z" p-id="5395"></path>
        </svg>
      </div>
      <div style="font-size: 16px;"><span v-text="ListGroup.find(p => p.Value === Attr.Group).Text"></span>，<span v-text="ListType.find(p => p.Value === Attr.Type).Text"></span>，<span v-text="ListPrize.find(p => p.Value === Attr.Prize).Text"></span></div>
    </div>
    <div class="content">
      <div class="jinx-attr" v-if="DeviceType === 'PC'">
        <div class="attr">
          <div class="key">参赛组别：</div>
          <div class="list">
            <div class="value" v-for="(item, index) in ListGroup" :key="'ListGroup' + index" v-text="item.Text" :class="{ active: Attr.Group === item.Value }" @click="handleChangeGroup(item.Value)"></div>
          </div>
        </div>
        <div class="attr">
          <div class="key">作品类别：</div>
          <div class="list">
            <div class="value" v-for="(item, index) in ListType" :key="'ListType' + index" v-text="item.Text" :class="{ active: Attr.Type === item.Value }" @click="handleChangeType(item.Value)"></div>
          </div>
        </div>
        <div class="attr">
          <div class="key">奖项</div>
          <div class="list">
            <div class="value" v-for="(item, index) in ListPrize" :key="'ListPrize' + index" v-text="item.Text" :class="{ active: Attr.Prize === item.Value }" @click="handleChangePrize(item.Value)"></div>
          </div>
        </div>
      </div>

      <van-list v-if="Attr.Type === '1'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="handleLoadList" class="jinx-result">
        <div class="result" v-for="(item, index) in List" :key="'Result' + index">
          <div class="title" v-text="index + 1 + '. ' + item.worksName"></div>
          <div class="files">
            <jinx-prize-image class="image" v-for="(item2, index2) in item.files" :key="`Result${index}Files${index2}`" :src="$FileGetServer + item2" :list="item.files.map(p => $FileGetServer + p)" :index="index2" :device="DeviceType"></jinx-prize-image>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
          </div>
        </div>
      </van-list>
      <van-list v-if="Attr.Type === '2'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="handleLoadList" class="jinx-result">
        <div class="result" v-for="(item, index) in List" :key="'Result' + index">
          <div class="title" v-text="index + 1 + '. ' + item.worksName"></div>
          <div class="files" style="display: initial;">
            <div v-for="(item2, index2) in item.files" :key="`Result${index}Files${index2}`">
              <pdf :src="$FileGetServer + item2" v-if="isPDF(item2)" class="pdf"></pdf>
              <jinx-prize-word :src="$FileGetServer + item2" class="word" v-else></jinx-prize-word>
              <!-- <iframe :src="$OfficeViewerPath + $FileGetServer + item2" v-else-if="isOffice(item2)" class="word"></iframe> -->
            </div>
          </div>
        </div>
      </van-list>
      <van-list v-if="Attr.Type === '3'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="handleLoadList" class="jinx-result">
        <div class="result" v-for="(item, index) in List" :key="'Result' + index">
          <div class="title" v-text="index + 1 + '. ' + item.worksName"></div>
          <div class="files">
            <div class="audio" v-for="(item2, index2) in item.files" :key="`Result${index}Files${index2}`">
              <audio :src="$FileGetServer + item2" controls="controls" style="width: 100%; margin: 0 auto; max-width: 960px">您的浏览器不支持 audio 标签。</audio>
            </div>
          </div>
        </div>
      </van-list>
      <van-list v-if="Attr.Type === '4'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="handleLoadList" class="jinx-result">
        <div class="result" v-for="(item, index) in List" :key="'Result' + index">
          <div class="title" v-text="index + 1 + '. ' + item.worksName"></div>
          <div class="files">
            <div class="video" :class="{ hide: Drawer }" v-for="(item2, index2) in item.files" :key="`Result${index}Files${index2}`">
              <jinx-video-player style="z-index: -1;" :src="item2"></jinx-video-player>
            </div>
          </div>
        </div>
      </van-list>
      <van-list v-if="Attr.Type === '5'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="handleLoadList" class="jinx-result">
        <div class="result" v-for="(item, index) in List" :key="'Result' + index">
          <div class="title" v-text="index + 1 + '. ' + item.worksName"></div>
          <div class="files">
            <div class="video" :class="{ hide: Drawer }" style="" v-for="(item2, index2) in item.files" :key="`Result${index}Files${index2}`">
              <jinx-video-player style="z-index: -1;" :src="item2"></jinx-video-player>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <el-drawer :withHeader="false" :visible.sync="Drawer" direction="ltr" size="75%">
      <div slot="title"></div>
      <div class="jinx-drawer-attr">
        <div class="key">参赛组别：</div>
        <div class="list">
          <div class="value" v-for="(item, index) in ListGroup" :key="'ListGroup' + index" v-text="item.Text" :class="{ active: DrawerAttr.Group === item.Value }" @click="handleChangeDrawerGroup(item.Value)"></div>
        </div>
        <div class="key">作品类别：</div>
        <div class="list">
          <div class="value" v-for="(item, index) in ListType" :key="'ListType' + index" v-text="item.Text" :class="{ active: DrawerAttr.Type === item.Value }" @click="handleChangeDrawerType(item.Value)"></div>
        </div>
        <div class="key">奖项</div>
        <div class="list">
          <div class="value" v-for="(item, index) in ListPrize" :key="'ListPrize' + index" v-text="item.Text" :class="{ active: DrawerAttr.Prize === item.Value }" @click="handleChangeDrawerPrize(item.Value)"></div>
        </div>
        <div style="position: absolute; bottom: 0; right: 2vw; padding: 2vw 0;">
          <el-button type="primary" @click="handleConfirmDrawer">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import JinxPrizeImage from "./components/JinxPrizeImage.vue";
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";
import pdf from "vue-pdf";
import JinxPrizeWord from "./components/JinxPrizeWord.vue";
export default {
  components: { JinxPrizeImage, JinxVideoPlayer, pdf, JinxPrizeWord },
  data() {
    return {
      DeviceType: "PC",
      ListGroup: [],
      ListType: [],
      ListPrize: [
        { Value: 1, Text: "一等奖" },
        { Value: 2, Text: "二等奖" },
        { Value: 3, Text: "三等奖" },
        { Value: 4, Text: "优秀奖" }
      ],
      Attr: {
        Group: "",
        Type: "",
        Prize: 1
      },
      DrawerAttr: {
        Group: "",
        Type: "",
        Prize: 1
      },
      FullRankList: [],
      RankList: [],
      List: [],
      Drawer: false,
      DrawerTouch: false,
      loading: false,
      finished: false,
      page: 0,
      size: 3,
      lock: false
    };
  },
  created() {
    this.initAttr();
    this.getFullRankList(); //todo
  },
  mounted() {
    this.initWindowResize();
  },
  methods: {
    handleOpenBaiduYunPan(link) {
      window.open(link);
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      console.log(navigator);
      var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    initWindowResize() {
      this.handleWindowResize();
      window.onresize = this.handleWindowResize;
      var styleNode = document.createElement("style");
      var w = document.documentElement.clientWidth / 16;
      styleNode.innerHtml = "html{font-size:" + w + "px !important}";
      document.head.appendChild(styleNode);
    },
    handleWindowResize() {
      if (this.IsPC()) {
        this.DeviceType = "PC";
      } else {
        this.DeviceType = "Mobile";
      }
    },
    initAttr() {
      this.ListGroup = this.$WorksGroupCode.map(p => {
        return {
          Value: p.code,
          Text: p.value
        };
      });
      this.Attr.Group = this.ListGroup[0].Value;
      this.ListType = this.$WorksTypeCode.map(p => {
        return {
          Value: p.code,
          Text: p.value
        };
      });
      this.Attr.Type = this.ListType[0].Value;
    },
    getFullRankList: function() {
      let _this = this;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        // spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      _this.FullRankList = [];
      this.axios
        .post("/api/gameWorksRank/getAllRankAndFiles")
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.FullRankList = response.data.data;
            _this.getRankList();
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          _this.$message({
            showClose: true,
            message: "获奖结果查询失败",
            type: "warning"
          });
        });
    },
    handleChangeGroup(group) {
      this.Attr.Group = group;
      this.getRankList();
    },
    handleChangeType(type) {
      this.Attr.Type = type;
      this.getRankList();
    },
    handleChangePrize(prize) {
      this.Attr.Prize = prize;
      this.getRankList();
    },
    handleChangeDrawerGroup(group) {
      this.DrawerAttr.Group = group;
    },
    handleChangeDrawerType(type) {
      this.DrawerAttr.Type = type;
    },
    handleChangeDrawerPrize(prize) {
      this.DrawerAttr.Prize = prize;
    },
    handleShowDrawer() {
      this.DrawerAttr.Group = this.Attr.Group;
      this.DrawerAttr.Type = this.Attr.Type;
      this.DrawerAttr.Prize = this.Attr.Prize;
      this.Drawer = true;
    },
    handleConfirmDrawer() {
      this.Attr.Group = this.DrawerAttr.Group;
      this.Attr.Type = this.DrawerAttr.Type;
      this.Attr.Prize = this.DrawerAttr.Prize;
      this.Drawer = false;
      this.getRankList();
    },
    getRankList() {
      this.RankList = this.FullRankList.filter(p => p.worksType === this.Attr.Type && p.gameType === this.Attr.Group && p.prize === this.Attr.Prize);

      for (var i = 0; i < this.FullRankList.length; i++) {
        for (var j = 0; j < this.FullRankList[i].files.length; j++) {
          if (this.FullRankList[i].files[j].includes(".doc")) {
            console.log(this.FullRankList[i].files[j]);
          }
        }
      }
      this.page = 0;
      this.finished = false;
      this.List = [];
      console.log("getRankList");
      this.handleLoadList();
      // console.log(this.FullRankList.filter(p => p.worksType === "1").map(p => p.files));
      // console.log(this.FullRankList.filter(p => p.worksType === "2").map(p => p.files));
      // console.log(this.FullRankList.filter(p => p.worksType === "3").map(p => p.files));
      // console.log(this.FullRankList.filter(p => p.worksType === "4").map(p => p.files));
      // console.log(this.FullRankList.filter(p => p.worksType === "5").map(p => p.files));
      // console.log(this.FullRankList.filter(p => p.worksType === "6").map(p => p.files));
    },
    handleLoadList() {
      if (!this.lock) {
        console.log("handleLoadList");
        this.lock = true;
        this.page++;
        setTimeout(() => {
          this.List = this.RankList.slice(0, this.page * this.size);
          if (this.List.length == this.RankList.length) {
            this.finished = true;
          }
          this.loading = false;
          this.lock = false;
        }, 200);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page.pc {
  width: 1000px;
  margin: 0 auto;
}

.pc {
  .jinx-attr {
    margin: 15px 0;
    border-top: 2px solid #ebedf0;
  }
  .attr {
    display: flex;
    height: 50px;
    border-bottom: 2px solid #ebedf0;
  }
  .attr > .key {
    background: #f3f3f3;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .attr > .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
  }
  .attr > .list > .value {
    padding: 5px 25px;
    margin-left: 30px;
    background: #ebedf0;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
  }
  .attr > .list > .value.active {
    background: #cf331f;
    color: #ffffff;
  }

  .result {
    box-shadow: 0 0 3px #dddddd;
    border-radius: 4px;
    padding: 15px;
    margin: 15px 0;
    box-sizing: border-box;
  }
  .result > .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .result > .files {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .result > .files > .image {
    width: calc((100% - 15px * 4) / 5);
  }
  .result > .files > .audio {
    text-align: center;
    width: 100%;
  }
  .result > .files > .video {
    text-align: center;
    width: 100%;
    background: #ebedf0;
  }
  .result > .files > .video.hide > video {
    visibility: hidden;
  }
  .result > .files .pdf,
  .result > .files .word {
    width: 100%;
    max-width: 960px;
    height: 540px;
    overflow-y: scroll;
    border: 1px solid #666666;
    margin-bottom: 15px;
  }
  .result > .files .word {
    padding: 15px;
  }
}

.page.mobile {
  width: 100%;
  box-sizing: border-box;
  padding-top: 12vw;
}

.mobile {
  .jinx-top {
    width: 100%;
    background: #000000;
    color: #ffffff;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .jinx-top > .drawer {
    width: 12vw;
    height: 12vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3vw;
    background: rgba(255, 255, 255, 0.1);
  }
  .jinx-top > .drawer.touch {
    background: rgba(255, 255, 255, 0.4);
  }
  .jinx-top > .drawer svg {
    width: 7vw;
    height: 7vw;
  }
  .content {
    padding: 0 3vw;
  }
  .jinx-attr {
    margin: 3vw 0;
    border-top: 2px solid #ebedf0;
  }
  .attr {
    display: flex;
    // height: 50px;
    border-bottom: 2px solid #ebedf0;
  }
  .attr > .key {
    background: #f3f3f3;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 22vw;
    padding-left: 2vw;
    box-sizing: border-box;
  }
  .attr > .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding-top: 2vw;
    flex-wrap: wrap;
  }
  .attr > .list > .value {
    padding: 1vw 2vw;
    margin-left: 2vw;
    margin-bottom: 2vw;
    background: #ebedf0;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
  }
  .attr > .list > .value.active {
    background: #cf331f;
    color: #ffffff;
  }

  .result {
    box-shadow: 0 0 3px #dddddd;
    border-radius: 4px;
    padding: 3vw;
    margin: 3vw 0;
    box-sizing: border-box;
  }
  .result > .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 3vw;
  }
  .result > .files {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .result > .files > .image {
    width: calc((100% - 3vw * 2) / 3);
  }
  .result > .files > .audio {
    text-align: center;
    width: 100%;
  }
  .result > .files > .video {
    text-align: center;
    width: 100%;
    background: #ebedf0;
  }
  .result > .files > .video.hide > video {
    visibility: hidden;
  }
  .result > .files .pdf,
  .result > .files .word {
    width: 100%;
    // max-width: 960px;
    // height: 540px;
    margin-bottom: 3vw;
    overflow-y: scroll;
    border: 1px solid #666666;
  }
  .result > .files .word {
    padding: 3vw;
  }

  .jinx-drawer-attr {
    padding: 0 2vw;
    margin-top: 12vw;
  }
  .jinx-drawer-attr > .key {
    font-weight: bold;
  }
  .jinx-drawer-attr > .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-top: 2vw;
    flex-wrap: wrap;
  }
  .jinx-drawer-attr > .list > .value {
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    width: calc((100% - 2vw) / 2);
    text-align: center;
    padding: 3vw 0px;
    margin-bottom: 2vw;
    background: #ebedf0;
    border: 1px solid #ebedf0;
    box-sizing: border-box;
  }
  .jinx-drawer-attr > .list > .value.active {
    background: lighten(#cf331f, 48%);
    color: #cf331f;
    border-color: #cf331f;
    // color: #ffffff;
  }
}
</style>
<style>
.el-drawer:focus:hover,
.el-drawer__container:focus:hover,
.el-drawer__wrapper:focus {
  outline: none;
}
</style>
