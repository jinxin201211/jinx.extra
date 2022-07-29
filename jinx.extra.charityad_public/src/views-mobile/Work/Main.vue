<template>
  <router-view></router-view>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  created() {
    this.$router.replace("/m/work/getconvenant");
  },
  methods: {}
};
</script>
