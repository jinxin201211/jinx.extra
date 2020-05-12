<template>
  <div style="padding: 20px;">
    <el-page-header @back="handleBack" content="添加评委" style="margin-bottom: 20px;"> </el-page-header>
    <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px; margin: 0 auto;">
      <el-form-item
        label="用户名"
        prop="uname"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ]"
      >
        <el-input v-model="form.uname" style="width: 250px;" show-word-limit maxlength="18" minlength="2"></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="form.email" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="tel"
        :rules="[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ]"
      >
        <el-input v-model="form.tel" style="width: 250px;" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item>
        <b>用户名用来登录系统，初始密码为888888</b>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "@/assets/js/md5.js";
import qs from "qs";

export default {
  data: function() {
    return {
      form: {
        email: "",
        tel: "",
        uname: "",
        pwd: "",
        role: "judge"
      },
      loading: false
    };
  },
  mixins: [md5],
  mounted: function() {},
  methods: {
    handleBack: function() {
      this.$router.go(-1);
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
      let that = this;
      this.axios
        .post("/api/sysUser/add", qs.stringify({ email: this.form.email, tel: this.form.tel, uname: this.form.uname, pwd: this.hex_md5("888888") }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
            that.$router.go(-1);
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
            message: "添加失败",
            type: "warning"
          });
        });
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
    }
  }
};
</script>
