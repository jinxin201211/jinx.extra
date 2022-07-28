<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
    <div class="jinx-panel">
      <div style="width: 100%">
        <div class="title">账号密码登录</div>
        <div class="form-item">
          <el-input v-model="form.account" @keyup.enter.native="handleSubmit"></el-input>
        </div>
        <div class="form-item">
          <el-input v-model="form.password" show-password @keyup.enter.native="handleSubmit"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" @click="handleSubmit" :disabled="form.account === '' || form.password === ''">立即登录</el-button>
        </div>
        <div class="form-item" style="display: flex; justify-content: space-between;">
          <el-link type="primary" :underline="false" @click="$router.push('/account/reset')">忘记密码</el-link>
          <el-link type="primary" @click="$router.replace('signup')">注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "@/assets/js/md5.js";

export default {
  data: function() {
    return {
      form: {
        account: "",
        password: ""
      },
      rememberMe: true
    };
  },
  created() {},
  mounted() {
    this.$store.commit("resetAccount");
    this.$store.commit("removeCookie");
  },
  mixins: [md5],
  methods: {
    handleSubmit: function() {
      this.loading = true;
      let _this = this;
      this.axios
        .get("/api/gameUser/login", { params: { uname: this.form.account, pwd: this.hex_md5(this.form.password) } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            let user = response.data.data;
            let token = user.token;
            let account = _this.form.account;
            _this.$store.commit("changeAccount", user);
            if (_this.rememberMe) {
              _this.$store.commit("changeCookie", user);
            }
            _this.$router.replace("/");
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.loading = false;
          _this.$message({
            showClose: true,
            message: "登录失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  padding: 20px;
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
  }
}

.form-item {
  margin: 15px 0;
  /deep/ .el-input input {
    background: #f6f6f6;
    border: none;
    height: 50px;
    // font-size: 18px;
  }

  /deep/ .el-button {
    margin: 15px 0;
    width: 100%;
    height: 50px;
  }
}
</style>
