<template>
  <div style="height: 100%;">
    <div class="jinx-login-header" :style="{ backgroundImage: 'url(' + require('@/assets/images/header_bg.png') + ')' }">
      <span>{{ $WebSiteName }}</span>
    </div>
    <div style="width: 450px; margin: 0 auto; margin-top: 120px; box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.3); padding: 65px 65px;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名" prop="account" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="form.account" @keyup.enter.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="form.password" show-password @keyup.enter.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "@/assets/js/md5.js";

export default {
  data: function() {
    return {
      form: {
        account: "",
        password: ""
      },
      loading: false
    };
  },
  mounted() {
    // if (new Date().getUTCSeconds() % 2 == 1) {
    //   this.form = {
    //     account: "lxw",
    //     password: "888888"
    //   };
    // } else {
    //   this.form = {
    //     account: "jinxin",
    //     password: "123456"
    //   };
    // }
    this.$store.commit("resetAccount");
  },
  mixins: [md5],
  methods: {
    handleSubmit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.signin();
        } else {
          return false;
        }
      });
    },
    signin: function() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/sysUser/login", qs.stringify({ uname: this.form.account, pwd: this.hex_md5(this.form.password) }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data;
            if (data.role === "judge" && data.groupLeader === "1") {
              data.role = "leader";
            }
            that.$store.commit("changeAccount", data);
            that.$router.replace("/");
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          that.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          that.loading = false;
          that.$message({
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
html,
body,
#app {
  height: 100%;
}
.jinx-login-header {
  height: 160px;
  text-align: center;
  padding-top: 110px;
  box-sizing: border-box;

  span {
    color: #ffffff;
    display: block;
    font-size: 24px;
  }
}
</style>
