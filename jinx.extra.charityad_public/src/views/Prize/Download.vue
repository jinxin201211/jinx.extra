<template>
  <div :class="{ pc: DeviceType === 'PC', mobile: DeviceType === 'Mobile' }">
    <div class="jinx-page-head"></div>
    <div class="jinx-resource-panel">
      <div class="jinx-resource" v-for="(item, index) in List" :key="'resource' + index">
        <div class="jinx-work">
          <div class="title" v-text="item.Title"></div>
          <a class="link" :href="item.Link" v-text="'点击下载（提取码：' + item.Code + '）'" target="_blank"></a>
        </div>
        <div class="pics">
          <img class="pic" v-for="(pic, index2) in item.Pics" :key="'resources_pic' + index2" :src="pic" style="" @click="handleOpenBaiduYunPan(item.Link)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [
        {
          Title: '"核心价值观"公益广告',
          Link: "https://pan.baidu.com/s/1ac-aWNVv9FcG89nUIIHqsA",
          Code: "ok13",
          Pics: ["http://hs.wenming.cn/zt/gygg2020/jzg/202005/W020200527601477814626.jpg", "http://hs.wenming.cn/zt/gygg2020/jzg/202005/W020200527601275430119.jpg", "http://hs.wenming.cn/zt/gygg2020/jzg/202005/W020200527600764740780.jpg", "http://hs.wenming.cn/zt/gygg2020/jzg/202005/W020200527600997404349.jpg"]
        },

        {
          Title: "倡导文明健康生活方式",
          Link: "https://pan.baidu.com/s/1TYU3upRNi_vnDYMynjkk4Q",
          Code: "r0s2",
          Pics: ["http://hs.wenming.cn/zt/gygg2020/shfs/202102/W020210218555049547252.jpg", "http://hs.wenming.cn/zt/gygg2020/shfs/202102/W020210218554654372608.jpg", "http://hs.wenming.cn/zt/gygg2020/shfs/202102/W020210218554102983253.jpg", "http://hs.wenming.cn/zt/gygg2020/shfs/202102/W020210218554339260072.jpg"]
        }
      ],
      DeviceType: "PC"
    };
  },
  created() {
    this.handleWindowResize();
    window.onresize = this.handleWindowResize;
  },
  mounted() {
    var styleNode = document.createElement("style");
    var w = document.documentElement.clientWidth / 16;
    styleNode.innerHtml = "html{font-size:" + w + "px !important}";
    document.head.appendChild(styleNode);
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
    handleWindowResize() {
      if (this.IsPC()) {
        this.DeviceType = "PC";
      } else {
        this.DeviceType = "Mobile";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-page-head {
  background: url(http://hs.wenming.cn/zt/gygg2020/202102/W020210218546180799994.jpg) no-repeat top center;
  background-size: cover;
  transition: 0.2s all ease-in-out;
}
.jinx-resource-panel {
}
.jinx-resource {
  // padding: 0 15px;
  box-sizing: border-box;
  .jinx-work {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #ebedf0;
    margin-bottom: 15px;
    .title {
      flex: 1;
      font-family: 微软雅黑;
      color: rgb(255, 113, 70);
      font-weight: bold;
      margin: 10px 0;
    }
    .link {
      // line-height: 30px;
      // font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .pics {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .pic {
      cursor: pointer;
    }
  }
}

.pc {
  .jinx-page-head {
    height: 733px;
  }
  .jinx-resource-panel {
    width: 1000px;
    margin: 0 auto;
  }
  .jinx-resource > .jinx-work {
    margin-top: 15px;
  }
  .jinx-resource > .jinx-work > .title {
    font-size: 22px;
  }
  .jinx-resource > .jinx-work > .link {
    font-size: 16px;
  }
  .jinx-resource > .pics {
    justify-content: space-evenly;
  }
  .jinx-resource > .pics > .pic {
    width: calc((100% - 15px * 5) / 4);
  }
}

.mobile {
  .jinx-page-head {
    height: 200px;
  }
  .jinx-resource-panel {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .jinx-resource > .jinx-work > .title {
    font-size: 16px;
  }
  .jinx-resource > .jinx-work > .link {
    font-size: 12px;
  }
  .jinx-resource > .pics {
    justify-content: space-between;
  }
  .jinx-resource > .pics > .pic {
    width: calc((100% - 15px) / 2);
    margin-bottom: 15px;
  }
}
</style>
