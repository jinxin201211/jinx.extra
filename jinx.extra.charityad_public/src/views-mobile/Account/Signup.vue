<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
    <van-popup v-model="type.picker" position="bottom">
      <van-picker title="选择用户组" show-toolbar :columns="type.columns" @confirm="handleConfirmType" @cancel="handleCancelType" @change="handleChangeType" />
    </van-popup>
    <div class="jinx-panel">
      <div style="width: 100%">
        <div class="title">用户注册</div>
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="用户组" prop="type" :rules="[{ required: true, message: '请选择用户组', trigger: 'blur' }]">
            <el-input placeholder="用户组" v-model="form.type" readonly @focus="type.picker = true"></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input placeholder="请牢记并填写有效邮箱地址，可用于登录平台" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phone"
            :rules="[
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { validator: validatePhone, trigger: 'blur' }
            ]"
          >
            <el-input placeholder="请输入有效的手机号码，可用于登录平台" v-model="form.phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item
            label="昵称"
            prop="nickname"
            :rules="[
              { required: true, message: '请输入昵称', trigger: 'blur' },
              { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
            ]"
          >
            <el-input placeholder="昵称至少2个字符，最多18个字符" v-model="form.nickname" show-word-limit maxlength="18" minlength="2"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]"
          >
            <el-input placeholder="密码为6到15个字符，只能含有半角英文字母及数字" v-model="form.password" show-password maxlength="15" minlength="6"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="repassword"
            :rules="[
              { required: true, message: '请再输入一遍密码', trigger: 'blur' },
              { validator: validateRePassword, trigger: 'blur' }
            ]"
          >
            <el-input placeholder="请再输入一遍密码" v-model="form.repassword" show-password maxlength="15" minlength="6"></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="security"
            :rules="[
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { validator: validateVerifyCode, trigger: 'blur' }
            ]"
          >
            <div style="display: flex;">
              <el-input placeholder="请输入验证码" v-model="form.security" style="flex: 1"></el-input>
              <div style="display: inline-block; vertical-align: middle;" @click="handleRefreshCode">
                <jinx-verify-code :identifyCode="verify_code"></jinx-verify-code>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="agree" :rules="[{ required: true, message: '请先同意注册协议', trigger: 'blur' }]">
            <el-checkbox name="agree" v-model="form.agree">勾选同意<el-link @click.stop.prevent="$router.push('/m/account/agreement')">《注册协议》</el-link></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="!form.agree">提交注册</el-button>
            <div style="display: flex; justify-content: flex-end;">
              <el-link type="primary" @click="$router.replace('/m/account/signin')">登录</el-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import JinxVerifyCode from "@/components/JinxVerifyCode.vue";
import md5 from "@/assets/js/md5.js";
import qs from "qs";
import { type } from "os";

export default {
  components: { JinxVerifyCode },
  data: function() {
    return {
      form: {
        type: "",
        email: "",
        phone: "",
        nickname: "",
        password: "",
        repassword: "",
        security: "",
        agree: false
        // type: "专业组", //todo
        // email: "1137617085@qq.com",
        // phone: "18708117389",
        // nickname: "jinxin",
        // password: "jinxin20200510",
        // repassword: "jinxin20200510",
        // security: "",
        // agree: true
      },
      type: {
        picker: false,
        value: "",
        columns: ["高校组", "专业组", "公众组", "青少年组"]
      },
      verify_code: "",
      loading: false
    };
  },
  mixins: [md5],
  mounted: function() {
    this.handleRefreshCode();
  },
  methods: {
    handleConfirmType(value) {
      this.form.type = value;
      this.type.picker = false;
    },
    handleCancelType() {
      this.type.picker = false;
    },
    handleChangeType(picker, value) {
      this.form.type = value;
    },
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
      let _this = this;
      let type = this.type.columns.indexOf(this.form.type);
      this.axios
        .post("/api/gameUser/register", qs.stringify({ type: type, email: this.form.email, tel: this.form.phone, uname: this.form.nickname, pwd: this.hex_md5(this.form.password) }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let second = 3;
            let message = _this.$message({
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
                _this.$router.replace("/m/account/signin");
              }
            }, 1000);
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
      const phoneReg = /^1[0-9]{10}$/;
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

<style lang="less" scoped>
.jinx-panel {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
  }

  /deep/ .el-form-item__label {
    line-height: 30px;
    padding: 0;
  }

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
