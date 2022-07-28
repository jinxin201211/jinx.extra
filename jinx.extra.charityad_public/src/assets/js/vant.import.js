import { List, NavBar, Picker, Popup } from "vant";
import { ImagePreview } from "vant";

export default {
  install(V) {
    V.use(List)
      .use(NavBar)
      .use(Picker)
      .use(Popup);
    V.prototype.$imagepreview = ImagePreview;
  }
};
