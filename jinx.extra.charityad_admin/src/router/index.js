import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      // {
      //   path: "role",
      //   name: "Role",
      //   component: () => import("../views/Function/Role.vue"),
      //   meta: {
      //     title: "角色管理"
      //   }
      // },

      {
        path: "judge",
        name: "Judge",
        component: () => import("../views/Judge/Main.vue"),
        meta: {
          title: "评委管理"
        }
      },
      {
        path: "/addjudge",
        name: "AddJudge",
        component: () => import("../views/Judge/Add.vue"),
        meta: {
          title: "添加评委"
        }
      },
      {
        path: "/editjudge",
        name: "EditJudge",
        component: () => import("../views/Judge/Edit.vue"),
        meta: {
          title: "修改评委"
        }
      },

      {
        path: "/log",
        name: "Log",
        component: () => import("../views/Log/Main.vue"),
        meta: {
          title: "日志管理"
        }
      },

      {
        path: "/news",
        name: "News",
        component: () => import("../views/News/Main.vue"),
        meta: {
          title: "发布新闻"
        }
      },
      {
        path: "/addnews",
        name: "AddNews",
        component: () => import("../views/News/Add.vue"),
        meta: {
          title: "新增新闻"
        }
      },
      {
        path: "/editnews",
        name: "EditNews",
        component: () => import("../views/News/Edit.vue"),
        meta: {
          title: "编辑新闻"
        }
      },
      {
        path: "/viewnews",
        name: "ViewNews",
        component: () => import("../views/News/View.vue"),
        meta: {
          title: "查看新闻"
        }
      },

      {
        path: "/announcement",
        name: "Announcement",
        component: () => import("../views/Announcement/Main.vue"),
        meta: {
          title: "发布公告"
        }
      },
      {
        path: "/addannouncement",
        name: "AddAnnouncement",
        component: () => import("../views/Announcement/Add.vue"),
        meta: {
          title: "新增公告"
        }
      },
      {
        path: "/editannouncement",
        name: "EditAnnouncement",
        component: () => import("../views/Announcement/Edit.vue"),
        meta: {
          title: "编辑公告"
        }
      },
      {
        path: "/viewannouncement",
        name: "ViewAnnouncement",
        component: () => import("../views/Announcement/View.vue"),
        meta: {
          title: "查看公告"
        }
      }

      // {
      //   path: "score",
      //   name: "Score",
      //   // component: () => import("../views/Function/Score.vue"),
      //   meta: {
      //     title: "作品打分"
      //   }
      // }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录"
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  if (to.path === "/login") {
    next();
  } else {
    let token = sessionStorage.getItem("Charity-Token");

    //没有登录
    if (token === null || token === "null" || token === "") {
      if (from.path !== "/login") {
        next({
          path: "/login"
        });
      }
    } else {
      next();
    }
  }
});

export default router;
