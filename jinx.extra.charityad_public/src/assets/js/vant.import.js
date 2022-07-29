import { List, NavBar, Picker, Popup, PullRefresh } from "vant";
import { ImagePreview } from "vant";

export default {
  install(V) {
    V.use(List)
      .use(NavBar)
      .use(Picker)
      .use(Popup)
      .use(PullRefresh);
    V.prototype.$imagepreview = ImagePreview;
  }
};
