<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;" :authorize="true" @scrolltoview="handleScrollToView"></jinx-top-nav>
    <jinx-nav-menu :menu="menuList" style="position: absolute; top: 42px; z-index: 1;" @scrolltoview="handleScrollToView"></jinx-nav-menu>
    <div id="anchor_home" class="jinx-banner">
      <div class="banner banner-1" :class="{ active: bannerShow === 0, hide: bannerShow !== 0 }"></div>
      <div class="banner banner-2" :class="{ active: bannerShow === 1, hide: bannerShow !== 1 }"></div>
    </div>

    <div class="jinx-banner-navbar">
      <div class="nav" v-if="false">
        <div>
          <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner大赛介绍@2x.png') + ')' }"></div>
          <div class="title">大赛介绍</div>
        </div>
      </div>
      <div class="nav">
        <div @click="$router.push('/regulation')">
          <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner大赛章程@2x.png') + ')' }"></div>
          <div class="title">大赛章程</div>
        </div>
      </div>
      <div class="nav">
        <div @click="$router.push('/account/signup')">
          <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner注册报名@2x.png') + ')' }"></div>
          <div class="title">注册报名</div>
        </div>
      </div>
      <div class="nav">
        <div @click="$router.push('/work')">
          <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner作品提交@2x.png') + ')' }"></div>
          <div class="title">作品提交</div>
        </div>
      </div>
      <div class="nav">
        <div @click="$router.push('/prize')">
          <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner结果查询@2x.png') + ')' }"></div>
          <div class="title">结果查询</div>
        </div>
      </div>
    </div>

    <div id="anchor_contest_intro" class="jinx-contest-intro">
      <div class="title-en">Contest Intro</div>
      <div class="title">大赛介绍</div>
      <div class="intro">
        <p>河北省公益广告大赛于2020年首次举办。值此党的二十大召开之际、“十四五”规划的关键之年，为凝聚社会合力促进建设经济强省、美丽河北，充分发挥公益广告弘扬主流价值、传播文明理念、引领时代新风的积极作用，为加快建设经济强省、美丽河北营造良好氛围，以实际行动迎接党的二十大胜利召开，省市场监督管理局、省文明办、省教育厅、省广播电视局、共青团河北省委共同举办2022河北省公益广告大赛。</p>
        <p>本届大赛以“美丽河北我创益”为主题，创作内容包括但不限于“我心向党，喜迎二十大”“崇德尚法，社会筑和谐”“美丽河北，文明新风尚”“传承文化，科技促发展”“保护环境，发展可持续”“守护健康，生命有保障”“敬老助老，关爱老年人”“成长护航，培养青少年”“全民参与，弘扬正能量”等作品方向。面向全社会征集专业性、思想性、文化性、艺术性俱佳的公益广告作品。</p>
        <p>本届大赛主要分为高校组、专业组、公众组和青少年组，参赛作品形式主要分为平面类、文案类、广播类、视频类、动画类、互动类6大类。</p>
        <p>本届大赛采用在线报名和线上评审的形式，将按照参赛组别的不同作品类别设置等级奖、优秀作品奖、优秀组织奖、优秀指导奖等奖项。</p>
        <p>大赛自2022年8月1日至10月31日面向全社会广泛征集公益广告作品；11月份将邀请专家对参赛作品进行权威评审和结果公示；12月将组织召开大赛颁奖盛典和优秀获奖作品展播。</p>
        <p>本届大赛旨在深入学习贯彻习近平新时代中国特色社会主义思想，贯彻落实省委十届二次全会精神，助力“十四五”规划实施落地，助力我省建设发展。同时集合专业与社会力量，发挥各大媒体传播优势，将公益广告蕴含的社会正能量向社会大众广泛传播。此外，公益广告大赛将作为河北公益广告业发展的重要抓手，推进人才、资源交流，以赛促学，以赛促交流，以赛促大发展，在业内进一步完善人才和资源交流，促进河北公益事业发展。</p>
      </div>
      <div class="avatar" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/2022河北省公益广告大赛.jpg') + ')' }"></div>
    </div>

    <div id="anchor_news" class="jinx-news">
      <div class="news-pos">
        <div class="title-en">NEWS</div>
        <div class="title">新闻动态</div>
        <div class="news">
          <div class="rows" v-for="(item, index) in newsList" :key="'news' + index">
            <div class="cols left" v-if="item.col1 != null">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day" v-text="item.col1.date"></div>
                    <div class="date-month" v-text="item.col1.month"></div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title" v-text="item.col1.title" @click="handleViewNews(item.col1.id)"></div>
                  <div class="news-body" v-html="item.col1.content"></div>
                </div>
              </div>
            </div>

            <div class="cols right" v-if="item.col2 != null">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day" v-text="item.col2.date"></div>
                    <div class="date-month" v-text="item.col2.month"></div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title" v-text="item.col2.title" @click="handleViewNews(item.col2.id)"></div>
                  <div class="news-body" v-html="item.col2.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_works" class="jinx-works">
      <div class="works-pos">
        <div class="title-en">WORKS</div>
        <div class="title">作品展示</div>

        <div class="works-display">
          <div class="works-body">
            <div v-show="work.file > 0" class="left" @click="work.file--"></div>
            <div class="works-file" v-if="work.list.length > 0">
              <div class="image" v-if="work.list[work.index].files.length > 0 && isImage(work.list[work.index].files[work.file])" :style="{ backgroundImage: 'url(' + $FileGetServer + work.list[work.index].files[work.file] + ')' }"></div>
              <video class="video" v-if="work.list[work.index].files.length > 0 && isVideo(work.list[work.index].files[work.file])" :src="$FileGetServer + work.list[work.index].files[work.file]" controls="controls">您的浏览器不支持 video 标签。</video>
            </div>
            <div v-show="work.list.length > 0 && work.file < work.list[work.index].files.length - 1" class="right" @click="work.file++"></div>
          </div>
          <div class="works-info">
            <span class="author" v-text="work.list.length > 0 ? work.list[work.index].author : ''"></span>
            <span class="avatar"></span>
          </div>
        </div>

        <div class="works-carousel">
          <div v-show="work.scroll > 0" class="left" @click="work.scroll--"></div>
          <div class="works-list">
            <div class="works-list-scroll" :style="{ left: 261.33 * -1 * work.scroll + 'px' }">
              <div class="works-item-pos" v-for="(item, index) in work.list" :key="'excellent_work' + index">
                <div class="works" @click="handleCarouselClick(index)">
                  <div class="image" v-if="item.files.length > 0 && isImage(item.files[0])" :style="{ backgroundImage: 'url(' + $FileGetServer + item.files[0] + ')' }"></div>
                  <div class="video" v-if="item.files.length > 0 && isVideo(item.files[0])">
                    <svg t="1589870741966" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1140" width="48" height="48">
                      <path d="M981.184 160.096c-143.616-20.64-302.336-32.096-469.184-32.096s-325.568 11.456-469.184 32.096c-27.52 107.712-42.816 226.752-42.816 351.904s15.264 244.16 42.816 351.904c143.648 20.64 302.336 32.096 469.184 32.096s325.568-11.456 469.184-32.096c27.52-107.712 42.816-226.752 42.816-351.904s-15.264-244.16-42.816-351.904zM384 704l0-384 320 192-320 192z" p-id="1141" fill="#bfbfbf"></path>
                    </svg>
                  </div>
                  <!--<video class="video" v-if="item.files[0].endsWith('.mp4')" :src="$FileGetServer + item.files[0]" controls="controls">您的浏览器不支持 video 标签。</video>-->
                </div>
              </div>
            </div>
          </div>
          <div v-show="work.scroll + 3 < work.list.length" class="right" @click="work.scroll++"></div>
        </div>
      </div>
    </div>

    <div id="anchor_download" class="jinx-download" v-if="false">
      <div class="download-pos">
        <div class="title-en">Download</div>
        <div class="title">素材下载</div>
        <div class="material-panel">
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
          <div class="material-pos">
            <div class="material">
              <div class="material-title">
                公益命题：战“疫”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_link" class="jinx-links">
      <div class="links-pos">
        <div class="title-en">LINK</div>
        <div class="title">友情链接</div>
        <div class="links-panel">
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://scjg.hebei.gov.cn/" target="_blank">河北省市场监督管理局</el-link>
            </div>
          </div>
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://hb.wenming.cn/" target="_blank">河北文明网</el-link>
            </div>
          </div>
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://www.hebtv.com/" target="_blank">河北广播电视台</el-link>
            </div>
          </div>
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://www.54heb.org.cn/" target="_blank">河北共青团</el-link>
            </div>
          </div>
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://jyt.hebei.gov.cn/" target="_blank">河北省教育厅</el-link>
            </div>
          </div>
          <div class="item-pos">
            <div class="link-item">
              <el-link href="http://www.hbsggxh.com/" target="_blank">河北省广告协会</el-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_contact_us" class="jinx-contactus">
      <div class="contactus-pos">
        <div class="contactus" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/contact_us_back.png') + ')' }">
          <div class="title-en">CONTACT US</div>
          <div class="title">联系我们</div>
          <div style="margin-top: 30px;">地址：河北省石家庄市南二环东路20号河北师范大学新校区</div>
          <div style="margin-top: 30px;">邮编：050024</div>
          <div style="margin-top: 30px;">电话：15632194562</div>
          <div style="text-align: center; margin-top: 28px; display: none;" v-if="false">
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="jinx-footer">
      <div>版权所有&nbsp;2020&nbsp;河北省广告研究院&nbsp;（{{ $Host }}）</div>
      <div>
        <span style="display: inline-block; vertical-align: bottom; margin-right: 20px;">© 2020&nbsp;</span>
        <a :href="$Domain">{{ $Host }}</a>
      </div>
      <div>冀ICP备18011017号-3 冀公网安备 13010802000630号</div>
    </div>
  </div>
