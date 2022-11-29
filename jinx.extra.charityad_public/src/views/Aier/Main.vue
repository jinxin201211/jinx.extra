<template>
  <jinx-aier-layout>
    <div class="jinx-panel">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>爱尔眼科·河北</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="aier-panel" style="margin-top: 15px;">
        <div class="aier-navigate">
          <div class="nav">报名信息</div>
        </div>

        <el-form ref="form" :model="form" label-width="180px" style="padding: 0 20px; margin: 30px auto;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="您的参赛姓名：" prop="name" required :rules="[{ required: true, message: '请填写您的参赛姓名' }]">
                <el-input v-model="form.name" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="您的参赛年龄："
                prop="age"
                required
                type="number"
                :rules="[
                  { required: true, message: '请填写您的参赛年龄' },
                  { type: 'number', message: '年龄必须为数字值' }
                ]"
              >
                <el-input v-model.number="form.age" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="您的参赛电话：" prop="telephone" required :rules="[{ required: true, message: '请填写您的参赛电话' }]">
                <el-input v-model="form.telephone" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="您的所属赛组：" prop="groupType" required :rules="[{ required: true, message: '请填写您的参赛请选择您的所属赛组电话' }]">
                <el-select v-model="form.groupType" placeholder="请选择" style="width: 250px;">
                  <el-option v-for="(item, index) in ListSelectGroup" :key="'group' + index" :label="item.value" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="您的所在地市：" prop="city" required :rules="[{ required: true, message: '请选择您的所在地市' }]">
                <el-select v-model="form.city" placeholder="请选择" style="width: 250px;">
                  <el-option v-for="(item, index) in ListSelectCity" :key="'city' + index" :label="item.value" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="您的眼健康需求：" prop="issue" required :rules="[{ required: true, message: '请选择您的眼健康需求' }]">
                <el-select v-model="form.issue" placeholder="请选择" style="width: 250px;">
                  <el-option v-for="(item, index) in ListSelectIssue" :key="'issue' + index" :label="item.value" :value="item.code"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否需要预约眼科专家：" prop="reservation" required :rules="[{ required: true, message: '请选择是否需要预约眼科专家' }]">
            <el-radio-group v-model="form.reservation">
              <el-radio :label="item.code" v-for="(item, index) in ListSelectReservation" :key="'reservation' + index" border> {{ item.code + ":" + item.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div style="text-align: right;">
          <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="disabled">提交报名</el-button>
        </div>
      </div>

      <div class="aier-panel" style="min-height: 540px; margin-top: 15px;">
        <div class="aier-navigate">
          <!-- <div class="nav" :class="{ active: aierNav === 1 }" @click="aierNav = 1">爱尔眼科·河北</div>
          <div class="split">|</div> -->
          <div class="nav" :class="{ active: aierNav === 2 }" @click="aierNav = 2">各市医院联系方式</div>
          <div class="split">|</div>
          <div class="nav" :class="{ active: aierNav === 3 }" @click="aierNav = 3">全省代表专家（部分）</div>
        </div>

        <div v-if="aierNav === 1">
          <div class="aire-introduce">
            <p>截至2022年，爱尔眼科医院覆盖河北省11个地市，共计32家眼科医疗机构。现有职工1600余人，眼科医生330人，副主任级别以上医师94人、主治医师112人；博士13人，硕士65人。</p>
            <p>省区拥有国家级享受国务院政府特殊津贴的专家、省级、地区级有突出贡献的知名眼科专家组成的医疗专家团队，带领省区全体眼科同仁们积极进取，共同致力河北省眼病事业。</p>
            <p>同时省会医院及其他大部分医院设有屈光近视手术专科、近视防控门诊、小儿眼病与斜视科、青光眼白内障科、眼底病科、眼表及角膜病科、泪道整形与眼外伤科、预防保健科等专业科室，开展全眼科领域医疗项目。</p>
          </div>
        </div>
        <div v-else-if="aierNav === 2">
          <div class="aier-contact-detail" v-for="(item, index) in ListAierContact" :key="'aier-contact-' + index">
            <div class="title"><span v-text="item.title"></span></div>
            <div class="telephone">
              <svg t="1668845133886" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6937"><path d="M704 640c-64 64-64 128-128 128s-128-64-192-128-128-128-128-192 64-64 128-128-128-256-192-256-192 192-192 192c0 128 131.488 387.488 256 512s384 256 512 256c0 0 192-128 192-192s-192-256-256-192z" p-id="6938"></path></svg>
              <span v-text="item.telephone"></span>
            </div>
            <div class="address">
              <svg t="1668844995737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2682">
                <path d="M497.117867 0C279.074133 0 102.4 177.152 102.4 395.605333 102.4 697.344 421.888 1024 498.346667 1024c76.526933 0 393.4208-326.724267 393.4208-628.394667C891.767467 177.152 714.9568 0 497.117867 0zm0 578.9696a181.6576 181.6576 0 0 1-181.521067-181.8624 181.6576 181.6576 0 0 1 181.521067-181.930667A181.6576 181.6576 0 0 1 678.570667 397.1072 181.6576 181.6576 0 0 1 497.117867 578.901333z" p-id="2683"></path>
              </svg>
              <span v-text="item.address"></span>
            </div>
          </div>
        </div>
        <div class="aier-experts" v-else>
          <div class="aier-expert" v-for="(item, index) in ListExpert" :key="'aier-expert-' + index">
            <div class="photo">
              <div class="canvas">
                <div class="img" :style="{ 'background-image': `url(${item.photo})` }"></div>
              </div>
            </div>
            <div style="flex: 1;">
              <div class="name"><span v-text="item.name"></span></div>
              <ul class="title">
                <li v-for="(item2, index2) in item.titles" :key="'aier-expert-' + index + '-title-' + index2"><span v-text="item2"></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </jinx-aier-layout>
</template>

<script>
import JinxAierLayout from "./components/JinxAierLayout.vue";

export default {
  components: { JinxAierLayout },
  data: function() {
    return {
      aierNav: 2,
      ListAierContact: [
        {
          title: "爱尔眼科•石家庄",
          telephone: "0311-67699666",
          address: "省区医院：石家庄中华南大街与槐安路交口西北角（槐安桥·爱尔眼科）"
        },
        {
          title: "爱尔眼科•邯郸",
          telephone: "0310-8138886",
          address: "医院地址：邯郸市丛台路与陵西大街交叉口"
        },
        {
          title: "爱尔眼科•保定",
          telephone: "0312-6798166",
          address: "医院地址：保定市建华大街702号(老火车站东广场南行5米路西)"
        },
        {
          title: "爱尔眼科•张家口",
          telephone: "0313-2129999",
          address: "医院地址：张家口市桥东区宝善街"
        },
        {
          title: "爱尔眼科•承德",
          telephone: "0314-2057888",
          address: "医院地址：承德市双桥区迎宾路59号汇强大厦"
        },
        {
          title: "爱尔眼科•唐山",
          telephone: "0315-3795777",
          address: "医院地址：唐山市路北区兴源道和学院路交叉口"
        },
        {
          title: "爱尔眼科•廊坊",
          telephone: "0316-5219555",
          address: "医院地址：廊坊市广阳区广阳道与银河北路交口"
        },
        {
          title: "爱尔眼科•沧州",
          telephone: "0317-4223888",
          address: "医院地址：沧州市青县新华路新华桥东50米"
        },
        {
          title: "爱尔眼科•衡水",
          telephone: "0318-6106060",
          address: "医院地址：衡水市和平路与中心街交叉口西南角"
        },
        {
          title: "爱尔眼科•邢台",
          telephone: "0319-5500888",
          address: "医院地址：邢台市桥东区新兴东大街与顺德路交口"
        },
        {
          title: "爱尔眼科•秦皇岛",
          telephone: "0335-5816666",
          address: "医院地址：秦皇岛市海港区红旗路229号"
        }
      ],
      ListExpert: [
        {
          name: "马景学",
          photo: "",
          titles: ["主任医师、二级教授、留德医学博士、博士生导师，享受国务院特殊津贴专家，河北省“双十双百”人才。", "爱尔眼科医院集团河北省区总院长", "石家庄爱尔眼科医院院长", "河北省眼病防治研究中心主任"]
        },
        {
          name: "姜彩辉",
          photo: "",
          titles: ["主任医师、医学博士、副教授、硕士生导师", "爱尔眼科医院集团河北省区常务副总院长", "中国老年医学会眼科学分会委员"]
        },
        {
          name: "宋秀君",
          photo: "",
          titles: ["主任医师、教授、博士生导师、留美博士后，河北省有突出贡献中青年专家，享受国务院特殊津贴。", "爱尔眼科医院集团河北省区副总院长", "石家庄爱尔眼科医院常务副院长", "河北省眼科医师协会副主任委员"]
        },
        {
          name: "苏鸣",
          photo: "",
          titles: ["主任医师、教授、硕士生导师", "爱尔眼科医院集团河北省区副总院长", "石家庄爱尔眼科医院副院长", "河北省医学会眼科学分会副主任委员"]
        },
        {
          name: "韩贤奎",
          photo: "",
          titles: ["副主任医师", "石家庄爱尔眼科医院副院长", "爱尔眼科河北省区屈光学组组长", "石家庄爱尔眼科医院屈光手术科主任"]
        },
        {
          name: "戚伟",
          photo: require("@/views/Aier/photos/qiwei.png"),
          titles: ["主任医师", "廊坊爱尔眼科医院院长", "河北省中西医结合学会眼科分会常委", "河北省近视防控科普教育学会副理事长"]
        },
        {
          name: "史素恩",
          photo: require("@/views/Aier/photos/shisuen.png"),
          titles: ["副主任医师", "邢台爱尔眼科医院副院长", "邢台爱尔眼科医院青光眼白内障科主任", "河北省中西医结合专业委员会与屈光手术学组委员"]
        },
        {
          name: "张歆",
          photo: require("@/views/Aier/photos/zhangxin.png"),
          titles: ["主任医师", "沧州爱尔眼科医院院长", "河北省医学会眼科学分会眼底病学组委员", "河北省中西医结合学会眼科专业委员会常务委员"]
        },
        {
          name: "徐深",
          photo: require("@/views/Aier/photos/xushen.png"),
          titles: ["主任医师", "沧州爱尔眼科医院名誉院长", "河北省眼科医师分会副主任委员", "河北省有突出贡献的中青年专家"]
        },
        {
          name: "李京",
          photo: require("@/views/Aier/photos/lijing.png"),
          titles: ["副主任医师", "沧州爱尔眼科医院副院长", "沧州爱尔眼科医院屈光中心主任"]
        },
        {
          name: "孟丽梅",
          photo: require("@/views/Aier/photos/menglimei.jpg"),
          titles: ["副主任医师", "承德爱尔眼科医院院长", "承德市青少年近视防控专家组成员"]
        },
        {
          name: "张一凡",
          photo: require("@/views/Aier/photos/zhangyifan.png"),
          titles: ["主任医师、副教授、副主任法医师", "秦皇岛爱尔眼科医院院长", "秦皇岛市医学会眼科专业委员会名誉主任"]
        },
        {
          name: "张海东",
          photo: require("@/views/Aier/photos/zhanghaidong.jpg"),
          titles: ["主任医师", "秦皇岛爱尔眼科医院副院长", "秦皇岛市医学会眼科分会委员"]
        },
        {
          name: "王云松",
          photo: require("@/views/Aier/photos/wangyunsong.png"),
          titles: ["主任医师、医学博士、研究生导师", "唐山爱尔眼科医院院长", "河北省医师学会眼科分会委员"]
        },
        {
          name: "陈建英",
          photo: require("@/views/Aier/photos/chenjianying.png"),
          titles: ["主任医师", "保定爱尔眼科医院院长", "河北省中医眼科分会常委"]
        },
        {
          name: "李奇志",
          photo: require("@/views/Aier/photos/liqizhi.png"),
          titles: ["副主任医师", "张家口爱尔眼科医院院长", "爱尔眼科集团河北省区白内障学组组长"]
        },
        {
          name: "孙兰萍",
          photo: require("@/views/Aier/photos/sunlanping.png"),
          titles: ["主任医师、教授", "邯郸爱尔眼科医院邯郸地区总院长", "河北省突出贡献中青年专家 ", "河北省中西医结合学会眼科分会常委"]
        },
        {
          name: "李静",
          photo: require("@/views/Aier/photos/lijing2.png"),
          titles: ["副主任医师", "邯郸爱尔眼科医院常务副院长"]
        },
        {
          name: "彭永奎",
          photo: require("@/views/Aier/photos/pengyongkui.png"),
          titles: ["副主任医师", "衡水爱尔眼科医院院长", "衡水市儿童青少年近视等学生常见病防控专家组成员 ", "衡水市医学会眼科学分会第二届委员会常务委员", "河北省眼病早期筛查与预防委员会委员"]
        }
      ],
      form: {
        name: "",
        age: null,
        telephone: "",
        groupType: "",
        city: "",
        issue: "",
        reservation: ""

        // name: "金鑫",
        // age: "28",
        // telephone: "18708117389",
        // groupType: "1",
        // city: "2",
        // issue: "3",
        // reservation: "1"
      },
      ListSelectGroup: [
        {
          code: "0",
          value: "高校组"
        },
        {
          code: "1",
          value: "专业组"
        },
        {
          code: "2",
          value: "公众组"
        },
        {
          code: "3",
          value: "青少年组"
        }
      ],
      ListSelectCity: [
        {
          code: "0",
          value: "石家庄市"
        },
        {
          code: "1",
          value: "邯郸市"
        },
        {
          code: "2",
          value: "保定市"
        },
        {
          code: "3",
          value: "张家口市"
        },
        {
          code: "4",
          value: "承德市"
        },
        {
          code: "5",
          value: "唐山市"
        },
        {
          code: "6",
          value: "廊坊市"
        },
        {
          code: "7",
          value: "沧州市"
        },
        {
          code: "8",
          value: "衡水市"
        },
        {
          code: "9",
          value: "邢台市"
        },
        {
          code: "10",
          value: "秦皇岛市"
        }
      ],
      ListSelectIssue: [
        {
          code: "0",
          value: "儿童青少年近视问题"
        },
        {
          code: "1",
          value: "年轻人近视手术问题"
        },
        {
          code: "2",
          value: "中老年白内障、青光眼问题"
        },
        {
          code: "3",
          value: "眼干眼涩干眼问题"
        },
        {
          code: "4",
          value: "各种眼底病及其他眼科问题"
        }
      ],
      ListSelectReservation: [
        {
          code: "1",
          value: "是"
        },
        {
          code: "0",
          value: "否"
        }
      ],
      loading: false,
      disabled: false
    };
  },
  mounted() {
    // console.log(this.ListSelectGroup.map(p => p.code + ":" + p.value).join(","));
    // console.log(this.ListSelectCity.map(p => p.code + ":" + p.value).join(","));
    // console.log(this.ListSelectIssue.map(p => p.code + ":" + p.value).join(","));
    // console.log(this.ListSelectReservation.map(p => p.code + ":" + p.value).join(","));
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      this.axios
        .post("/api/aierSignup/getSignup")
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.form.name = response.data.data.name;
            _this.form.age = response.data.data.age * 1;
            _this.form.telephone = response.data.data.telephone;
            _this.form.groupType = response.data.data.groupType;
            _this.form.city = response.data.data.city;
            _this.form.issue = response.data.data.issue;
            _this.form.reservation = response.data.data.reservation;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit() {
      this.loading = true;
      let _this = this;
      this.axios
        .post("/api/aierSignup/signup", this.form)
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.wid = response.data.data;
            _this.disabled = true;
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: "提交失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  width: @typical-width;
  margin: 30px auto 30px auto;
  box-sizing: border-box;
}

.aier-panel {
  width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px #ebedf0;
  border: 1px dotted #ebedf0;
  padding: 30px;
}

.aier-navigate {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 1px solid #ebedf0;
  padding-bottom: 15px;
  margin-bottom: 15px;

  .split {
    color: #e7e7e7;
  }
  .nav {
    margin: 0 15px;
    font-size: 18px;
    color: #373737;
    transition: color 0.2s ease-in-out;
    cursor: pointer;
    position: relative;
  }
  .nav.active {
    font-weight: bold;
  }
  .nav.active,
  .nav:hover {
    color: #0c5cd5;
  }
  .nav.active::before {
    content: "";
    height: 3px;
    width: 30px;
    position: absolute;
    left: calc(50% - 15px);
    bottom: -15px;
    background: #666666;
  }
}

.aire-introduce {
  font-size: 18px;
  p {
    text-indent: 2em;
  }
}

.aier-contact-detail {
  border-bottom: 1px dashed #999999;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .telephone {
    font-size: 16px;
    margin: 15px 0;
    .icon {
      height: 16px;
      width: 16px;
      fill: #373737;
      margin-right: 10px;
    }
  }
  .address {
    font-size: 16px;
    margin-bottom: 15px;
    .icon {
      height: 16px;
      width: 16px;
      fill: #373737;
      margin-right: 10px;
    }
  }
}
.aier-contact-detail:not(:last-child) {
  margin-bottom: 15px;
}

.aier-experts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .aier-expert {
    border-bottom: 1px dashed #999999;
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    width: calc(50% - 15px);

    .photo {
      height: 240px;
      width: 160px;
      padding: 5px;
      border: 1px solid #dcdcdc;
      box-sizing: border-box;
      margin-right: 30px;
      .canvas {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transform: scale(1);
          transition: transform 0.3s linear;
        }
        .img:hover {
          transform: scale(1.1);
        }
      }
    }

    .name {
      background: #0c5cd5;
      color: #ffffff;
      font-size: 20px;
      line-height: 36px;
      padding: 0 40px;
      display: inline-block;
      position: relative;
      clip-path: polygon(0% 0%, 93% 0%, 101% 60%, 101% 101%, 0% 101%);
    }
    .name::before {
      content: "";
      width: 3px;
      height: 12px;
      position: absolute;
      left: 7px;
      top: 13px;
      background: #ffba27;
    }
    .title {
      font-size: 14px;
      line-height: 20px;
      list-style: square;
      margin-top: 30px;
    }
  }
}
</style>
