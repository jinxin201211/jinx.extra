<template>
  <div style="padding: 20px;">
    <el-page-header @back="handleBack" content="修改配置" style="margin-bottom: 20px;"> </el-page-header>
    <el-form ref="form" :model="form" label-width="120px" style="padding: 0 20px; margin: 0 auto;">
      <el-form-item label="键">
        <el-input v-model="form.sysKey" style="width: 250px;" disabled readonly></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.remark" style="width: 250px;" disabled readonly></el-input>
      </el-form-item>
      <el-form-item label="值">
        <el-date-picker v-model="form.sysValue" type="date" placeholder="选择日期" style="width: 250px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data: function() {
    return {
      form: {
        sysKey: "",
        remark: "",
        sysValue: ""
        // ctime: null,
        // utime: null
      },
      loading: false
    };
  },
  mounted: function() {
    let that = this;
    this.axios
      .get("/api/sysConfig/getOne", { params: { sysKey: this.$route.query.key } })
      .then(function(response) {
        if (response && response.data.code == "0") {
          that.form.sysKey = response.data.data.sysKey;
          that.form.remark = response.data.data.remark;
          that.form.sysValue = response.data.data.sysValue;
          // that.form.ctime = response.data.data.ctime;
          // that.form.utime = response.data.data.utime;
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
          message: "获取配置失败",
          type: "warning"
        });
      });
  },
  methods: {
    handleBack: function() {
      this.$router.go(-1);
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
      let that = this;
      this.axios
        .post("/api/sysConfig/edit", qs.stringify({ record: this.form }))
        .then(function(response) {
          if (response && response.data.code == "0") {
            that.$message({
              showClose: true,
              message: "修改成功",
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
            message: "修改失败",
            type: "warning"
          });
        });
    }
  }
};
</script>
