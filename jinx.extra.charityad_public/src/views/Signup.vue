<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="width: 450px; margin: 0 auto; padding: 20px 0;">
      <el-form-item label="邮箱">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.repassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
        <el-link type="primary" :underline="false" style="margin-left: 20px;" :to="'register'" @click="$router.push('signin')">登录</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        account: "",
        nickname: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    onSubmit: function() {
      console.log("submit");
    }
  }
};
</script>
