<template>
  <div class="submit" id="page">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="1" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写报名表"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-form ref="form" :model="form" label-width="120px" style="padding: 0 20px; margin: 30px auto;">
      <el-card>
        <div slot="header" style="text-align: center;">
          <span>2020河北省公益广告大赛作品征集报名表（专业类、公众类）</span>
        </div>
        <el-form-item label="作品编号">
          <el-input v-model="form.wid" maxlength="100" readonly disabled></el-input>
        </el-form-item>
        <el-form-item
          label="作品名称"
          prop="worksName"
          :rules="[
            { required: true, message: '请输入作品名称', trigger: 'blur' },
            { min: 0, max: 200, message: '最多 200 个字符', trigger: 'blur' }
          ]"
        >
          <el-input v-model="form.worksName" maxlength="200"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作品类别" prop="worksSeries" :rules="[{ required: true, message: '请选择作品类别', trigger: 'blur' }]">
              <el-radio-group v-model="form.worksSeries">
                <el-radio label="A">A:中国梦系列</el-radio>
                <el-radio label="B">B:营商环境系列</el-radio>
                <el-radio label="C">C:生态保护系列</el-radio>
                <el-radio label="D">D:传统文化系列</el-radio>
                <el-radio label="E">E:社会热点系列</el-radio>
                <el-radio label="F">F:其他主题</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="worksType" :rules="[{ required: true, message: '请选择作品类别', trigger: 'blur' }]">
              <el-radio-group v-model="form.worksType" @change="handleWorksTypeChange">
                <el-radio label="1">1:平面类</el-radio>
                <el-radio label="2">2:文案类</el-radio>
                <el-radio label="3">3:广播类</el-radio>
                <el-radio label="4">4:视频类</el-radio>
                <el-radio label="5">5:动画类</el-radio>
                <el-radio label="6">6:互动类</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="作品素材来源" prop="materialSurce" :rules="[{ required: true, message: '请选择作品素材来源', trigger: 'blur' }]">
          <el-radio-group v-model="form.materialSurce">
            <el-radio label="1">我保重此作品是我的原创</el-radio>
            <el-radio label="2">我使用了素材</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="作者姓名" prop="author1" :rules="[{ required: true, message: '请填写作者1的姓名', trigger: 'blur' }]">
          <div>
            <el-input v-model="form.author1" maxlength="200" style="width: 150px;"><template slot="prepend">1</template></el-input>
            <el-input v-model="form.author2" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">2</template></el-input>
            <el-input v-model="form.author3" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">3</template></el-input>
            <el-input v-if="AuthorCount > 3" v-model="form.author4" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">4</template></el-input>
            <el-input v-if="AuthorCount > 4" v-model="form.author5" maxlength="200" style="width: 150px; margin-left: 20px;"><template slot="prepend">5</template></el-input>
          </div>
        </el-form-item>
        <el-card style="margin: 20px;" shadow="never">
          <div slot="header" style="text-align: center;">
            <span>第一作者联系方式</span>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="身份证号"
                prop="idcardNo"
                :rules="[
                  { required: true, message: '请填写身份证号', trigger: 'blur' },
                  { validator: validateID, trigger: 'blur' }
                ]"
              >
                <el-input v-model="form.idcardNo" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系电话"
                prop="tel"
                :rules="[
                  { required: true, message: '请填写联系电话', trigger: 'blur' },
                  { validator: validatePhone, trigger: 'blur' }
                ]"
              >
                <el-input v-model="form.tel" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="电子邮箱"
                prop="email"
                :rules="[
                  { required: true, message: '请填写电子邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input v-model="form.email" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ" prop="qq" :rules="[{ required: true, message: '请填写QQ', trigger: 'blur' }]">
                <el-input v-model="form.qq" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="所属单位" prop="orgName" :rules="[{ required: true, message: '请填写所属单位', trigger: 'blur' }]">
                <el-input v-model="form.orgName" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="有效通讯地址" prop="addr" :rules="[{ required: true, message: '请填写有效通讯地址', trigger: 'blur' }]">
                <el-input v-model="form.addr" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin: 20px;" shadow="never">
          <div slot="header" style="text-align: center;">
            <span>作品创意说明</span>
          </div>
          <el-input type="textarea" maxlength="2000" show-word-limit v-model="form.creativeOverview"></el-input>
        </el-card>
      </el-card>
    </el-form>

    <div style="text-align: center;">
      <el-button type="primary" @click="handleNextStep" :loading="loading" :disabled="disabled">下一步</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      form: {
        // wid: "",
        // worksName: "",
        // worksSeries: "",
        // worksType: "",
        // materialSurce: "",
        // author1: "",
        // author2: "",
        // author3: "",
        // author4: "",
        // author5: "",
        // idcardNo: "",
        // tel: "",
        // email: "",
        // qq: "",
        // orgName: "",
        // addr: "",
        // creativeOverview: "",
        // gameUname: this.$store.state.User.uname,
        // gameType: this.$store.state.User.type ?? "1",
        // tTel: "",
        // tEmail: "",
        // tOrgName: "",
        // tUname: "",
        wid: "",
        worksName: "作品名称1qaz",
        worksSeries: "A",
        worksType: "1",
        materialSurce: "1",
        author1: "金鑫",
        author2: "",
        author3: "",
        author4: "",
        author5: "",
        idcardNo: "333333199901011111",
        tel: "13333333333",
        email: "11@xx.com",
        qq: "123456789",
        orgName: "单位5听广播yhn",
        addr: "地址2wsx3edc",
        creativeOverview: "创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明",
        gameUname: this.$store.state.User.uname,
        gameType: this.$store.state.User.type ?? "1",
        tTel: "",
        tEmail: "",
        tOrgName: "",
        tUname: ""
      },
      loading: false,
      disabled: false,
      wid: "",
      AuthorCount: 3,
      AuthorCountCode: [
        { type: "1", count: 3 },
        { type: "2", count: 3 },
        { type: "3", count: 3 },
        { type: "4", count: 5 },
        { type: "5", count: 5 },
        { type: "6", count: 4 }
      ]
    };
  },
  mounted: function() {
    let wid = this.$route.query.wid;
    // console.log(wid);
    if (wid) {
      let loading_data = this.$loading({ target: "#page" });
      let that = this;
      // this.next_status.loading = true;
      this.axios
        .post("/api/gameWorks2/getWorksByWid", qs.stringify({ wid: wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data.works;
            that.form = {
              wid: data.wid,
              worksName: data.worksName,
              worksSeries: data.worksSeries,
              worksType: data.worksType,
              materialSurce: data.materialSurce,
              author1: data.author1,
              author2: data.author2,
              author3: data.author3,
              author4: data.author4,
              author5: data.author5,
              idcardNo: data.idcardNo,
              tel: data.tel,
              email: data.email,
              qq: data.qq,
              orgName: data.orgName,
              addr: data.addr,
              creativeOverview: data.creativeOverview,
              gameUname: data.gameUname,
              gameType: data.gameType,
              tTel: data.tTel,
              tEmail: data.tEmail,
              tOrgName: data.tOrgName,
              tUname: data.tUname
            };
            // console.log(data);
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading_data.close();
          // that.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading_data.close();
          // that.next_status.loading = false;
          that.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    }
  },
  methods: {
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
    validateID: function(rule, value, callback) {
      const idReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!value) {
        return callback(new Error("请输入身份证号"));
      }
      setTimeout(() => {
        if (idReg.test(value)) {
          callback();
        } else {
          callback(new Error("身份证号格式不正确"));
        }
      }, 100);
    },
    handleWorksTypeChange: function(val) {
      // console.log(val);
      this.AuthorCount = this.AuthorCountCode.find(p => p.type === val).count;
      if (this.AuthorCount === 3) {
        this.form.author4 = "";
        this.form.author5 = "";
      } else if (this.AuthorCount === 4) {
        this.form.author5 = "";
      }
    },
    handleNextStep: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.wid = "123456";
          // this.disabled = true;
          // this.$router.replace({
          //   path: "/work/file",
          //   query: { wid: this.wid }
          //   // name: "file",
          //   // params: { wid: this.wid }
          // });
          this.submit(); //todo
        } else {
          return false;
        }
      });
    },
    submit: function() {
      this.loading = true;
      let that = this;
      // let data = {
      //   area: this.form.region,
      //   creativeOverview: this.form.summary,
      //   major: this.form.major,
      //   materialSurce: this.form.source,
      //   propositionName: this.form.topic_name,
      //   propositionType: this.form.topic_type,
      //   worksName: this.form.name
      // };
      // console.log(this.form);
      this.axios
        .post("/api/gameWorks2/add", qs.stringify(this.form))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.wid = response.data.data;
            that.disabled = true;
            that.$router.replace({
              path: "/work/file",
              query: { wid: that.wid, type: that.form.worksType }
              // name: "authorinfo",
              // params: { wid: this.wid }
            });
          } else {
            that.$message({
              showClose: true,
              message: "提交失败",
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
            message: "提交失败",
            type: "warning"
          });
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
