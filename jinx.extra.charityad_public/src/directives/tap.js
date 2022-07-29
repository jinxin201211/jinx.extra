const jinxTap = {
  bind: function(el, binding, vNode) {
    el.classList.add("jinx-tap");

    el.handleTouchStart = function() {
      el.classList.add("tapped");
    };
    el.handleTouchEnd = function() {
      el.classList.remove("tapped");
    };

    el.addEventListener("touchstart", el.handleTouchStart);
    el.addEventListener("touchend", el.handleTouchEnd);
    el.addEventListener("touchcancel", el.handleTouchEnd);
  },
  unbind(el) {
    el.removeEventListener("touchstart", el.handleTouchStart);
    el.removeEventListener("touchend", el.handleTouchEnd);
    el.removeEventListener("touchcancel", el.handleTouchEnd);
  }
};

export default jinxTap;
