<template>
  <div class="jinx-panel">
    <el-row style="padding: 15px 0;">
      <el-col :span="18" style="border-right: 1px solid #e6e6e6;">
        <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px; margin: 0 auto;">
          <el-form-item
            label="手机号码"
            prop="phone"
            :rules="[
              { required: true, message: '请输入手机号码', rigger: 'blur' },
              { validator: validatePhone, trigger: 'blur' }
            ]"
          >
            <el-input v-model="form.phone" style="width: 250px;" maxlength="11"></el-input>
            <label style="margin-left: 20px;">请输入有效的手机号码</label>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="code"
            :rules="[
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { validator: validateVerifyCode, trigger: 'blur' }
            ]"
          >
            <div style="display: flex;">
              <div style="display: flex; justify-content: space-between; width: 250px;">
                <el-input v-model="form.code" style="width: 120px;" :disabled="!verify_code.send"></el-input>
                <el-button type="text" @click="handleSendSMS" :disabled="!verify_code.enabled"><span v-text="verify_code.text"></span></el-button>
              </div>
              <label style="margin-left: 20px;">请输入验证码</label>
            </div>
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
            <label style="margin-left: 20px;">密码为6到15个字符，只能含有半角英文字母及数字</label>
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
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loading">提交</el-button>
            <!--<el-link type="primary" :underline="false" style="margin-left: 20px;" @click="$router.push('signin')">登录</el-link>-->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from "@/assets/js/md5.js";
import qs from "qs";

export default {
  data: function() {
    return {
      form: {
        phone: "",
        // phone: "18708117389", //todo
        password: "",
        repassword: "",
        code: ""
      },
      verify_code: {
        send: false,
        // send: true, //todo
        code: "",
        text: "发送短信验证码",
        enabled: true
      },
      loading: false
    };
  },
  mixins: [md5],
  mounted: function() {},
  methods: {
    handleSendSMS() {
      const _this = this;
      if (!this.form.phone) {
        _this.$message({
          showClose: true,
          message: "请输入手机号码",
          type: "warning"
        });
        return;
      }
      _this.verify_code.send = false;
      this.axios
        .post("/api/common/sendSms", { phone: this.form.phone })
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.verify_code.send = true;
            _this.$message({
              showClose: true,
              message: `短信验证码发送成功，请及时查收，有效时间15分钟`,
              type: "success"
            });
            _this.verify_code.enabled = false;
            let second = 60;
            setTimeout(function f() {
              second--;
              if (second) {
                _this.verify_code.text = `${second}秒后再次发送`;
                setTimeout(f, 1000);
              } else {
                _this.verify_code.text = "发送短信验证码";
                _this.verify_code.enabled = true;
              }
            }, 1000);
          } else {
            _this.$message({
              showClose: true,
              message: "发送失败",
              type: "warning"
            });
          }
          _this.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            showClose: true,
            message: "发送失败",
            type: "warning"
          });
        });
    },
    handleSubmit: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    submit: function() {
      this.loading = true;
      let _this = this;
      this.axios
        .post("/api/gameUser/resetPwd", { phone: this.form.phone, code: this.form.code, pwd: this.hex_md5(this.form.password) })
        .then(function(response) {
          if (response && response.data.code == "0") {
            let second = 3;
            let message = _this.$message({
              showClose: true,
              message: `密码修改成功，${second}秒后跳转到登录页面`,
              type: "success"
            });
            setTimeout(function f() {
              second--;
              if (second) {
                message.message = `密码修改成功，${second}秒后跳转到登录页面`;
                setTimeout(f, 1000);
              } else {
                message.close();
                _this.$router.replace("/account/signin");
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
            message: "密码修改失败",
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
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-panel {
  background: white;
  width: @typical-width;
  padding: 15px;
  box-sizing: border-box;
  margin: 30px auto 0 auto;
}
</style>
