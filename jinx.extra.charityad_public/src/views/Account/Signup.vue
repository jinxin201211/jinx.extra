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
          <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px; margin: 0 auto;">
            <el-form-item
              label="邮箱"
              prop="email"
              :rules="[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="form.email" style="width: 250px;"></el-input>
              <label style="margin-left: 20px;">请牢记并填写有效邮箱地址，可用于登录平台</label>
            </el-form-item>
            <el-form-item
              label="手机"
              prop="phone"
              :rules="[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: validatePhone, trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.phone" style="width: 250px;" maxlength="11"></el-input>
              <label style="margin-left: 20px;">请输入有效的手机号码，可用于登录平台</label>
            </el-form-item>
            <el-form-item
              label="昵称"
              prop="nickname"
              :rules="[
                { required: true, message: '请输入昵称', trigger: 'blur' },
                { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.nickname" style="width: 250px;" show-word-limit maxlength="18" minlength="2"></el-input>
              <label style="margin-left: 20px;">昵称至少2个字符，最多18个字符</label>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.password" show-password style="width: 250px;" maxlength="15" minlength="6"></el-input>
              <label style="margin-left: 20px;">密码为6到15个字符，只能含有半高英文字母及数字</label>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="repassword"
              :rules="[
                { required: true, message: '请再输入一遍密码', trigger: 'blur' },
                { validator: validateRePassword, trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.repassword" show-password style="width: 250px;" maxlength="15" minlength="6"></el-input>
              <label style="margin-left: 20px;">请再输入一遍密码</label>
            </el-form-item>
            <el-form-item
              label="验证码"
              prop="security"
              :rules="[
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { validator: validateVerifyCode, trigger: 'blur' }
              ]"
            >
              <el-input v-model="form.security" style="width: 120px;"></el-input>
              <div style="display: inline-block; vertical-align: middle;" @click="handleRefreshCode">
                <jinx-verify-code :identifyCode="verify_code"></jinx-verify-code>
              </div>
              <label style="margin-left: 20px;">请输入验证码</label>
            </el-form-item>
            <el-form-item prop="agree" :rules="[{ required: true, message: '请先同意注册协议', trigger: 'blur' }]">
              <el-checkbox name="agree" v-model="form.agree">勾选同意<el-link @click.stop.prevent="">《注册协议》</el-link></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="!form.agree">提交注册</el-button>
              <!--<el-link type="primary" :underline="false" style="margin-left: 20px;" @click="$router.push('signin')">登录</el-link>-->
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="padding: 30px;">
          <div style="margin-bottom: 15px;">已经有了账号？</div>
          <div style="margin-bottom: 15px;">请直接登录</div>
          <el-button type="primary" size="small" @click="$router.push('signin')">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import JinxVerifyCode from "@/components/JinxVerifyCode.vue";
import qs from "qs";

export default {
  components: { JinxVerifyCode },
  data: function() {
    return {
      form: {
        email: "",
        phone: "",
        nickname: "",
        password: "",
        repassword: "",
        security: "",
        agree: false
        // email: "1137617085@qq.com",
        // phone: "18708117389",
        // nickname: "jinxin",
        // password: "jinxin20200510",
        // repassword: "jinxin20200510",
        // security: "",
        // agree: true
      },
      verify_code: "",
      loading: false
    };
  },
  mounted: function() {
    this.handleRefreshCode();
  },
  methods: {
    handleSubmit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.signup();
        } else {
          return false;
        }
      });
    },
    signup: function() {
      this.loading = true;
      let that = this;
      this.axios
        .post("/api/gameUser/register", qs.stringify({ email: this.form.email, tel: this.form.phone, uname: this.form.nickname, pwd: this.form.password }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let second = 3;
            let message = that.$message({
              showClose: true,
              message: `注册成功，${second}秒后跳转到登录页面`,
              type: "success"
            });
            setTimeout(function f() {
              second--;
              if (second) {
                message.message = `注册成功，${second}秒后跳转到登录页面`;
                setTimeout(f, 1000);
              } else {
                message.close();
                that.$router.push("/account/signin");
              }
            }, 1000);
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
            message: "注册失败",
            type: "warning"
          });
        });
    },
    validateRePassword: function(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    validatePhone: function(rule, value, callback) {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("手机号码格式不正确"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("手机号码格式不正确"));
          }
        }
      }, 100);
    },
    validateVerifyCode: function(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.verify_code) {
        callback(new Error("验证码错误!"));
      } else {
        callback();
      }
    },
    randomNum: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    handleRefreshCode: function() {
      this.verify_code = "";
      let verify_codes = "1234567890";
      for (let i = 0; i < 4; i++) {
        this.verify_code += verify_codes[this.randomNum(0, 10)];
      }
    }
  }
};
</script>
