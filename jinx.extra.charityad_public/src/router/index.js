import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
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
          title: "专业类、公众类报名表",
          access: true
        }
      },
      {
        name: "groupschool",
        path: "groupschool",
        component: () => import("../views/Work/EnterStepSchoolForm.vue"),
        meta: {
          title: "高校类报名表",
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
    name: "news",
    path: "/news",
    component: () => import("../views/News/Main.vue"),
    meta: {
      title: "新闻",
      access: false
    }
  },
  {
    name: "Regulation",
    path: "/regulation",
    component: () => import("../views/Home/Regulation.vue"),
    meta: {
      title: "大赛章程",
      access: false
    }
  },
  {
    name: "Prize",
    path: "/prize",
    component: () => import("../views/Prize/Type.vue"),
    meta: {
      title: "大赛章程",
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
      // console.log(token);
      // console.log()

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
