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
        component: () => import("../views/Main.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        name: "signin",
        path: "signin",
        component: () => import("../views/Signin.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("../views/Signup.vue"),
        meta: {
          title: "注册"
        }
      },
      {
        name: "introduce",
        path: "introduce",
        component: () => import("../views/Introduce.vue"),
        meta: {
          title: "活动简介"
        }
      },
      {
        name: "news",
        path: "news",
        component: () => import("../views/News.vue"),
        meta: {
          title: "新闻动态"
        }
      },
      {
        name: "collect",
        path: "collect",
        component: () => import("../views/Collect.vue"),
        meta: {
          title: "作品征集"
        }
      },
      {
        name: "awards",
        path: "awards",
        component: () => import("../views/Awards.vue"),
        meta: {
          title: "奖项设置"
        }
      },
      {
        name: "works",
        path: "works",
        component: () => import("../views/Works.vue"),
        meta: {
          title: "作品展示"
        }
      },
      {
        name: "history",
        path: "history",
        component: () => import("../views/History.vue"),
        meta: {
          title: "往届回顾"
        }
      },
      {
        name: "about",
        path: "about",
        component: () => import("../views/About.vue"),
        meta: {
          title: "关于我们"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
