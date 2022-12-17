import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "aierList",
    path: "/",
    component: () => import("../views/Aier/List.vue"),
    meta: {
      title: "爱尔眼科",
      access: ["aier"]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    name: "aierList",
    path: "/aier/list",
    component: () => import("../views/Aier/List.vue"),
    meta: {
      title: "爱尔眼科",
      access: ["aier"]
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
