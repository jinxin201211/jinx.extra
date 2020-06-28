el-inputel-inputel-inputel-inputel-input<template>
  <div id="page" class="jinx-page">
    <el-breadcrumb separator="/" style="margin: 30px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="TabActive">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" :model="form" label-width="120px">
          <el-card>
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
            <el-row>
              <el-col :span="12">
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
                  <el-radio-group v-model="form.worksSeries" id="radioWorksSeries">
                    <el-radio :label="item.code" v-for="(item, index) in $WorksSeriesCode" :key="'series' + index"> {{ item.code + ":" + item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
                  <el-radio-group v-model="form.worksType" @change="handleWorksTypeChange">
                    <el-radio :label="item.code" v-for="(item, index) in $WorksTypeCode" :key="'series' + index"> {{ item.code + ":" + item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
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
                <el-radio :label="item.code" v-for="(item, index) in $MaterialSurceCode" :key="'series' + index" border> {{ item.code + ":" + item.value }}</el-radio>
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
                </el-col>
                <el-col :span="12">
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
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
                </el-col>
                <el-col :span="12">
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
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
                </el-col>
              </el-row>
            </el-card>
            <el-card style="margin: 20px;" shadow="never" v-if="form.tUname != null && form.tUname != ''">
              <div slot="header" style="text-align: center;">
                <span>指导老师信息</span>
              </div>
              <el-row>
                <el-col :span="12">
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
                </el-col>
                <el-col :span="12">
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="电子邮箱" prop="tEmail" :rules="[{ validator: validateEmail, trigger: ['blur', 'change'] }]">
                    <el-input v-model="form.tEmail" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
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
                </el-col>
              </el-row>
            </el-card>
            <el-card style="margin: 20px;" shadow="never">
              <div slot="header" style="text-align: center;"><span style="color: #f56c6c; margin-right: 4px;">*</span><span>作品创意说明</span></div>
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
                <el-input type="textarea" maxlength="2000" show-word-limit v-model="form.creativeOverview"></el-input>
              </el-form-item>
            </el-card>

            <div style="text-align: center;">
              <el-button type="primary" @click="handleNextStep" :loading="loading">确认修改</el-button>
            </div>
          </el-card>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="附件" name="second">
        <el-card>
          <div style="margin: 15px 0; font-size: 24px; font-weight: bold;">上传作品文件：</div>
          <el-upload class="upload-demo" ref="upload" :action="action" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="handleSuccess" :on-error="handleError" :multiple="true" :data="param" :before-upload="handleBeforeUpload" :before-remove="handleBeforeRemove">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">点击‘选取文件’按钮选取要上传的文件，选取完成后，点击‘上传到服务器’按钮将文件上传到服务器，待文件全部上传成功之后单击‘提交本作品’按钮结束本次上传，单个文件大小不超过<span v-text="maxSize"></span>Mb</div>
          </el-upload>
        </el-card>
        <el-card v-for="(item, index) in WorksInfo.works_file" :key="'works_file' + index" style="margin-top: 15px;">
          <div slot="header" class="clearfix">
            <span v-text="'文件' + (index + 1) + '. ' + item.fileName"></span>
            <el-link v-if="isVideo(item.fileName)" :href="$FileGetServer + item.fileName" target="blank" type="primary" style="float: right;">下载</el-link>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleFileDelete(item.id, index)">删除</el-button>
          </div>
          <div v-if="isImage(item.fileName)" style="text-align: center;">
            <el-image :src="$FileGetServer + item.fileName" style="max-width: 960px; margin: 0 auto;" :preview-src-list="[$FileGetServer + item.fileName]">
              <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div v-else-if="isVideo(item.fileName)" style="text-align: center;">
            <jinx-video-player :src="item.fileName"></jinx-video-player>
          </div>
          <div v-else-if="isAudio(item.fileName)" style="text-align: center;">
            <audio :src="$FileGetServer + item.fileName" controls="controls" style="width: 960px; margin: 0 auto;">您的浏览器不支持 audio 标签。</audio>
          </div>
          <div v-else-if="isPDF(item.fileName)" style="text-align: center;">
            <a :href="$PdfViewerPath + $FileGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
          <div v-else style="text-align: center;">
            <a :href="$FileGetServer + item.fileName" v-text="item.fileName" target="_blank"></a>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
import JinxVideoPlayer from "@/components/JinxVideoPlayer.vue";

export default {
  components: { JinxVideoPlayer },
  data() {
    return {
      TabActive: "first",
      Scored: false,
      WorksInfo: {
        works: {},
        works_file: []
      },
      loading: false,
      form: {
        wid: "",
        wno: "",
        worksName: "",
        worksSeries: "",
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
        orgName: "",
        addr: "",
        creativeOverview: "",
        gameUname: this.$store.state.User.uname,
        gameType: this.$store.state.User.type ?? "1",
        tTel: "",
        tEmail: "",
        tOrgName: "",
        tUname: ""
      },
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
      param: {
        wid: this.$route.query.wid
      },
      fileList: [],
      successList: [],
      action: window.$FileUploadServer + "/gameWorksFile/upload",
      maxSize: 80
    };
  },
  mounted() {
    this.getNextWork();
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
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
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
    isImage: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif")) {
        return true;
      } else {
        return false;
      }
    },
    isAudio: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".wma") || file.endsWith(".ogg")) {
        return true;
      } else {
        return false;
      }
    },
    isVideo: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".flv") || file.endsWith(".mov") || file.endsWith(".mkv")) {
        return true;
      } else {
        return false;
      }
    },
    isPDF: function(file) {
      file = file.toLowerCase();
      if (file.endsWith(".pdf")) {
        return true;
      } else {
        return false;
      }
    },
    handleBack: function() {
      this.$router.go(-1);
    },
    getNextWork: function() {
      let loading = this.$loading({ target: "#page" });
      let that = this;
      // this.next_status.loading = true;
      this.axios
        .post("/api/gameWorks2/getWorksByWid", qs.stringify({ wid: this.$route.query.wid }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.WorksInfo = response.data.data;

            let data = response.data.data.works;
            that.form = {
              wid: data.wid,
              wno: data.wno,
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
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
          loading.close();
          // that.next_status.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          loading.close();
          // that.next_status.loading = false;
          that.$message({
            showClose: true,
            message: "获取作品信息失败",
            type: "warning"
          });
        });
    },
    handleDownload: function(file) {
      window.location.href = file;
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
        console.log(this.ValidateErrorMessage);
        if (valid) {
          this.submit();
        } else {
          let msg = "";
          for (let i = 0; i < this.ValidateErrorMessage.length; i++) {
            msg += "<p>" + this.ValidateErrorMessage[i] + "</p>";
          }
          this.$notify({
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
      let that = this;
      this.axios
        .post("/api/gameWorks2/add", qs.stringify(this.form))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.successList.splice(this.successList.indexOf(file), 1);
    },
    handleSuccess: function(response, file, fileList) {
      if (response.code == -1) {
        this.$message({
          showClose: true,
          message: `${file.name} 上传失败`,
          type: "error"
        });
        fileList.splice(fileList.indexOf(file), 1);
      } else {
        this.$message({
          showClose: true,
          message: `${file.name} 上传成功`,
          type: "info"
        });
        file.serverid = response.data;
        this.successList.push(file);
        this.successList.sort((a, b) => a.uid - b.uid);
      }
    },
    handleError: function(err, file, fileList) {
      this.$message({
        showClose: true,
        message: `${file.name} 上传失败`,
        type: "error"
      });
    },
    handleBeforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.maxSize;
      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      return true;
    },
    handleBeforeRemove: function(file, list) {
      if (file.status === "success") {
        let delete_file = this.successList[list.indexOf(file)];
        let that = this;
        this.axios
          .post("/api/gameWorksFile/delete", qs.stringify({ id: delete_file.serverid }))
          .then(function(response) {
            if (response && response.data.code == "0") {
              //删除页面列表上的数据
              that.$message({
                showClose: true,
                message: `文件删除成功`,
                type: "info"
              });
              list.splice(list.indexOf(file), 1);
            } else {
              that.$message({
                showClose: true,
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            that.$message({
              showClose: true,
              message: "文件删除失败",
              type: "warning"
            });
          });
        return false;
      }
    },
    handleFileDelete(id, index) {
      let that = this;
      this.axios
        .post("/api/gameWorksFile/delete", qs.stringify({ id: id }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            //删除页面列表上的数据
            that.$message({
              showClose: true,
              message: "删除成功",
              type: "info"
            });
            that.WorksInfo.works_file.splice(index, 1);
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: "文件删除失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.jinx-page {
  width: @typical-width;
  margin: 0 auto;
}

.el-tab-pane {
  padding: 20px;
}

.submit {
  width: @typical-width;
  margin: 20px auto;
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
</style>