</template>

<script>
import JinxNavMenu from "@/components/JinxNavMenu.vue";
import JinxTopNav from "@/components/JinxTopNav.vue";
import qs from "qs";
import moment from "moment";

export default {
  name: "home",
  components: {
    JinxNavMenu,
    JinxTopNav
  },
  data: function() {
    return {
      bannerShow: 0,
      menuList: [
        {
          title: "首页",
          path: "anchor_home"
        },
        {
          title: "大赛介绍",
          path: "anchor_contest_intro"
        },
        {
          title: "新闻动态",
          path: "anchor_news"
        },
        {
          title: "作品展示",
          path: "anchor_works"
        },
        {
          title: "优秀作品资源库",
          path: "anchor_display"
        },
        {
          title: "新闻宣传",
          path: "anchor_propagate"
        },
        {
          title: "文件下载",
          path: "anchor_downloads"
        },
        {
          title: "联系我们",
          path: "anchor_contact_us"
        }
      ],
      newsList: [],
      work: {
        list: [],
        index: 0,
        scroll: 0,
        select: {},
        file: 0,
        carousel: -1,
        interval: 10000
      },
      message: null
    };
  },
  mounted: function() {
    this.turnBannerCarousel();
    this.getNewsList();
    this.getWorksList();

    let view = this.$route.params.view;
    if (view) {
      this.scrollToSection(view);
    }
    // this.message = this.$message({
    //   showClose: true,
    //   message: "网站将于1月15号更换新的域名(www.hbsggyjy.cn)，请及时更新收藏夹",
    //   type: "info",
    //   duration: 0
    // });

    // this.$alert("紧急通知：因大赛系统服务器故障，导致10月1日之前已注册的竞争信息损坏，无法恢复，已上传作品与用户信息无法进行正常匹配。<br>在此，烦请10月1日前的参赛者重新注册信息并重新提交作品，以保障顺利参赛。自10月2日起，参赛者可正常通过大赛官网进行注册报名和提交作品。大赛组委会对所有参赛者给予公益事业的支持和本次大赛的参与深表感谢，对给所有参赛者带来的不便深表歉意！<br>根据实际情况，河北省公益广告大赛将继续征集，截止时间为2020年10月31日，欢迎社会各界踊跃报名参赛！", "", {
    //   dangerouslyUseHTMLString: true
    // });
    // this.$alert("①等级奖获得者请于2021年1月10前在文件下载中将《奖金发放确认函》填写并发送到大赛官方邮箱；<br/>②电子版证书下载：登陆账号在我的作品里进行下载请使用chrome浏览器(谷歌浏览器)进行下载。", "", {
    //   dangerouslyUseHTMLString: true
    // });
    // this.$alert("电子版获奖证书下载，请于1月4号开始。登陆账号后在我的作品里面下载电子版证书");
    // this.$alert("①电子版证书请于2022年1月4号后登陆账号在我的作品里进行下载（使用chrome浏览器下载）。<br />②如需指导及主办单位证明材料，下载路径同上。<br />③网站将于1月25号更换新的域名(www.hbsggyjy.cn)，请及时更新收藏夹", "", {
    //   dangerouslyUseHTMLString: true
    // });
    // this.$alert("因疫情影响导致邮寄的证书可能会延迟，请大家耐心等待一下，如急需请与组委会联系");

    // this.$alert(`<a class="el-link el-link--primary is-underline" onclick="handleOpenNews()">“我心向党，喜迎二十大”特别主题前置征集中，9月30日截止</a> `, "", {
    //   dangerouslyUseHTMLString: true
    // });
    // const _this = this;
    // window.handleOpenNews = () => {
    //   _this.$msgbox.close();
    //   _this.$router.push({
    //     path: "/news",
    //     query: {
    //       id: 59
    //     }
    //   });
    // };

    // this.$alert("征集作品延长到11月20号");

    this.$alert("由于临近作品征集截止日期，网站访问量骤增导致网络拥堵，请各位参赛者提前记录组委会电话，如遇网站登陆异常、作品提交等问题请与组委会联系！<br />任老师 18830155671<br />栗老师 15232181775<br />吴老师 19933140906", "", {
      dangerouslyUseHTMLString: true
    });
  },
  beforeRouteLeave(to, from, next) {
    window.clearTimeout(this.work.carousel);
    // this.message.close();
    next();
  },
  methods: {
    turnBannerCarousel: function() {
      let _this = this;
      let time = 0;
      setTimeout(function f() {
        _this.bannerShow = time % 2;
        time++;
        setTimeout(f, 5000);
      }, 0);
    },
    getNewsList() {
      let _this = this;
      _this.newsList = [];
      let month_dict = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      this.axios
        .post("/api/gameNews/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            for (let i = 0; i < response.data.data.length; i += 2) {
              let newsRow = {
                col1: null,
                col2: null
              };
              if (i < response.data.data.length) {
                newsRow.col1 = {
                  id: response.data.data[i].id,
                  title: response.data.data[i].title,
                  content: response.data.data[i].content
                    .replace(/<xml>[\s\S]*?<\/xml>/gi, "")
                    .replace(/<style>[\s\S]*?<\/style>/gi, "")
                    .replace(/<\/?[^>]*>/g, "")
                    .replace(/[ | ]*\n/g, "\n")
                    .replace(/&nbsp;/gi, ""),
                  time: response.data.data[i].utime,
                  date: moment(response.data.data[i].utime).get("date"),
                  month: moment(response.data.data[i].utime).get("year") + "-" + month_dict[moment(response.data.data[i].utime).get("month")]
                };
              }
              if (i + 1 < response.data.data.length) {
                newsRow.col2 = {
                  id: response.data.data[i + 1].id,
                  title: response.data.data[i + 1].title,
                  content: response.data.data[i].content
                    .replace(/<xml>[\s\S]*?<\/xml>/gi, "")
                    .replace(/<style>[\s\S]*?<\/style>/gi, "")
                    .replace(/<\/?[^>]*>/g, "")
                    .replace(/[ | ]*\n/g, "\n")
                    .replace(/&nbsp;/gi, ""),
                  time: response.data.data[i + 1].utime,
                  date: moment(response.data.data[i + 1].utime).get("date"),
                  month: moment(response.data.data[i + 1].utime).get("year") + "-" + month_dict[moment(response.data.data[i + 1].utime).get("month")]
                };
              }
              _this.newsList.push(newsRow);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            showClose: true,
            message: "获取新闻动态失败",
            type: "warning"
          });
        });
    },
    handleViewNews(id) {
      this.$router.push({
        path: "/news",
        query: {
          id: id
        }
      });
    },
    handleScrollToView(path) {
      if (path == "anchor_home") {
        window.location.href = this.$Domain;
      } else if (path == "anchor_display") {
        this.$router.push("/download");
      } else if (path == "anchor_downloads") {
        this.$router.push("/downloads");
      } else if (path == "anchor_propagate") {
        this.$router.push("/news/propagate");
      } else {
        let section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    },
    scrollToSection(path) {
      if (path == "anchor_home") {
        window.location.href = this.$Domain;
      } else if (path == "anchor_display") {
        this.$router.push("/download");
      } else if (path == "anchor_downloads") {
        this.$router.push("/downloads");
      } else if (path == "anchor_propagate") {
        this.$router.push("/news/propagate");
      } else {
        let section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    },
    getWorksList() {
      let _this = this;
      _this.work.list = [];
      _this.work.index = 0;
      _this.work.file = 0;

      this.axios
        .post("/api/gameWorks2/getExcellentWorks")
        .then(function(response) {
          if (response && response.data.code == "0") {
            for (let i = 0; i < response.data.data.length; i++) {
              let work = {
                title: response.data.data[i].worksName,
                author: response.data.data[i].gameWorks.author1,
                files: []
              };

              for (let j = 0; j < response.data.data[i].gameWorksFiles.length; j++) {
                work.files.push(response.data.data[i].gameWorksFiles[j].fileName);
              }
              _this.work.list.push(work);
            }
            _this.work.carousel = setTimeout(function f() {
              _this.work.index = (_this.work.index + 1) % _this.work.list.length;
              _this.work.file = 0;
              _this.work.scroll = _this.work.index - 2 >= 0 ? _this.work.index - 2 : 0;
              _this.work.carousel = setTimeout(f, _this.work.interval);
            }, _this.work.interval);
          } else {
            _this.$message({
              showClose: true,
              message: "获取优秀作品失败",
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            showClose: true,
            message: "获取优秀作品失败",
            type: "warning"
          });
        });
    },
    handleCarouselClick(index) {
      this.work.index = index;
      this.work.file = 0;
      const _this = this;
      window.clearTimeout(this.work.carousel);
      this.work.carousel = setTimeout(function f() {
        _this.work.index = (_this.work.index + 1) % _this.work.list.length;
        _this.work.file = 0;
        _this.work.scroll = _this.work.index - 2 >= 0 ? _this.work.index - 2 : 0;
        _this.work.carousel = setTimeout(f, _this.work.interval);
      }, _this.work.interval);
    },
    isImage: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif")) {
        return true;
      } else {
        return false;
      }
    },
    isVideo: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".flv")) {
        return true;
      } else {
        return false;
      }
    },
    isAudio: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".wma") || file.endsWith(".ogg")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-banner {
  min-width: @typical-width;
  height: 480px;
  position: relative;
  z-index: -1;

  .banner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    // background-size: contain;
    // background-repeat: no-repeat;
    transition: left 0.6s ease, opacity 0.6s, visibility 0.6s;
  }

  .banner.active {
    visibility: visible;
    opacity: 1;
  }

  .banner.hide {
    visibility: hidden;
    opacity: 0;
  }

  .banner-1 {
    background-image: url("../assets/images/banner2022/banner0829-s.jpg");
  }

  .banner-2 {
    background-image: url("../assets/images/banner2022/banner0829-s.jpg");
  }
}

