<template>
  <div>
    <van-nav-bar title="作品提交" left-arrow @click-left="$router.go(-1)" />
    <div class="submit" id="page">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <div>
          <div slot="header" style="text-align: center">
            <span>2021河北省公益广告大赛作品征集报名表（青少年组）</span>
          </div>
          <el-form-item label="作品编号">
            <el-input v-model="form.wno" maxlength="100" readonly disabled></el-input>
          </el-form-item>
          <el-form-item
            label="作品名称"
            prop="worksName"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请填写作品名称');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-input v-model="form.worksName" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item
            label="作品类别"
            prop="worksSeries"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请选择作品主题');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-select v-model="form.worksSeries" placeholder="请选择">
              <el-option v-for="(item, index) in WorksSeriesCode" :key="'worksseries' + index" :label="item.code + ':' + item.value" :value="item.code"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="worksSeriesSub"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请选择作品主题');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-select v-model="form.worksSeriesSub" placeholder="请选择">
              <el-option v-for="(item, index) in WorksSeriesSubCode" :key="'worksseriessub' + index" :label="item.code + ':' + item.value" :value="item.code"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="worksType"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请选择作品类别');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-select v-model="form.worksType" placeholder="请选择">
              <el-option v-for="(item, index) in $WorksTypeCode" :key="'workstype' + index" :label="item.code + ':' + item.value" :value="item.code"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="作品素材来源"
            prop="materialSurce"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请选择作品素材来源');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <el-radio-group v-model="form.materialSurce">
              <el-radio :label="item.code" v-for="(item, index) in $MaterialSurceCode" :key="'series' + index"> {{ item.code + ":" + item.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="作者姓名"
            prop="author1"
            required
            :rules="[
              {
                validator: (rule, value, callback) => {
                  validateRequired(rule, value, callback, '请填写作者的姓名');
                },
                trigger: ['blur', 'change']
              }
            ]"
          >
            <div>
              <el-input v-model="form.author1" maxlength="200"><template slot="prepend">1</template></el-input>
              <el-input v-model="form.author2" maxlength="200" style="margin-top: 15px;"><template slot="prepend">2</template></el-input>
              <el-input v-model="form.author3" maxlength="200" style="margin-top: 15px;"><template slot="prepend">3</template></el-input>
              <el-input v-if="AuthorCount > 3" v-model="form.author4" maxlength="200" style="margin-top: 15px;"><template slot="prepend">4</template></el-input>
              <el-input v-if="AuthorCount > 4" v-model="form.author5" maxlength="200" style="margin-top: 15px;"><template slot="prepend">5</template></el-input>
            </div>
          </el-form-item>
          <div shadow="never">
            <el-divider> <span>第一作者联系方式</span> </el-divider>
            <el-form-item
              label="身份证号"
              prop="idcardNo"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写身份证号');
                  },
                  trigger: ['blur', 'change']
                },
                { validator: validateID, trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="form.idcardNo" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              required
              prop="tel"
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写联系电话');
                  },
                  trigger: ['blur', 'change']
                },
                { validator: validatePhone, trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="form.tel" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="电子邮箱"
              prop="email"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写电子邮箱');
                  },
                  trigger: ['blur', 'change']
                },
                { validator: validateEmail, trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="form.email" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="QQ"
              prop="qq"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写QQ');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-model="form.qq" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="所属单位"
              prop="orgName"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写所属单位');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-model="form.orgName" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="有效通讯地址"
              prop="addr"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写有效通讯地址');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-model="form.addr" maxlength="200"></el-input>
            </el-form-item>
          </div>
          <div shadow="never">
            <el-divider> <span>监护人或指导老师信息</span> </el-divider>
            <el-form-item
              label="姓名"
              prop="tUname"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写指导老师姓名');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-model="form.tUname" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="tTel"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写指导老师联系电话');
                  },
                  trigger: ['blur', 'change']
                },
                { validator: validatePhone, trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="form.tTel" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="所属单位"
              prop="orgName"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写指导老师所属单位');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input v-model="form.tOrgName" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item
              label="指导用户类型"
              prop="guideType"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请选择指导用户类型');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-radio-group v-model="form.guideType">
                <el-radio :label="item.code" v-for="(item, index) in $GuideType" :key="'guideType' + index"> {{ item.code + ":" + item.value }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div shadow="never">
            <el-divider><span style="color: #f56c6c; margin-right: 4px;">*</span><span>作品创意说明</span></el-divider>
            <el-form-item
              label=""
              prop="creativeOverview"
              required
              :rules="[
                {
                  validator: (rule, value, callback) => {
                    validateRequired(rule, value, callback, '请填写作品创意说明');
                  },
                  trigger: ['blur', 'change']
                }
              ]"
              id="txtCreativeOverview"
            >
              <el-input type="textarea" maxlength="2000" show-word-limit v-model="form.creativeOverview" rows="5"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div style="text-align: center">
        <el-button type="primary" @click="handleNextStep" :loading="loading" :disabled="disabled">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      form: {
        wid: "",
        wno: "",
        worksName: "",
        worksSeries: "",
        worksSeriesSub: "",
        worksType: "",
        materialSurce: "",
        author1: "",
        author2: "",
        author3: "",
        author4: "",
        author5: "",
        idcardNo: "",
        tel: "",
        email: "",
        qq: "",
        guideType: "",
        orgName: "",
        addr: "",
        creativeOverview: "",
        gameUname: this.$store.state.User.uname,
        gameType: this.$store.state.User.type ?? "1",
        tTel: "",
        tEmail: "",
        tOrgName: "",
        tUname: ""
        // wid: "",
        // wno: "",
        // worksName: "作品名称1qaz",
        // worksSeries: "A",
        // worksType: "1",
        // materialSurce: "1",
        // author1: "金鑫",
        // author2: "",
        // author3: "",
        // author4: "",
        // author5: "",
        // idcardNo: "333333199901011111",
        // tel: "13333333333",
        // email: "11@xx.com",
        // qq: "123456789",
        // orgName: "单位5听广播yhn",
        // addr: "地址2wsx3edc",
        // creativeOverview: "创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明创意说明",
        // gameUname: this.$store.state.User.uname,
        // gameType: this.$store.state.User.type ?? "1",
        // tTel: "",
        // tEmail: "",
        // tOrgName: "",
        // tUname: ""
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
      ],
      ValidateErrorMessage: [],
      ErrorNotify: null,
      WorksSeriesCode: []
    };
  },
  computed: {
    WorksSeriesSubCode() {
      if (this.form.worksSeries) {
        return this.WorksSeriesCode.find(p => p.code === this.form.worksSeries).children;
      } else {
        return [];
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ErrorNotify) {
      this.ErrorNotify.close();
    }
    next();
  },
  created() {
    this.initWorksSeries();
  },
  mounted: function() {
    let wid = this.$route.query.wid;
    if (wid) {
      let loading_data = this.$loading({ target: "#page" });
      let _this = this;
      this.axios
        .post("/api/gameWorks2/getWorksByWid", qs.stringify({ wid: wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            let data = response.data.data.works;

            _this.form = {
              wid: data.wid,
              wno: data.wno,
              worksName: data.worksName,
              worksSeries: data.worksSeries,
              worksSeriesSub: data.worksSeriesSub,
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
              guideType: data.guideType,
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
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading_data.close();
        })
        .catch(function(err) {
          console.log(err);
          loading_data.close();
          _this.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    }
  },
  methods: {
    validateRequired: function(rule, value, callback, msg) {
      if (value == null || value.trim().length == 0) {
        this.ValidateErrorMessage.push(msg);
        return callback(new Error(msg));
      } else {
        callback();
      }
    },
    validateEmail: function(rule, value, callback) {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!value) {
        callback();
      }
      setTimeout(() => {
        if (emailReg.test(value)) {
          callback();
        } else {
          this.ValidateErrorMessage.push("邮箱地址格式不正确");
          callback(new Error("邮箱地址格式不正确"));
        }
      }, 100);
    },
    validatePhone: function(rule, value, callback) {
      const phoneReg = /^1[0-9]{10}$/;
      if (!value) {
        callback();
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          this.ValidateErrorMessage.push("手机号码格式不正确");
          callback(new Error("手机号码格式不正确"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            this.ValidateErrorMessage.push("手机号码格式不正确");
            callback(new Error("手机号码格式不正确"));
          }
        }
      }, 100);
    },
    validateID: function(rule, value, callback) {
      const idReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!value) {
        callback();
      }
      setTimeout(() => {
        if (idReg.test(value)) {
          callback();
        } else {
          this.ValidateErrorMessage.push("身份证号格式不正确");
          callback(new Error("身份证号格式不正确"));
        }
      }, 100);
    },
    initWorksSeries() {
      let _this = this;
      this.axios
        .post("/api/gameWorksSeries/getActiveList")
        .then(function(response) {
          if (response && response.data.code == "0") {
            let series = response.data.data;
            _this.WorksSeriesCode = series.filter(p => p.pid === -1).map(p => ({ id: p.id, code: p.code, value: p.value, children: [] }));
            _this.WorksSeriesCode.forEach(p => {
              p.children = series.filter(x => x.pid === p.id).map(p => ({ id: p.id, code: p.code, value: p.value }));
            });
          } else {
            _this.initWorksSeries();
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.initWorksSeries();
        });
    },
    handleWorksTypeChange: function(val) {
      this.AuthorCount = this.AuthorCountCode.find(p => p.type === val).count;
      if (this.AuthorCount === 3) {
        this.form.author4 = "";
        this.form.author5 = "";
      } else if (this.AuthorCount === 4) {
        this.form.author5 = "";
      }
    },
    handleNextStep: function() {
      this.ValidateErrorMessage = [];
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          let msg = "";
          for (let i = 0; i < this.ValidateErrorMessage.length; i++) {
            msg += "<p>" + this.ValidateErrorMessage[i] + "</p>";
          }
          this.ErrorNotify = this.$notify({
            title: "警告",
            message: msg,
            dangerouslyUseHTMLString: true,
            type: "warning",
            duration: 0
          });
          return false;
        }
      });
    },
    submit: function() {
      this.loading = true;
      let _this = this;
      this.axios
        .post("/api/gameWorks2/add", qs.stringify(this.form))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.wid = response.data.data;
            _this.disabled = true;
            _this.$router.replace({
              path: "/m/work/file",
              query: { wid: _this.wid, type: _this.form.worksType }
            });
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
  padding: 20px;
}

.el-radio {
  margin-bottom: 5px;
  margin-top: 5px;
}

#radioWorksSeries > .el-radio {
  min-width: 170px;
}

/deep/ #txtCreativeOverview > .el-form-item__content {
  margin: 0 !important;
}

/deep/ .el-form-item__label {
  line-height: 30px;
  padding: 0;
}
</style>
