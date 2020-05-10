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
          title: "首页"
        }
      },
      {
        name: "introduce",
        path: "introduce",
        component: () => import("../views/Home/Introduce.vue"),
        meta: {
          title: "活动简介"
        }
      },
      {
        name: "news",
        path: "news",
        component: () => import("../views/Home/News.vue"),
        meta: {
          title: "新闻动态"
        }
      },
      {
        name: "collect",
        path: "collect",
        component: () => import("../views/Home/Collect.vue"),
        meta: {
          title: "作品征集"
        }
      },
      {
        name: "awards",
        path: "awards",
        component: () => import("../views/Home/Awards.vue"),
        meta: {
          title: "奖项设置"
        }
      },
      {
        name: "works",
        path: "works",
        component: () => import("../views/Home/Works.vue"),
        meta: {
          title: "作品展示"
        }
      },
      {
        name: "history",
        path: "history",
        component: () => import("../views/Home/History.vue"),
        meta: {
          title: "往届回顾"
        }
      },
      {
        name: "about",
        path: "about",
        component: () => import("../views/Home/About.vue"),
        meta: {
          title: "关于我们"
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
          title: "登录"
        }
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("../views/Account/Signup.vue"),
        meta: {
          title: "注册"
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
          title: "提交作品"
        }
      },
      {
        name: "workinfo",
        path: "workinfo",
        component: () => import("../views/Work/SubmitStepWorkInfo.vue"),
        meta: {
          title: "填写基本资料"
        }
      },
      {
        name: "authorinfo",
        path: "authorinfo",
        component: () => import("../views/Work/SubmitStepAuthorInfo.vue"),
        meta: {
          title: "结束提交"
        }
      },
      {
        name: "upload",
        path: "upload",
        component: () => import("../views/Work/SubmitStepUpload.vue"),
        meta: {
          title: "上传作品文件"
        }
      },
      {
        name: "submit",
        path: "submit",
        component: () => import("../views/Work/SubmitStepSubmit.vue"),
        meta: {
          title: "提交作品"
        }
      },
      {
        name: "list",
        path: "list",
        component: () => import("../views/Work/List.vue"),
        meta: {
          title: "作品列表"
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

  next();
});

export default router;
