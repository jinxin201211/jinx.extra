import Vue from "vue";

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
  if (file.endsWith(".doc") || file.endsWith(".docx") || file.endsWith(".xls") || file.endsWith(".xlsx") || file.endsWith(".ppt") || file.endsWith(".pptx")) {
    return true;
  } else {
    return false;
  }
};
