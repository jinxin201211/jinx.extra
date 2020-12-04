import Vue from "vue";
import md5ex from "@/assets/js/md5ex.js";

Vue.prototype.isImage = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.isAudio = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".wma")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.isVideo = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".mp4") || file.endsWith(".ogg") || file.endsWith(".webm") || file.endsWith(".flv")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.isFlash = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".swf")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.isPDF = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".pdf")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.isOffice = function(file) {
  file = file.toLowerCase();
  if (file.endsWith(".doc") || file.endsWith(".docx") || file.endsWith(".xls") || file.endsWith(".xlsx") || file.endsWith(".ppt") || file.endsWith(".pptx") || file.endsWith(".txt")) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.encryptFileName = function(fileName) {
  let extension = fileName.substring(fileName.lastIndexOf("."), fileName.length);
  let name = fileName.substring(0, fileName.lastIndexOf("."));
  let name_encrypt = md5ex.b64_md5(name);
  return name_encrypt + extension;
};
