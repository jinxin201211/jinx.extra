<template>
  <div style="padding-top: 102px;">
    <jinx-top-nav style="position: absolute; top: 0; z-index: 2;"></jinx-top-nav>
    <jinx-nav-menu2 :menu="menuList2" style="position: absolute; top: 42px; z-index: 1;"></jinx-nav-menu2>
    <div id="anchor_home" class="jinx-banner" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner.jpg') + ')' }"></div>
    <jinx-nav-menu :menu="menuList" v-if="false"></jinx-nav-menu>
    <div class="content" v-if="false">
      <router-view></router-view>
    </div>

    <div id="anchor_contest_intro" style="padding: 50px; color: #cf321f; position: relative; width: 1058px; margin: 0 auto;">
      <div>Contest Intro</div>
      <div style="font-size: 25px; margin-bottom: 30px; margin-top: 5px;">大赛介绍</div>
      <div style="padding: 30px; padding-right: 400px; background: #cf321f; color: #ffffff; text-indent: 2em;">
        <p>全国大学生广告艺术大赛（简称大广赛）自2005年首次举办至今，遵循“促进教改、启迪智慧、强化能力、提高素质”的大赛宗旨，成功举办了11届12次赛事。第11届大广赛全国共有1504所高校参与，超过百万学生提交作品。大广赛发挥了大学生群体的智慧和创造力，培养了大学生的创新意识和解决问题的能力，展示了新一代大学生的学识水平和精神风貌，迄今为止已成为规模庞大、覆盖高等院校广泛、参与师生人数众多、作品水准很高的全国性高校文科竞赛。</p>
        <p>参赛作品分为平面类、视频类、动画类、互动类、广播类、策划案类、文案类、营销创客类、公益类九大类。</p>
        <p>大广赛整合社会资源、服务教学改革，以企业真实营销项目作为命题，与教学相结合，真题真做，指导学生了解受众，调研分析，提出策略，现场提案，实现教学与市场相关联；大学与企业、行业交互，线上、线下互动分享、交流，提升了学生实践能力，产生了大量优秀作品，不仅使企业收获鲜活的、有创意的作品，也建树了有活力的年轻品牌形象，让企业的文化理念、产品在大学生这个庞大的群体中得到有效的推广，产生了深远影响。</p>
        <p>大广赛秉持公平公正的办赛原则，聘请学界、业界资深专家、学者和企业高管组成专业评审团，评选参赛作品，并将评审后的作品进行网络公示，杜绝抄袭，不断提升赛事的公信力。</p>
      </div>
      <div style="position: absolute; top: 50px; right: 80px; width: 340px; height: 450px; background: #ffffff; box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);"></div>
    </div>

    <div id="anchor_news" style="background: #faebe8;">
      <div style="padding: 50px; position: relative; width: 1058px; margin: 0 auto;">
        <div style="text-align: center; color: #cf321f;">NEWS</div>
        <div style="font-size: 25px; margin-bottom: 30px; margin-top: 5px; text-align: center; color: #cf321f;">新闻动态</div>
        <div>
          <div style="display: inline-block; width: 50%; box-sizing: border-box; margin: 10px 0; padding-right: 20px;">
            <div style="width: 100%; position: relative; background: #ffffff; padding: 20px; padding-left: 100px; box-sizing: border-box; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15">
              <div style="position: absolute; left: 20px; width: 60px; display: flex; justify-content: center; align-items: center; height: 100%; top: 0;">
                <div style="text-align: center;">
                  <div style="font-size: 30px;">11</div>
                  <div style="color: #666666;">2020-05</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div style="font-weight: bold; margin: 5px 0; line-height: 30px;">这是一条新闻标题</div>
                <div style="text-overflow: -o-ellipsis-lastline; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; color: #666666; line-height: 22px;">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
              </div>
            </div>
          </div>

          <div style="display: inline-block; width: 50%; box-sizing: border-box; margin: 10px 0; padding-left: 20px;">
            <div style="width: 100%; position: relative; background: #ffffff; padding: 20px; padding-left: 100px; box-sizing: border-box; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15">
              <div style="position: absolute; left: 20px; width: 60px; display: flex; justify-content: center; align-items: center; height: 100%; top: 0;">
                <div style="text-align: center;">
                  <div style="font-size: 30px;">11</div>
                  <div style="color: #666666;">2020-05</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div style="font-weight: bold; margin: 5px 0; line-height: 30px;">这是一条新闻标题</div>
                <div style="text-overflow: -o-ellipsis-lastline; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; color: #666666; line-height: 22px;">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
              </div>
            </div>
          </div>

          <div style="display: inline-block; width: 50%; box-sizing: border-box; margin: 10px 0; padding-right: 20px;">
            <div style="width: 100%; position: relative; background: #ffffff; padding: 20px; padding-left: 100px; box-sizing: border-box; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15">
              <div style="position: absolute; left: 20px; width: 60px; display: flex; justify-content: center; align-items: center; height: 100%; top: 0;">
                <div style="text-align: center;">
                  <div style="font-size: 30px;">11</div>
                  <div style="color: #666666;">2020-05</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div style="font-weight: bold; margin: 5px 0; line-height: 30px;">这是一条新闻标题</div>
                <div style="text-overflow: -o-ellipsis-lastline; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; color: #666666; line-height: 22px;">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
              </div>
            </div>
          </div>

          <div style="display: inline-block; width: 50%; box-sizing: border-box; margin: 10px 0; padding-left: 20px;">
            <div style="width: 100%; position: relative; background: #ffffff; padding: 20px; padding-left: 100px; box-sizing: border-box; border-radius: 6px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);">
              <div style="position: absolute; left: 20px; width: 60px; display: flex; justify-content: center; align-items: center; height: 100%; top: 0;">
                <div style="text-align: center;">
                  <div style="font-size: 30px;">11</div>
                  <div style="color: #666666;">2020-05</div>
                </div>
              </div>
              <div style="width: 100%;">
                <div style="font-weight: bold; margin: 5px 0; line-height: 30px;">这是一条新闻标题</div>
                <div style="text-overflow: -o-ellipsis-lastline; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; color: #666666; line-height: 22px;">5月12日下午14:00，第12届全国大学生广告艺术大赛各赛区负责人沟通会借助腾讯会议平台在线举行。全国29个赛区负责人、联络人及赛区相关工作人员代表准时参会。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_download" style="padding: 50px; position: relative; width: 1058px; margin: 0 auto;">
      <div style="text-align: center; color: #cf321f;">Download</div>
      <div style="font-size: 25px; margin-bottom: 30px; margin-top: 5px; text-align: center; color: #cf321f;">素材下载</div>
      <div>
        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>

        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>

        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>

        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>

        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>

        <div style="width: 33.3333%; height: 200px; display: inline-block; padding: 15px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; background: url(http://www.sun-ada.net/data/img/2002/5e4e79d2c9028.jpg); box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); background-size: contain; border-radius: 6px; position: relative;">
            <div style="width: 100%; height: 40px; background: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; text-align: center; color: #ffffff; border-radius: 0 0 6px 6px; line-height: 40px;">
              公益命题：战“疫”
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_link" style="background: #faebe8;">
      <div style="padding: 50px; position: relative; width: 1058px; margin: 0 auto;">
        <div style="text-align: center; color: #cf321f;">LINK</div>
        <div style="font-size: 25px; margin-bottom: 30px; margin-top: 5px; text-align: center; color: #cf321f;">友情链接</div>
        <div>
          <div style="display: inline-block; width: 25%; box-sizing: border-box; padding: 0 10px;">
            <div style="width: 100%; height: 60px; background: #ffffff;"></div>
          </div>
          <div style="display: inline-block; width: 25%; box-sizing: border-box; padding: 0 10px;">
            <div style="width: 100%; height: 60px; background: #ffffff;"></div>
          </div>
          <div style="display: inline-block; width: 25%; box-sizing: border-box; padding: 0 10px;">
            <div style="width: 100%; height: 60px; background: #ffffff;"></div>
          </div>
          <div style="display: inline-block; width: 25%; box-sizing: border-box; padding: 0 10px;">
            <div style="width: 100%; height: 60px; background: #ffffff;"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="anchor_contact_us" style="height: 380px; position: relative;">
      <div style="position: absolute; width: 100%; top: 100px;">
        <div style="padding: 50px; width: 1058px; margin: 0 auto; background: #df4a50; color: #ffffff;">
          <div style="text-align: center;">CONTACT US</div>
          <div style="font-size: 25px; margin-bottom: 30px; margin-top: 5px; text-align: center;">联系我们</div>
          <div style="text-align: center; line-height: 30px;">地址：北京市朝阳区广渠门外大街8号</div>
          <div style="text-align: center; line-height: 30px;">邮编：100022</div>
          <div style="text-align: center; line-height: 30px;">电话：800800800</div>
          <div style="text-align: center; margin-top: 30px;">
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff; margin-right: 30px;"></div>
            <div style="display: inline-block; height: 100px; width: 100px; background: #ffffff;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer clear">
      <div>版权所有 2015-2025 <a href="http://www.people-media.cn/" target="_blank">人民日报传媒广告有限公司</a></div>
      <div>Copyright @ 2015-2025 <a href="http://www.people-media.cn/" target="_blank">www.people-media.cn</a></div>
      <div>京ICP备13004043号-5</div>
    </div>
  </div>
</template>

<script>
import JinxNavMenu from "@/components/JinxNavMenu.vue";
import JinxNavMenu2 from "@/components/JinxNavMenu2.vue";
import JinxTopNav from "@/components/JinxTopNav.vue";

export default {
  name: "Home",
  components: { JinxNavMenu, JinxNavMenu2, JinxTopNav },
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
  methods: {}
};
</script>

<style lang="less" scoped>
.jinx-banner {
  min-width: @typical-width;
  height: 357px;
  color: #000;
  // background-image: url(/assets/images/banner.jpg);
  background-position: center;
}

.footer {
  min-width: 1058px;
  // margin-top: 98px;
  padding-top: 160px;
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
