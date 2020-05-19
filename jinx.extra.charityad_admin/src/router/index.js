import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页",
      access: ["admin", "judge"]
    },
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
          title: "评委管理",
          access: ["admin"]
        }
      },
      {
        path: "/addjudge",
        name: "AddJudge",
        component: () => import("../views/Judge/Add.vue"),
        meta: {
          title: "添加评委",
          access: ["admin"]
        }
      },
      {
        path: "/editjudge",
        name: "EditJudge",
        component: () => import("../views/Judge/Edit.vue"),
        meta: {
          title: "修改评委",
          access: ["admin"]
        }
      },

      {
        path: "/log",
        name: "Log",
        component: () => import("../views/Log/Main.vue"),
        meta: {
          title: "日志管理",
          access: ["admin"]
        }
      },

      {
        path: "/news",
        name: "News",
        component: () => import("../views/News/Main.vue"),
        meta: {
          title: "发布新闻",
          access: ["admin"]
        }
      },
      {
        path: "/addnews",
        name: "AddNews",
        component: () => import("../views/News/Add.vue"),
        meta: {
          title: "新增新闻",
          access: ["admin"]
        }
      },
      {
        path: "/editnews",
        name: "EditNews",
        component: () => import("../views/News/Edit.vue"),
        meta: {
          title: "编辑新闻",
          access: ["admin"]
        }
      },
      {
        path: "/viewnews",
        name: "ViewNews",
        component: () => import("../views/News/View.vue"),
        meta: {
          title: "查看新闻",
          access: ["admin"]
        }
      },

      {
        path: "/announcement",
        name: "Announcement",
        component: () => import("../views/Announcement/Main.vue"),
        meta: {
          title: "发布公告",
          access: ["admin"]
        }
      },
      {
        path: "/addannouncement",
        name: "AddAnnouncement",
        component: () => import("../views/Announcement/Add.vue"),
        meta: {
          title: "新增公告",
          access: ["admin"]
        }
      },
      {
        path: "/editannouncement",
        name: "EditAnnouncement",
        component: () => import("../views/Announcement/Edit.vue"),
        meta: {
          title: "编辑公告",
          access: ["admin"]
        }
      },
      {
        path: "/viewannouncement",
        name: "ViewAnnouncement",
        component: () => import("../views/Announcement/View.vue"),
        meta: {
          title: "查看公告",
          access: ["admin"]
        }
      },

      {
        path: "/work",
        name: "Work",
        component: () => import("../views/Work/Main.vue"),
        meta: {
          title: "作品打分",
          access: ["judge"]
        }
      },
      {
        path: "/workscore",
        name: "workscore",
        component: () => import("../views/Work/Score.vue"),
        meta: {
          title: "作品打分",
          access: ["judge"]
        }
      },
      {
        path: "/workrank",
        name: "WorkRank",
        component: () => import("../views/Work/Rank.vue"),
        meta: {
          title: "作品排行",
          access: ["judge"]
        }
      },
      {
        path: "/workregular",
        name: "WorkRegular",
        component: () => import("../views/Work/Regular.vue"),
        meta: {
          title: "评审办法",
          access: ["judge"]
        }
      }
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
  routes
});
import { Message } from "element-ui";
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  if (to.path === "/login") {
    next();
  } else {
    let token = sessionStorage.getItem(window.$VuexPrefix + "Token");

    //没有登录
    if (token === null || token === "null" || token === "") {
      if (from.path !== "/login") {
        next({
          path: "/login"
        });
      }
    } else {
      //权限验证
      let user = JSON.parse(sessionStorage.getItem(window.$VuexPrefix + "User"));
      let role = user.role;
      let access = to.meta && to.meta.access ? to.meta.access : [];
      // let access = new Array();
      if (access.includes(role)) {
        next();
      } else {
        //没有权限
        Message({
          message: `抱歉，您没有权限访问此页面`,
          type: "error"
        });
      }
    }
  }
});

export default router;
