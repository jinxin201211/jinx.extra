<template>
  <div>
    <div style="border: 1px solid #e6e6e6; background: white; width: 1058px; padding: 15px; margin: 20px auto;">
      <!--<el-row>
        <el-col :span="24">
          <div style="border-bottom: 1px solid #e6e6e6; line-height: 50px; font-size: 24px;">登录平台</div>
        </el-col>
      </el-row>-->
      <el-row style="padding: 15px 0;">
        <el-col :span="18" style="border-right: 1px solid #e6e6e6;">
          <el-form ref="form" :model="form" label-width="120px" style="width: 450px; margin: 0 auto;">
            <el-form-item label="邮箱/手机号码" prop="account" :rules="[{ required: true, message: '请输入邮箱/手机号码', trigger: 'blur' }]">
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="下次自动登录" name="type" v-model="rememberMe"></el-checkbox>
              <!--<el-link type="primary" :underline="false" style="margin-left: 20px;">忘记密码？</el-link>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">立即登录</el-button>
              <!--<el-link type="primary" :underline="false" style="margin-left: 20px;" :to="'register'" @click="$router.push('signup')">注册</el-link>-->
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="padding: 30px;">
          <div style="margin-bottom: 15px;">还没有账号？</div>
          <div style="margin-bottom: 15px;">注册一个</div>
          <el-button type="primary" size="small" @click="$router.push('signup')">注册</el-button>
        </el-col>
      </el-row>
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
        account: "jinxin",
        password: "9081dc00909207eb9e655464fd3e3bf5"
      },
      rememberMe: true
    };
  },
  mounted() {
    this.$store.commit("resetAccount");
    this.$cookies.remove("token");
    this.$cookies.remove("account");
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
        .then(function(response) {
          if (response && response.data.code == "0") {
            let token = response.data.data;
            let account = that.form.account;
            that.$store.commit("changeAccount", { Token: token, Account: account });
            if (that.rememberMe) {
              that.$cookies.set("token", token, 60 * 60 * 24 * 7);
              that.$cookies.set("account", account, 60 * 60 * 24 * 7);
            }
            that.$router.push("/");
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
