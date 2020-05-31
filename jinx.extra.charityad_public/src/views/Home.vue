<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;" :authorize="true" @scrolltoview="handleScrollToView"></jinx-top-nav>
    <jinx-nav-menu :menu="menuList" style="position: absolute; top: 42px; z-index: 1;" @scrolltoview="handleScrollToView"></jinx-nav-menu>
    <!--<div id="anchor_home" class="jinx-banner" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner.jpg') + ')' }">-->
    <div id="anchor_home" class="jinx-banner">
      <div class="banner banner-1" :class="{ active: bannerShow === 0, hide: bannerShow !== 0 }"></div>
      <div class="banner banner-2" :class="{ active: bannerShow === 1, hide: bannerShow !== 1 }"></div>
      <div class="banner banner-3" :class="{ active: bannerShow === 2, hide: bannerShow !== 2 }"></div>
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
        <p>河北省公益广告大赛于2020年首次举办，以“河北省市场监督管理局”为主办单位，以“河北省广告研究院、河北省广告协会、河北广播电视台”为承办单位，在河北省委省政府深入开展“三创四建”活动的大背景下，为创建全国文明城市、弘扬社会主义核心价值观，在全社会积极倡导“讲文明树新风”的良好社会风尚，凝聚新时代全面建设经济强省、美丽河北的磅礴力量，共同组织开展2020河北省公益广告大赛。</p>
        <p>本次大赛以“文明河北我创益”为主题，征稿作品主题细分为“中国梦”系列、“自然+环境”系列、“消费者权益保护+知识产权”系列、“社会+安全”系列、“传承+关爱”系列、“成长+校园”系列、“美丽河北”系列七大系列。</p>
        <p>参赛作品分为平面类、文案类、广播类、视频类、动画类、互动类六大类。</p>
        <p>大赛落地“三创四建”，推进文明城市建设。对于深入推进我省全国文明城市创建工作具有重要作用。同时集合专业与社会力量，发挥公益广告导向作用。倡导公益风尚，呼唤社会关注。通过遴选并在众多媒体展播相关优秀作品资源，发挥各大媒体传播优势，将公益广告蕴含的社会正能量向社会大众广泛传播。此外，公益广告大赛将作为河北公益广告业发展的重要吸引核，推进人才、资源交流，以赛促学，以赛促交流，以赛促大发展，在业内进一步完善人才和资源交流，促进河北公益事业发展。</p>
        <p>大赛秉持公平公正的办赛原则，聘请学界、业界资深专家、学者和企业高管组成专业评审团，评选参赛作品，并将评审后的作品进行网络公示，杜绝抄袭，不断提升赛事的公信力。</p>
      </div>
      <div class="avatar" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/醉美河北.png') + ')' }"></div>
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
                    <div class="date-day" v-text="item.col1.date">11</div>
                    <div class="date-month" v-text="item.col1.month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title" v-text="item.col1.title" @click="handleViewNews(item.col1.id)">这是一条新闻标题</div>
                  <div class="news-body" v-html="item.col1.content">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>

            <div class="cols right" v-if="item.col2 != null">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day" v-text="item.col2.date">11</div>
                    <div class="date-month" v-text="item.col2.month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title" v-text="item.col2.title" @click="handleViewNews(item.col2.id)">这是一条新闻标题</div>
                  <div class="news-body" v-html="item.col2.content">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
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
            <span class="author" v-text="work.list.length > 0 ? work.list[work.index].author : ''">作者名字</span>
            <span class="avatar"></span>
          </div>
        </div>

        <div class="works-carousel">
          <div v-show="work.scroll > 0" class="left" @click="work.scroll--"></div>
          <div class="works-list">
            <div class="works-list-scroll" :style="{ left: 261.33 * -1 * work.scroll + 'px' }">
              <div class="works-item-pos" v-for="(item, index) in work.list" :key="'excellent_work' + index">
                <div
                  class="works"
                  @click="
                    work.index = index;
                    work.file = 0;
                  "
                >
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
            <div class="link-item"><el-link href="http://scjg.hebei.gov.cn/" target="_blank">河北省市场监督管理局</el-link></div>
          </div>
          <div class="item-pos">
            <div class="link-item"><el-link href="http://www.hebtu.edu.cn/" target="'_blank'">河北师范大学</el-link></div>
          </div>
          <div class="item-pos">
            <div class="link-item"><el-link href="http://xwcbxy.hebtu.edu.cn/a/2019/04/19/AE56753B9B30477D8B23405AA82DCF18.html" target="_blank">河北省广告研究院</el-link></div>
          </div>
          <div class="item-pos">
            <div class="link-item"><el-link href="http://www.hbggw.com.cn/" target="_blank">河北省广告协会</el-link></div>
          </div>
          <div class="item-pos">
            <div class="link-item"><el-link href="http://www.hebtv.com/" target="_blank">河北广播电视台</el-link></div>
          </div>
          <div class="item-pos">
            <div class="link-item"><el-link href="http://www.heb315.org.cn/" target="_blank">河北省消费者权益保护委员会</el-link></div>
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
      <div>版权所有&nbsp;2020&nbsp;河北省公益广告大赛&nbsp;（hbsggyjy.hebtu.edu.cn）</div>
      <div><span style="display: inline-block; vertical-align: bottom; margin-right: 20px;">© 2020&nbsp;</span><el-link :href="'http://hbsggyjy.hebtu.edu.cn'">hbsggyjy.hebtu.edu.cn</el-link></div>
      <div>京ICP备06010242号-2 工业和信息化部备案管理系统（http://beian.miit.gov.cn）网站统计</div>
    </div>
  </div>
