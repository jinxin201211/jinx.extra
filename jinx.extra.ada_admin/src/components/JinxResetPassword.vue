<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item
        label="新密码"
        prop="password"
        :rules="[
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]"
      >
        <el-input v-model="form.password" show-password style="width: 250px;" maxlength="15" minlength="6"></el-input>
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">确 定</el-button>
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
        password: "",
        repassword: ""
      },
      loading: false,
      User: this.$store.getters.getUser
    };
  },
  mixins: [md5],
  mounted: function() {
    // this.handleRefreshCode();
  },
  methods: {
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
      let that = this;
      let data = {
        uid: this.User.uid,
        email: this.User.email,
        tel: this.User.tel,
        uname: this.User.uname,
        pwd: this.hex_md5(this.form.password)
      };
      this.axios
        .post("/api/sysUser/edit", qs.stringify(data))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            that.$emit("closeDialog");
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
            message: "修改失败",
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
    }
  }
};
</script>
