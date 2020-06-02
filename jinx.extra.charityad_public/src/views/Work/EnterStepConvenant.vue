<template>
  <div class="submit">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>作品提交</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="0" finish-status="success">
      <el-step title="勾选承诺书"></el-step>
      <el-step title="填写报名表"></el-step>
      <el-step title="上传作品文件"></el-step>
      <el-step title="结束提交"></el-step>
    </el-steps>

    <el-divider></el-divider>

    <div style="font-size: 16px; text-indent: 2em;">
      <p style="font-size: 24px; text-align: center;"><b>河北省公益广告大赛 参赛承诺书 </b></p>

      <div class="divider"></div>
      <p>承诺人已充分知晓并自愿接受《河北省公益广告大赛大赛章程》(以下简称“《大赛章程》”)，谨向河北省公益广告大赛组委会(以下简称“大赛组委会”)承诺如下:</p>

      <p>(一)承诺人保证本人为参加河北省公益广告大赛参赛作品(以下简称“参赛作品”)的创作者，对参赛作品拥有完整且排他的著作权。</p>

      <p>(二)承诺人保证其参赛作品为原创作品，除参加本设计竞赛外，未曾以任何形式发表过，也未曾以任何方式为公众所知。</p>

      <p>(三)承诺人保证其在全球范围内未曾自行或授权他人对参赛作品进行任何形式的使用或开发。自参赛作品提交之日起，承诺人不会自行或授权他人对参赛作品进行任何形式的使用或开发。</p>

      <p>(四)承诺人确认，除大赛组委会书面许可的情形外，无论何时何地,承诺人不得以任何形式发表、宣传和转让其参赛作品。</p>

      <p>(五)承诺人确认，参赛作品的一切知识产权(包括但不限于著作权、对作品的一切平面、立体或电子载体的全部权利)自参赛作品提交之日起归大赛组委会所有。大赛组委会有权对参赛作品进行任何形式的使用、开发、修改、授权、许可或保护等活动。</p>

      <p>(六)承诺人保证其参赛作品未侵犯任何第三方的合法权益，如因承诺人的参赛作品侵犯第三方合法权益或因承诺人的其他过错而使大赛组委会遭受任何名誉或经济上的损失，大赛组委会均有权要求承诺人采取足够而适当的措施，以保证大赛组委会免受上述损失。同时大赛组委会保留向承诺人追究和索赔的权利。</p>

      <p>(七)承诺人保证其承诺真实可靠，并善意履行本承诺。如有违反而导致大赛组委会遭受损害，承诺人将承担相应法律责任。大赛组委会均有取消承诺人参赛资格的权利。</p>

      <p>(八)参赛作品提交之日参赛人未满十八周岁的，同时需要参赛人的监护人在“作者签名”处签名，并注明与参赛人的监护关系。</p>

      <p>(九)本承诺书适用中华人民共和国法律。</p>

      <p>(十)本承诺书自承诺人点击确认后生效。</p>

      <div class="divider"></div>
    </div>
    <div style="text-align: center;">
      <el-checkbox name="agree" v-model="agree">勾选同意《承诺书》<el-link @click.stop.prevent="$router.push('/convenant')" to="convenant"></el-link></el-checkbox>
    </div>

    <el-divider></el-divider>
    <div style="text-align: center;">
      <el-button type="primary" @click="handleNextStep" :disabled="!agree">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      agree: false
    };
  },
  methods: {
    handleNextStep: function() {
      let group = this.$store.state.User.type;
      if (group === "0") {
        this.$router.push("/work/groupschool");
      } else {
        this.$router.push("/work/grouppublic");
      }
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