</template>

<script>
import JinxNavMenu from "@/components/JinxNavMenu.vue";
import JinxTopNav from "@/components/JinxTopNav.vue";
import qs from "qs";
import moment from "moment";

export default {
  name: "Home",
  components: { JinxNavMenu, JinxTopNav },
  data: function() {
    return {
      menuList: [
        { title: "首页", path: "anchor_home" },
        { title: "大赛介绍", path: "anchor_contest_intro" },
        { title: "新闻动态", path: "anchor_news" },
        { title: "作品展示", path: "anchor_works" },
        { title: "联系我们", path: "anchor_contact_us" }
      ],
      newsList: [],
      bannerShow: 0,
      work: {
        list: [],
        index: 0,
        scroll: 0,
        select: {},
        file: 0
      }
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
  },
  methods: {
    turnBannerCarousel: function() {
      let that = this;
      let time = 0;
      setTimeout(function f() {
        that.bannerShow = time % 3;
        time++;
        setTimeout(f, 10000);
      }, 0);
    },
    getNewsList() {
      // this.loading = true;
      let that = this;
      that.newsList = [];
      let month_dict = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      this.axios
        .post("/api/gameNews/getData", qs.stringify(this.query))
        .then(function(response) {
          if (response && response.data.code == "0") {
            for (let i = 0; i < response.data.data.length; i += 2) {
              let newsRow = { col1: null, col2: null };
              if (i < response.data.data.length) {
                newsRow.col1 = {
                  id: response.data.data[i].id,
                  title: response.data.data[i].title,
                  content: response.data.data[i].content.replace(/<[^>]*>|/g, ""),
                  time: response.data.data[i].utime,
                  date: moment(response.data.data[i].utime).get("date"),
                  month: moment(response.data.data[i].utime).get("year") + "-" + month_dict[moment(response.data.data[i].utime).get("month")]
                };
              }
              if (i + 1 < response.data.data.length) {
                newsRow.col2 = {
                  id: response.data.data[i + 1].id,
                  title: response.data.data[i + 1].title,
                  content: response.data.data[i + 1].content.replace(/<[^>]*>|/g, ""),
                  time: response.data.data[i + 1].utime,
                  date: moment(response.data.data[i + 1].utime).get("date"),
                  month: moment(response.data.data[i + 1].utime).get("year") + "-" + month_dict[moment(response.data.data[i + 1].utime).get("month")]
                };
              }
              that.newsList.push(newsRow);
            }
            // that.NewsList = response.data.data;
            // that.total = response.data.count;
            // that.$message({
            //   showClose: true,
            //   message: "发布成功",
            //   type: "success"
            // });
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          // that.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          // that.loading = false;
          that.$message({
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
        window.location.href = "http://hbsggyjy.hebtu.edu.cn";
      } else {
        let section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    scrollToSection(path) {
      if (path == "anchor_home") {
        window.location.href = "http://hbsggyjy.hebtu.edu.cn";
      } else {
        let section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    getWorksList() {
      // this.loading = true;
      let that = this;
      that.work.list = [];
      that.work.index = 0;
      that.work.file = 0;
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字1",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005141017290497_视频%20免费下载%20-%20爱给网.mp4", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字2",
      //   files: ["202005141017290497_视频%20免费下载%20-%20爱给网.mp4", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字3",
      //   files: ["202005141017290497_视频%20免费下载%20-%20爱给网.mp4", "202005141017290497_视频%20免费下载%20-%20爱给网.mp4", "202005141017290497_视频%20免费下载%20-%20爱给网.mp4"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字4",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字5",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字6",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字7",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字8",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字9",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });
      // that.work.list.push({
      //   title: "",
      //   author: "作者名字10",
      //   files: ["202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg", "202005111736510487_C%E3%80%81%E8%A1%8C%E9%A9%B6%E8%AF%81%E7%85%A7%E7%89%87.jpg"]
      // });

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
              that.work.list.push(work);
            }
            console.log(that.work.list);
          } else {
            that.$message({
              showClose: true,
              message: "获取优秀作品失败",
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "获取优秀作品失败",
            type: "warning"
          });
        });
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
  // color: #000;
  // background-color: @primary-color;
  // background-position: center;
  // background-size: cover;
  // background-image: url("../assets/images/广告大赛网站图2.png");
  position: relative;
  z-index: -1;

  .banner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
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
    // background-color: #ffffff;
    background-image: url("../assets/images/banner1.png");
  }

  .banner-2 {
    // background-color: #b70102;
    background-image: url("../assets/images/banner2.jpg");
  }

  .banner-3 {
    background-image: url("../assets/images/banner3.png");
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
  // padding-top: 165px;
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
    // position: absolute;
    // top: 50px;
    // right: 0;
    // width: 463px;
    // height: 523px;
    // background-size: contain;
    position: absolute;
    top: 50px;
    right: 20px;
    width: 423px;
    height: 536px;
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
      height: 460px;
      background: rgba(0, 0, 0, 1);
      border-radius: 16px;
      margin: 0 auto;
      padding: 30px 14px;
      box-sizing: border-box;

      .works-body {
        width: 732px;
        height: 350px;
        border-radius: 16px;
        background: #ffffff;
        position: relative;

        .left {
          position: absolute;
          height: 30px;
          width: 16px;
          top: 160px;
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
          top: 160px;
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
        // overflow-x: auto;

        .works-list-scroll {
          height: 100%;
          width: 100%;
          // width: auto;
          // overflow-y: hidden;
          // overflow-x: auto;
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
        // width: 20%;
        height: 60px;
        box-sizing: border-box;
        padding: 0 15px;
        // line-height: 60px;
        // text-align: center;

        .link-item {
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 15px;
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
      // background-image: url("../assets/images/home/contact_us_back.png");
      background-size: cover;
      background-color: @primary-color;
      text-align: center;

      .title-en {
        // text-align: center;
        // color: @primary-color;
        font-size: 14px;
      }

      .title {
        font-size: 24px;
        margin-bottom: 50px;
        margin-top: 10px;
        // text-align: center;
        // color: @primary-color-dark;
      }
    }
  }
}

.jinx-footer {
  min-width: @typical-width;
  // margin-top: 98px;
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
