<template>
  <jinx-layout>
    <router-view></router-view>
  </jinx-layout>
</template>

<script>
import JinxLayout from "@/components/JinxLayout.vue";
export default {
  components: { JinxLayout },
  data: function() {
    return {};
  },
  mounted: function() {
    this.$router.replace("/work/getconvenant");
  },
  methods: {}
};
</script>
