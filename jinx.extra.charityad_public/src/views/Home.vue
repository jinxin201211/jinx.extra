<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;"></jinx-top-nav>
    <jinx-nav-menu2 :menu="menuList2" style="position: absolute; top: 42px; z-index: 1;"></jinx-nav-menu2>
    <div id="anchor_home" class="jinx-banner" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner.jpg') + ')' }">
      <div class="banner-navbar-pos">
        <div class="banner-navbar">
          <div class="nav">
            <div>
              <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner大赛介绍@2x.png') + ')' }"></div>
              <div class="title">大赛介绍</div>
            </div>
          </div>
          <div class="nav">
            <div>
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
            <div @click="$router.push('/work/convenant')">
              <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner作品提交@2x.png') + ')' }"></div>
              <div class="title">作品提交</div>
            </div>
          </div>
          <div class="nav">
            <div>
              <div class="icon" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/banner结果查询@2x.png') + ')' }"></div>
              <div class="title">结果查询</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_contest_intro" class="jinx-contest-intro">
      <div class="title-en">Contest Intro</div>
      <div class="title">大赛介绍</div>
      <div class="intro">
        <p>全国大学生广告艺术大赛（简称大广赛）自2005年首次举办至今，遵循“促进教改、启迪智慧、强化能力、提高素质”的大赛宗旨，成功举办了11届12次赛事。第11届大广赛全国共有1504所高校参与，超过百万学生提交作品。大广赛发挥了大学生群体的智慧和创造力，培养了大学生的创新意识和解决问题的能力，展示了新一代大学生的学识水平和精神风貌，迄今为止已成为规模庞大、覆盖高等院校广泛、参与师生人数众多、作品水准很高的全国性高校文科竞赛。</p>
        <p>参赛作品分为平面类、视频类、动画类、互动类、广播类、策划案类、文案类、营销创客类、公益类九大类。</p>
        <p>大广赛整合社会资源、服务教学改革，以企业真实营销项目作为命题，与教学相结合，真题真做，指导学生了解受众，调研分析，提出策略，现场提案，实现教学与市场相关联；大学与企业、行业交互，线上、线下互动分享、交流，提升了学生实践能力，产生了大量优秀作品，不仅使企业收获鲜活的、有创意的作品，也建树了有活力的年轻品牌形象，让企业的文化理念、产品在大学生这个庞大的群体中得到有效的推广，产生了深远影响。</p>
        <p>大广赛秉持公平公正的办赛原则，聘请学界、业界资深专家、学者和企业高管组成专业评审团，评选参赛作品，并将评审后的作品进行网络公示，杜绝抄袭，不断提升赛事的公信力。</p>
      </div>
      <div class="avatar" :style="{ backgroundImage: 'url(' + require('@/assets/images/home/contest_intro_avatar@2x.png') + ')' }"></div>
    </div>

    <div id="anchor_news" class="jinx-news">
      <div class="news-pos">
        <div class="title-en">NEWS</div>
        <div class="title">新闻动态</div>
        <div class="news">
          <div class="rows">
            <div class="cols left">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>

            <div class="cols right">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div class="cols left">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>

            <div class="cols right">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div class="cols left">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
                </div>
              </div>
            </div>

            <div class="cols right">
              <div class="news-panel">
                <div class="date">
                  <div class="date-pos">
                    <div class="date-day">11</div>
                    <div class="date-month">2020-05</div>
                  </div>
                </div>
                <div class="news-info">
                  <div class="news-title">这是一条新闻标题</div>
                  <div class="news-body">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
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
          <div class="works-body"></div>
          <div class="works-info">
            <span class="author">作者名字</span>
            <span class="avatar"></span>
          </div>
        </div>

        <div class="works-carousel">
          <div class="left"></div>
          <div class="works-list">
            <div class="works-item-pos">
              <div class="works"></div>
            </div>
            <div class="works-item-pos">
              <div class="works"></div>
            </div>
            <div class="works-item-pos">
              <div class="works"></div>
            </div>
          </div>
          <div class="right"></div>
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
            <div class="link-item"></div>
          </div>
          <div class="item-pos">
            <div class="link-item"></div>
          </div>
          <div class="item-pos">
            <div class="link-item"></div>
          </div>
          <div class="item-pos">
            <div class="link-item"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_contact_us" class="jinx-contactus">
      <div class="contactus-pos">
        <div class="contactus">
          <div class="title-en">CONTACT US</div>
          <div class="title">联系我们</div>
          <div style="margin-top: 13px;">地址：北京市朝阳区广渠门外大街8号</div>
          <div style="margin-top: 13px;">邮编：100022</div>
          <div style="margin-top: 13px;">电话：800800800</div>
          <div style="text-align: center; margin-top: 28px;">
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="jinx-footer">
      <div>版权所有&nbsp;2005-2020&nbsp;全国大学生广告艺术大赛&nbsp;（www.sun-ada.net）</div>
      <div>Copyright ＠ 2005-2020&nbsp;www.sun-ada.net All rights reserved.</div>
      <div>京ICP备06010242号-2 工业和信息化部备案管理系统（http://beian.miit.gov.cn）网站统计</div>
    </div>
  </div>
