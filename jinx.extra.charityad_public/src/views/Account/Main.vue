<template>
  <jinx-layout-no-login>
    <router-view></router-view>
  </jinx-layout-no-login>
</template>

<script>
import JinxLayoutNoLogin from "@/components/JinxLayoutNoLogin.vue";
export default {
  components: { JinxLayoutNoLogin },
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>
