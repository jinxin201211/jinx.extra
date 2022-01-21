<template>
  <el-dialog title="" :visible.sync="Show" width="650px" append-to-body>
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="邮寄地址">
        <el-input type="textarea" v-model="form.mailAddress" rows="4" maxlength="200" show-word-limit :disabled="disabled"></el-input>
      </el-form-item>
      <div style="font-size: 12px; color: #606266; margin-top: 7px;">说明：地址用于邮寄获奖证书，邮费到付</div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Show = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="disabled">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Show: false,
      form: { mailAddress: "" },
      loading: false,
      disabled: true
    };
  },
  model: {
    prop: "show",
    event: "change"
  },
  watch: {
    show: {
      immediate: true,
      handler(after, before) {
        this.Show = after;
        if (after) {
          this.getMailAddress();
        }
      }
    },
    Show(after, before) {
      this.$emit("change", after);
    }
  },
  methods: {
    getMailAddress() {
      const _this = this;
      this.disabled = true;
      this.axios
        .get("/api/gameUser/getMailAddress")
        .then(function(response) {
          if (response && response.data.code == "0") {
            // _this.dialogMailAddress = true;
            _this.form.mailAddress = response.data.data.mailAddress;
            _this.disabled = false;
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSubmit() {
      this.loading = true;
      const _this = this;
      this.axios
        .post("/api/gameUser/updateMailAddress", qs.stringify(this.form))
        .then(function(response) {
          if (response && response.data.code == "0") {
            _this.Show = false;
            _this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
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

<style scoped></style>
