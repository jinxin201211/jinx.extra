import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account/Main.vue"),
    children: [
      {
        name: "signin",
        path: "signin",
        component: () => import("../views/Account/Signin.vue"),
        meta: {
          title: "登录",
          access: false
        }
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("../views/Account/Signup.vue"),
        meta: {
          title: "注册",
          access: false
        }
      },
      {
        name: "agreement",
        path: "agreement",
        component: () => import("../views/Account/Agreement.vue"),
        meta: {
          title: "注册协议",
          access: false
        }
      },
      {
        name: "reset",
        path: "reset",
        component: () => import("../views/Account/Reset.vue"),
        meta: {
          title: "重置密码",
          access: false
        }
      }
    ]
  },
  {
    path: "/m/account",
    name: "mobileAccount",
    component: () => import("../views-mobile/Account/Main.vue"),
    children: [
      {
        name: "mobileSignin",
        path: "signin",
        component: () => import("../views-mobile/Account/Signin.vue"),
        meta: {
          title: "登录",
          access: false
        }
      },
      {
        name: "mobileSignup",
        path: "signup",
        component: () => import("../views-mobile/Account/Signup.vue"),
        meta: {
          title: "注册",
          access: false
        }
      },
      {
        name: "mobileAgreement",
        path: "agreement",
        component: () => import("../views-mobile/Account/Agreement.vue"),
        meta: {
          title: "注册协议",
          access: false
        }
      },
      {
        name: "mobileReset",
        path: "reset",
        component: () => import("../views-mobile/Account/Reset.vue"),
        meta: {
          title: "重置密码",
          access: false
        }
      }
    ]
  },
  {
    path: "/work",
    name: "work",
    component: () => import("../views/Work/Main.vue"),
    children: [
      {
        name: "getconvenant",
        path: "getconvenant",
        component: () => import("../views/Work/EnterStepConvenant.vue"),
        meta: {
          title: "勾选承诺书",
          access: true
        }
      },
      {
        name: "grouppublic",
        path: "grouppublic",
        component: () => import("../views/Work/EnterStepPublicForm.vue"),
        meta: {
          title: "专业组、公众组报名表",
          access: true
        }
      },
      {
        name: "groupteens",
        path: "groupteens",
        component: () => import("../views/Work/EnterStepTeensForm.vue"),
        meta: {
          title: "青少年组报名表",
          access: true
        }
      },
      {
        name: "groupschool",
        path: "groupschool",
        component: () => import("../views/Work/EnterStepSchoolForm.vue"),
        meta: {
          title: "高校组报名表",
          access: true
        }
      },
      {
        name: "file",
        path: "file",
        component: () => import("../views/Work/EnterStepFile.vue"),
        meta: {
          title: "作品上传",
          access: true
        }
      },
      {
        name: "finish",
        path: "finish",
        component: () => import("../views/Work/EnterStepFinish.vue"),
        meta: {
          title: "结束提交",
          access: true
        }
      }
    ]
  },
  {
    path: "/m/work",
    name: "mobileWork",
    component: () => import("../views-mobile/Work/Main.vue"),
    children: [
      {
        name: "mobileGetconvenant",
        path: "getconvenant",
        component: () => import("../views-mobile/Work/EnterStepConvenant.vue"),
        meta: {
          title: "勾选承诺书",
          access: true
        }
      },
      {
        name: "mobileGrouppublic",
        path: "grouppublic",
        component: () => import("../views-mobile/Work/EnterStepPublicForm.vue"),
        meta: {
          title: "专业组、公众组报名表",
          access: true
        }
      },
      {
        name: "mobileGroupteens",
        path: "groupteens",
        component: () => import("../views-mobile/Work/EnterStepTeensForm.vue"),
        meta: {
          title: "青少年组报名表",
          access: true
        }
      },
      {
        name: "mobileGroupschool",
        path: "groupschool",
        component: () => import("../views-mobile/Work/EnterStepSchoolForm.vue"),
        meta: {
          title: "高校组报名表",
          access: true
        }
      },
      {
        name: "mobileFile",
        path: "file",
        component: () => import("../views-mobile/Work/EnterStepFile.vue"),
        meta: {
          title: "作品上传",
          access: true
        }
      },
      {
        name: "mobileFinish",
        path: "finish",
        component: () => import("../views-mobile/Work/EnterStepFinish.vue"),
        meta: {
          title: "结束提交",
          access: true
        }
      }
    ]
  },
  {
    name: "news",
    path: "/news",
    component: () => import("../views/News/Main.vue"),
    meta: {
      title: "新闻",
      access: false
    }
  },
  {
    name: "regulation",
    path: "/regulation",
    component: () => import("../views/Home/Regulation.vue"),
    meta: {
      title: "大赛章程",
      access: false
    }
  },
  {
    name: "downloads",
    path: "/downloads",
    component: () => import("../views/Home/Downloads.vue"),
    meta: {
      title: "文件下载",
      access: false
    }
  },
  {
    name: "prize",
    path: "/prize",
    component: () => import("../views/Prize/Main.vue"),
    meta: {
      title: "获奖查询",
      access: false
    },
    children: [
      {
        name: "prizetype",
        path: "/",
        component: () => import("../views/Prize/Type.vue"),
        meta: {
          title: "获奖查询",
          access: false,
          keepAlive: true
        }
      },
      {
        name: "prizework",
        path: "/prize/work",
        component: () => import("../views/Prize/Work.vue"),
        meta: {
          title: "获奖作品",
          access: false
        }
      }
    ]
  },
  {
    name: "prizedownload",
    path: "/download",
    component: () => import("../views/Prize/Download.vue"),
    meta: {
      title: "优秀公益广告特色资源库",
      access: false
    }
  },
  {
    name: "Competitor",
    path: "/competitor",
    component: () => import("../views/Competitor/Main.vue"),
    meta: {
      title: "我的作品",
      access: false
    },
    children: [
      {
        name: "works",
        path: "works",
        component: () => import("../views/Competitor/Works.vue"),
        meta: {
          title: "我的作品",
          access: true
        }
      },
      {
        name: "work",
        path: "work",
        component: () => import("../views/Competitor/Work.vue"),
        meta: {
          title: "我的作品",
          access: true
        }
      },
      {
        name: "modify",
        path: "modify",
        component: () => import("../views/Competitor/Modify.vue"),
        meta: {
          title: "作品更改",
          access: true
        }
      }
    ]
  },
  {
    name: "mobileCompetitor",
    path: "/m/competitor",
    component: () => import("../views-mobile/Competitor/Main.vue"),
    meta: {
      title: "我的作品",
      access: false
    },
    children: [
      {
        name: "mobileWorks",
        path: "works",
        component: () => import("../views-mobile/Competitor/Works.vue"),
        meta: {
          title: "我的作品",
          access: true
        }
      },
      {
        name: "mobileWork",
        path: "work",
        component: () => import("../views-mobile/Competitor/Work.vue"),
        meta: {
          title: "我的作品",
          access: true
        }
      },
      {
        name: "mobileModify",
        path: "modify",
        component: () => import("../views-mobile/Competitor/Modify.vue"),
        meta: {
          title: "作品更改",
          access: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

import isPC from "../assets/js/isPC";

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title + " - " + Vue.prototype.$WebSiteName;
  }

  const responsive_path = ["/account/signin", "/account/signup", "/account/reset", "/account/agreement", "/competitor/works", "/competitor/work", "/competitor/modify", "/work", "/work/getconvenant", "/work/grouppublic", "/work/groupteens", "/work/groupschool", "/work/file", "/work/finish"];
  console.log(responsive_path);
  console.log(to.path);
  console.log(responsive_path.includes(to.path));
  if (responsive_path.includes(to.path) && !isPC()) {
    console.log("移动端页面");
    next({
      path: "/m" + to.path
    });
  }

  if (to.path === "/account/signin") {
    next();
  } else {
    const access = to.meta ? to.meta.access : false;
    if (!access) {
      next();
    } else {
      let token = sessionStorage.getItem(window.$VuexPrefix + "Token");

      //没有登录
      if (token === null || token === "null" || token === "") {
        if (from.path !== "/account/signin") {
          next({
            path: "/account/signin"
          });
        }
      } else {
        next();
      }
    }
  }
});

export default router;