.jinx-banner-navbar {
  width: @typical-width;
  height: 130px;
  margin: 0 auto;
  box-shadow: 0px 0px 43px 0px rgba(48, 4, 4, 0.18);
  border-radius: 6px;
  background: #ffffff;
  z-index: 1;
  margin-top: -65px;

  .nav {
    display: inline-block;
    width: 25%;
    text-align: center;
    cursor: pointer;

    .icon {
      display: inline-block;
      margin-top: 28px;
      width: 38px;
      height: 38px;
      background-size: contain;
    }

    .title {
      font-size: 16px;
      color: #666666;
      margin-top: 13px;
    }
  }
}

.jinx-contest-intro {
  padding: 50px 0;
  position: relative;
  width: @typical-width;
  margin: 0 auto;

  .title-en {
    color: @primary-color;
    font-size: 14px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 50px;
    margin-top: 10px;
    color: @primary-color-dark;
  }

  .intro {
    padding: 38px;
    padding-right: 463px;
    background: @primary-color-dark;
    color: #ffffff;
    text-indent: 2em;
  }

  .avatar {
    position: absolute;
    top: 180px;
    right: 20px;
    width: 423px;
    height: 428px;
    background-size: cover;
    background-position-x: center;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

.jinx-news {
  background: #faebe8;

  .news-pos {
    padding: 50px 0;
    position: relative;
    width: @typical-width;
    margin: 0 auto;

    .title-en {
      text-align: center;
      color: @primary-color;
      font-size: 14px;
    }

    .title {
      font-size: 24px;
      margin-bottom: 50px;
      margin-top: 10px;
      text-align: center;
      color: @primary-color-dark;
    }

    .news {
      position: relative;

      .rows {
        position: relative;
        .cols {
          display: inline-block;
          vertical-align: top;
          width: 50%;
          box-sizing: border-box;
          margin: 10px 0;
          padding-right: 20px;

          .news-panel {
            width: 100%;
            position: relative;
            background: #ffffff;
            padding: 20px;
            padding-left: 100px;
            box-sizing: border-box;
            border-radius: 6px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

            .date {
              position: absolute;
              left: 20px;
              width: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              top: 0;

              .date-pos {
                text-align: center;

                .date-day {
                  font-size: 40px;
                  color: #333333;
                }

                .date-month {
                  color: #999999;
                }
              }
            }

            .news-info {
              width: 100%;

              .news-title {
                font-weight: bold;
                margin: 5px 0;
                line-height: 30px;
                color: #333333;
                font-size: 16px;
                cursor: pointer;
                display: inline-block;
              }

              .news-title:hover {
                text-decoration: underline;
              }

              .news-body {
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #999999;
                line-height: 22px;
                font-size: 14px;
              }
            }
          }
        }
      }

      .rows::after {
        content: "";
        background: url("../assets/images/home/news_eclipse@2x.png");
        background-size: contain;
        height: 16px;
        width: 16px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -8px;
        margin-left: -8px;
        z-index: 2;
      }

      .cols.left {
        padding-right: 20px;
        padding-left: 0;
      }

      .cols.right {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    .news::after {
      content: "";
      width: 1px;
      background: rgba(210, 210, 210, 1);
      height: 90%;
      position: absolute;
      left: 50%;
      top: 5%;
      z-index: 1;
    }
  }
}

.jinx-works {
  .works-pos {
    padding: 50px 0;
    position: relative;
    width: @typical-width;
    margin: 0 auto;

    .title-en {
      text-align: center;
      color: @primary-color;
      font-size: 14px;
    }

    .title {
      font-size: 24px;
      margin-bottom: 50px;
      margin-top: 10px;
      text-align: center;
      color: @primary-color-dark;
    }

    .works-display {
      width: 760px;
      height: 760px;
      background: rgba(0, 0, 0, 1);
      border-radius: 16px;
      margin: 0 auto;
      padding: 15px 14px;
      box-sizing: border-box;

      .works-body {
        width: 732px;
        height: calc(100% - 60px);
        border-radius: 16px;
        position: relative;

        .left {
          position: absolute;
          height: 30px;
          width: 16px;
          top: calc(50% - 15px);
          left: -50px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          background: url("../assets/images/home/works_left.png");
          cursor: pointer;
        }

        .right {
          position: absolute;
          height: 30px;
          width: 16px;
          top: calc(50% - 15px);
          right: -50px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          background: url("../assets/images/home/works_right.png");
          cursor: pointer;
        }

        .works-file {
          height: 100%;
          width: 100%;

          .image {
            height: 100%;
            width: 100%;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
          }

          .video {
            height: 100%;
            width: 100%;
          }
        }
      }

      .works-info {
        text-align: right;
        margin-top: 20px;

        .author {
          font-size: 16px;
          display: inline-block;
          vertical-align: middle;
          color: #ffffff;
          margin-right: 20px;
        }

        .avatar {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 1);
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }

    .works-carousel {
      width: 784px;
      height: 110px;
      position: relative;
      margin: 0 auto;
      margin-top: 30px;

      .left {
        position: absolute;
        height: 30px;
        width: 16px;
        top: 40px;
        left: -24px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background: url("../assets/images/home/works_left.png");
        cursor: pointer;
      }

      .right {
        position: absolute;
        height: 30px;
        width: 16px;
        top: 40px;
        right: -24px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background: url("../assets/images/home/works_right.png");
        cursor: pointer;
      }

      .works-list {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .works-list-scroll {
          height: 100%;
          width: 100%;
          white-space: nowrap;
          position: absolute;
          top: 0;
          left: 0;
          transition: left 0.3s;

          .works-item-pos {
            display: inline-block;
            vertical-align: middle;
            width: 33.33333%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 12px;

            .works {
              background: #000000;
              width: 100%;
              height: 100%;
              cursor: pointer;

              .image {
                height: 100%;
                width: 100%;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
              }

              .video {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}

@download-width: @typical-width + 30;
.jinx-download {
  .download-pos {
    padding: 50px 0;
    position: relative;
    width: @typical-width;
    margin: 0 auto;

    .title-en {
      text-align: center;
      color: @primary-color;
      font-size: 14px;
    }

    .title {
      font-size: 24px;
      margin-bottom: 50px;
      margin-top: 10px;
      text-align: center;
      color: @primary-color-dark;
    }

    .material-panel {
      width: @download-width;
      margin-left: -15px;

      .material-pos {
        width: 33.3333%;
        height: 200px;
        display: inline-block;
        padding: 15px;
        box-sizing: border-box;

        .material {
          width: 100%;
          height: 100%;
          background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          background-size: contain;
          border-radius: 6px;
          position: relative;

          .material-title {
            width: 100%;
            height: 40px;
            background: rgba(0, 0, 0, 0.8);
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: center;
            color: #ffffff;
            border-radius: 0 0 6px 6px;
            line-height: 40px;
          }
        }
      }
    }
  }
}

@links-width: @typical-width + 30;
.jinx-links {
  background: #faebe8;

  .links-pos {
    padding: 50px 0;
    position: relative;
    width: @typical-width;
    margin: 0 auto;

    .title-en {
      text-align: center;
      color: @primary-color;
      font-size: 14px;
    }

    .title {
      font-size: 24px;
      margin-bottom: 50px;
      margin-top: 10px;
      text-align: center;
      color: @primary-color-dark;
    }

    .links-panel {
      width: @links-width;
      margin-left: -15px;
      text-align: center;

      .item-pos {
        display: inline-block;
        height: 60px;
        box-sizing: border-box;
        padding: 0 15px;

        .link-item {
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12px;
          box-sizing: border-box;
        }
      }
    }
  }
}

.jinx-contactus {
  height: 340px;
  position: relative;

  .contactus-pos {
    position: absolute;
    width: 100%;
    top: 100px;
    height: 340px;

    .contactus {
      padding: 50px 0;
      width: @typical-width;
      height: 340px;
      box-sizing: border-box;
      margin: 0 auto;
      color: #ffffff;
      background-size: cover;
      background-color: @primary-color;
      text-align: center;

      .title-en {
        font-size: 14px;
      }

      .title {
        font-size: 24px;
        margin-bottom: 50px;
        margin-top: 10px;
      }
    }
  }
}

.jinx-footer {
  min-width: @typical-width;
  padding-top: 130px;
  background: #292929;

  div {
    margin: 0 auto;
    color: #fff;
    padding: 8px 0;
    text-align: center;
  }

  a {
    color: #fff;
  }

  div:first-child {
    padding-top: 30px;
  }

  div:last-child {
    padding-bottom: 30px;
  }
}
</style>
