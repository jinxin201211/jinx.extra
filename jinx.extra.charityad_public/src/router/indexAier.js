import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "aierList",
    path: "/",
    component: () => import("../views/Aier/List.vue"),
    meta: {
      title: "爱尔眼科",
      access: false
    }
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
  if (responsive_path.includes(to.path) && !isPC()) {
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

const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
};

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

export default router;
