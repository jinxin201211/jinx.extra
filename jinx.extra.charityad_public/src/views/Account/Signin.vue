<template>
  <div class="jinx-panel">
    <el-row style="padding: 15px 0;">
      <el-col :span="18" style="border-right: 1px solid #e6e6e6;">
        <el-form ref="form" :model="form" label-width="120px" style="width: 450px; margin: 0 auto;">
          <el-form-item label="邮箱/手机号码" prop="account" :rules="[{ required: true, message: '请输入邮箱/手机号码', trigger: 'blur' }]">
            <el-input v-model="form.account" @keyup.enter.native="handleSubmit"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <el-input v-model="form.password" show-password @keyup.enter.native="handleSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="下次自动登录" name="type" v-model="rememberMe"></el-checkbox>
            <!--<el-link type="primary" :underline="false" style="margin-left: 20px;">忘记密码？</el-link>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="padding: 30px;">
        <div style="margin-bottom: 15px;">还没有账号？</div>
        <div style="margin-bottom: 15px;">注册一个</div>
        <el-button type="primary" size="small" @click="$router.replace('signup')">注册</el-button>
      </el-col>
    </el-row>
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
        // account: "jinxin",
        // password: "jinxin20200510"
      },
      rememberMe: true
    };
  },
  created() {
    // console.log("created signin");
  },
  mounted() {
    this.$store.commit("resetAccount");
    this.$store.commit("removeCookie");
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
        .get("/api/gameUser/login", { params: { uname: this.form.account, pwd: this.hex_md5(this.form.password) } })
        // .get("/api/gameUser/login", { params: { uname: "鹿鹿子", pwd: "ba0ab003896d4f90e2e1ea7c39cba7c7" } })
        .then(function(response) {
          if (response && response.data.code == "0") {
            let user = response.data.data;
            let token = user.token;
            let account = that.form.account;
            that.$store.commit("changeAccount", user);
            if (that.rememberMe) {
              that.$store.commit("changeCookie", user);
            }
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
.jinx-panel {
  // border: 1px solid #e6e6e6;
  background: white;
  width: @typical-width;
  padding: 15px;
  // margin: 20px auto;
  box-sizing: border-box;
  margin: 30px auto 0 auto;
  // -moz-box-shadow: 0px -6px 20px #e0e4e9;
  // -webkit-box-shadow: 0px -6px 20px #e0e4e9;
  // box-shadow: 0px -6px 20px #e0e4e9;
}
</style>
