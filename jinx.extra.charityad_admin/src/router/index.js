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
      access: ["admin", "judge", "leader"]
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
          access: ["admin"],
          menu: "/judge"
        }
      },
      {
        path: "/editjudge",
        name: "EditJudge",
        component: () => import("../views/Judge/Edit.vue"),
        meta: {
          title: "修改评委",
          access: ["admin"],
          menu: "/judge"
        }
      },

      {
        path: "config",
        name: "Config",
        component: () => import("../views/Config/Main.vue"),
        meta: {
          title: "系统配置",
          access: ["admin"]
        }
      },
      {
        path: "/editconfig",
        name: "EditConfig",
        component: () => import("../views/Config/Edit.vue"),
        meta: {
          title: "修改配置",
          access: ["admin"],
          menu: "/judge"
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
          access: ["admin"],
          menu: "/news"
        }
      },
      {
        path: "/editnews",
        name: "EditNews",
        component: () => import("../views/News/Edit.vue"),
        meta: {
          title: "编辑新闻",
          access: ["admin"],
          menu: "/news"
        }
      },
      {
        path: "/viewnews",
        name: "ViewNews",
        component: () => import("../views/News/View.vue"),
        meta: {
          title: "查看新闻",
          access: ["admin"],
          menu: "/news"
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
          access: ["admin"],
          menu: "/announcement"
        }
      },
      {
        path: "/editannouncement",
        name: "EditAnnouncement",
        component: () => import("../views/Announcement/Edit.vue"),
        meta: {
          title: "编辑公告",
          access: ["admin"],
          menu: "/announcement"
        }
      },
      {
        path: "/viewannouncement",
        name: "ViewAnnouncement",
        component: () => import("../views/Announcement/View.vue"),
        meta: {
          title: "查看公告",
          access: ["admin"],
          menu: "/announcement"
        }
      },

      {
        path: "/score/round1",
        name: "scoreround1",
        component: () => import("../views/Work/Round1/Main.vue"),
        meta: {
          title: "作品打分(第一轮)",
          access: ["judge", "leader"]
        }
      },
      {
        path: "/score/round1/score",
        name: "scoreround1score",
        component: () => import("../views/Work/Round1/Appraisal.vue"),
        meta: {
          title: "作品打分(第一轮)",
          access: ["judge", "leader"],
          menu: "/score/round1"
        }
      },
      {
        path: "/score/round2",
        name: "scoreround2",
        component: () => import("../views/Work/Round2/Main.vue"),
        meta: {
          title: "作品打分(第二轮)",
          access: ["judge", "leader"]
        }
      },
      {
        path: "/score/round2/score",
        name: "scoreround2score",
        component: () => import("../views/Work/Round2/Score.vue"),
        meta: {
          title: "作品打分",
          access: ["judge", "leader"],
          menu: "/score/round2"
        }
      },
      {
        path: "/score/round3",
        name: "scoreround3",
        component: () => import("../views/Work/Round3/Main.vue"),
        meta: {
          title: "作品打分(第三轮)",
          access: ["leader"]
        }
      },
      {
        path: "/workrank",
        name: "WorkRank",
        component: () => import("../views/Work/Rank.vue"),
        meta: {
          title: "作品排行",
          access: ["judge", "leader"]
        }
      },
      {
        path: "/workregular",
        name: "WorkRegular",
        component: () => import("../views/Work/Regular.vue"),
        meta: {
          title: "评审办法",
          access: ["judge", "leader"]
        }
      },
      {
        path: "/workimport",
        name: "workImport",
        component: () => import("../views/Work/Import/Main.vue"),
        meta: {
          title: "作品导入",
          access: ["admin"]
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
  window.scrollTo(0, 0);
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title + " - " + Vue.prototype.$WebSiteName;
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