</template>

<script>
import JinxNavMenu2 from "@/components/JinxNavMenu2.vue";
import JinxTopNav from "@/components/JinxTopNav.vue";

export default {
  name: "Home",
  components: { JinxNavMenu2, JinxTopNav },
  data: function() {
    return {
      menuList: [
        { title: "首页", path: "/" },
        { title: "活动简介", path: "introduce" },
        { title: "新闻动态", path: "news" },
        {
          title: "作品征集",
          path: "collect",
          children: [
            { title: "征集办法", path: "collect" },
            { title: "奖项设置", path: "awards" },
            { title: "作品展示", path: "works" }
          ]
        },
        { title: "往届回顾", path: "history" },
        { title: "关于我们", path: "about" }
      ],
      menuList2: [
        { title: "首页", path: "anchor_home" },
        { title: "大赛介绍", path: "anchor_contest_intro" },
        { title: "新闻动态", path: "anchor_news" },
        { title: "联系我们", path: "anchor_contact_us" },
        { title: "素材下载", path: "anchor_download" }
      ]
    };
  },
  mounted: function() {},
  methods: {
    getNewsList() {}
  }
};
</script>

<style lang="less" scoped>
.jinx-banner {
  min-width: @typical-width;
  height: 480px;
  color: #000;
  background-position: center;
  background-size: cover;
  position: relative;

  .banner-navbar-pos {
    position: absolute;
    bottom: -65px;
    left: 0;
    width: 100%;

    .banner-navbar {
      width: @typical-width;
      height: 130px;
      margin: 0 auto;
      box-shadow: 0px 0px 43px 0px rgba(48, 4, 4, 0.18);
      border-radius: 6px;
      background: #ffffff;

      .nav {
        display: inline-block;
        width: 20%;
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
  }
}

.jinx-contest-intro {
  padding: 50px 0;
  padding-top: 115px;
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
    top: 115px;
    right: 0;
    width: 463px;
    height: 523px;
    background-size: contain;
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
        width: 100%;
        height: 100%;

        .works-item-pos {
          display: inline-block;
          width: 33.33333%;
          height: 100%;
          box-sizing: border-box;
          padding: 0 12px;

          .works {
            background: #000000;
            width: 100%;
            height: 100%;
            cursor: pointer;
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

      .item-pos {
        display: inline-block;
        width: 25%;
        height: 60px;
        box-sizing: border-box;
        padding: 0 15px;

        .link-item {
          width: 100%;
          height: 100%;
          background: #ffffff;
        }
      }
    }
  }
}

.jinx-contactus {
  height: 430px;
  position: relative;

  .contactus-pos {
    position: absolute;
    width: 100%;
    top: 100px;
    height: 430px;

    .contactus {
      padding: 50px 0;
      width: @typical-width;
      height: 430px;
      box-sizing: border-box;
      margin: 0 auto;
      color: #ffffff;
      background-image: url("../assets/images/home/contact_us_back.png");
      background-size: contain;
      background-color: @primary-color;
      text-align: center;

      .title-en {
        // text-align: center;
        // color: @primary-color;
        font-size: 14px;
      }

      .title {
        font-size: 24px;
        margin-bottom: 60px;
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
