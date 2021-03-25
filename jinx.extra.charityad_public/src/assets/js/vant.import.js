import { List } from "vant";
import { ImagePreview } from "vant";

export default {
  install(V) {
    V.use(List);
    V.prototype.$imagepreview = ImagePreview;
  }
};
