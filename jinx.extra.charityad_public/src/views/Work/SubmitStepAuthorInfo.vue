<template>
  <div class="submit">
    <el-steps :active="active" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写基本资料"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div>
      <el-form ref="form" :model="form" label-width="80px" style="padding: 0 20px; margin: 0 auto;">
        <div style="font-weight: bold; margin: 10px 0;">作者1信息(标*为必填)</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="author1.name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.author1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="author1.grade" :rules="[{ required: true, message: '请选择年级', trigger: 'blur' }]">
              <el-select v-model="form.author1.grade" placeholder="请选择">
                <el-option label="大一" value="1"> </el-option>
                <el-option label="大二" value="2"> </el-option>
                <el-option label="大三" value="3"> </el-option>
                <el-option label="大四" value="4"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创作分工" prop="author1.duty" :rules="[{ required: true, message: '请输入创作分工', trigger: 'blur' }]">
              <el-input v-model="form.author1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" prop="author1.major" :rules="[{ required: true, message: '请选择专业', trigger: 'blur' }]">
              <el-select v-model="form.author1.major" placeholder="请选择">
                <el-option label="理科类" value="1"> </el-option>
                <el-option label="理科类" value="2"> </el-option>
                <el-option label="理科类" value="3"> </el-option>
                <el-option label="理科类" value="4"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型" prop="author1.identity_type" :rules="[{ required: true, message: '请选择证件类型', trigger: 'blur' }]">
              <el-radio-group v-model="form.author1.identity_type">
                <el-radio label="1">身份证</el-radio>
                <el-radio label="2">护照</el-radio>
                <el-radio label="3">港澳通行证</el-radio>
                <el-radio label="4">台胞证</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="号码" prop="author1.identity_number" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' }]">
              <el-input v-model="form.author1.identity_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="author1.phone" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
              <el-input v-model="form.author1.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ号" prop="author1.qq" :rules="[{ required: true, message: '请输入QQ号', trigger: 'blur' }]">
              <el-input v-model="form.author1.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="author1.email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
              <el-input v-model="form.author1.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联系地址">
              <el-input v-model="form.author1.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编">
              <el-input v-model="form.author1.post"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider></el-divider>
        <div style="font-weight: bold; margin: 10px 0;">作者2信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.author2.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级">
              <el-select v-model="form.author2.grade" placeholder="请选择">
                <el-option label="大一" value="1"> </el-option>
                <el-option label="大二" value="2"> </el-option>
                <el-option label="大三" value="3"> </el-option>
                <el-option label="大四" value="4"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创作分工">
              <el-input v-model="form.author2.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业">
              <el-select v-model="form.author2.major" placeholder="请选择">
                <el-option label="理科类" value="1"> </el-option>
                <el-option label="理科类" value="2"> </el-option>
                <el-option label="理科类" value="3"> </el-option>
                <el-option label="理科类" value="4"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型">
              <el-radio-group v-model="form.author2.identity_type">
                <el-radio label="1">身份证</el-radio>
                <el-radio label="2">护照</el-radio>
                <el-radio label="3">港澳通行证</el-radio>
                <el-radio label="4">台胞证</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="号码">
              <el-input v-model="form.author2.identity_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="form.author2.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ号">
              <el-input v-model="form.author2.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="form.author2.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联系地址">
              <el-input v-model="form.author2.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编">
              <el-input v-model="form.author2.post"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider></el-divider>
        <div style="font-weight: bold; margin: 10px 0;">教师1信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.teacher.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型">
              <el-radio-group v-model="form.teacher.identity_type">
                <el-radio label="1">身份证</el-radio>
                <el-radio label="2">护照</el-radio>
                <el-radio label="3">港澳通行证</el-radio>
                <el-radio label="4">台胞证</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="号码">
              <el-input v-model="form.teacher.identity_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="form.teacher.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ号">
              <el-input v-model="form.teacher.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="form.teacher.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-divider></el-divider>
    <div style="text-align: center;">
      <el-button type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: 1,
      form: {
        author1: { name: "", grade: "", duty: "", major: "", identity_type: "", identity_number: "", phone: "", qq: "", email: "", address: "", post: "" },
        author2: { name: "", grade: "", duty: "", major: "", identity_type: "", identity_number: "", phone: "", qq: "", email: "", address: "", post: "" },
        teacher: { name: "", identity_type: "", identity_number: "", phone: "", qq: "", email: "" }
      }
    };
  },
  methods: {
    handleNextStep: function() {
      this.$router.push("/work/upload");
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$router.push("/work/upload");
          // this.signup();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.submit {
  width: @typical-width;
  margin: 20px auto;
}
</style>
