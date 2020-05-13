import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        name: "main",
        path: "/",
        component: () => import("../views/Home/Main.vue"),
        meta: {
          title: "首页",
          access: false
        }
      },
      {
        name: "introduce",
        path: "introduce",
        component: () => import("../views/Home/Introduce.vue"),
        meta: {
          title: "活动简介",
          access: false
        }
      },
      {
        name: "news",
        path: "news",
        component: () => import("../views/Home/News.vue"),
        meta: {
          title: "新闻动态",
          access: false
        }
      },
      {
        name: "collect",
        path: "collect",
        component: () => import("../views/Home/Collect.vue"),
        meta: {
          title: "作品征集",
          access: false
        }
      },
      {
        name: "awards",
        path: "awards",
        component: () => import("../views/Home/Awards.vue"),
        meta: {
          title: "奖项设置",
          access: false
        }
      },
      {
        name: "works",
        path: "works",
        component: () => import("../views/Home/Works.vue"),
        meta: {
          title: "作品展示",
          access: false
        }
      },
      {
        name: "history",
        path: "history",
        component: () => import("../views/Home/History.vue"),
        meta: {
          title: "往届回顾",
          access: false
        }
      },
      {
        name: "about",
        path: "about",
        component: () => import("../views/Home/About.vue"),
        meta: {
          title: "关于我们",
          access: false
        }
      }
    ]
  },
  {
    path: "/account",
    name: "Account",
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
      }
    ]
  },
  {
    path: "/work",
    name: "Work",
    component: () => import("../views/Work/Main.vue"),
    children: [
      {
        name: "convenant",
        path: "convenant",
        component: () => import("../views/Work/SubmitStepConvenant.vue"),
        meta: {
          title: "提交作品",
          access: true
        }
      },
      {
        name: "workinfo",
        path: "workinfo",
        component: () => import("../views/Work/SubmitStepWorkInfo.vue"),
        meta: {
          title: "填写基本资料",
          access: true
        }
      },
      {
        name: "authorinfo",
        path: "authorinfo",
        component: () => import("../views/Work/SubmitStepAuthorInfo.vue"),
        meta: {
          title: "结束提交",
          access: true
        }
      },
      {
        name: "upload",
        path: "upload",
        component: () => import("../views/Work/SubmitStepUpload.vue"),
        meta: {
          title: "上传作品文件",
          access: true
        }
      },
      {
        name: "submit",
        path: "submit",
        component: () => import("../views/Work/SubmitStepSubmit.vue"),
        meta: {
          title: "提交作品",
          access: true
        }
      },
      {
        name: "list",
        path: "list",
        component: () => import("../views/Work/List.vue"),
        meta: {
          title: "作品列表",
          access: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
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
