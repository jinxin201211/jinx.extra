<template>
  <div style="padding: 20px;">
    <el-form ref="form" :model="form" label-width="120px" style="width: 450px; margin: 0 auto;">
      <el-form-item label="用户名" prop="account" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">立即登录</el-button>
      </el-form-item>
    </el-form>
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
        password: "888888"
      },
      loading: false
    };
  },
  mounted() {
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
