<template>
  <div class="app-container">
    <div class="pro-title">个人资料</div>
    <div class="pro-box">
      <el-row class="pro-el-row" :gutter="20">
        <el-col :span="6"><div class="">本账户角色:</div></el-col>
        <el-col :span="12"><div class="">财务</div></el-col>
      </el-row>
      <div class="por-line"></div>
      <el-row class="pro-el-row" :gutter="20">
        <el-col :span="6"><div class="">昵称:</div></el-col>
        <el-col :span="12"><div class="">三十</div></el-col>
      </el-row>
      <div class="por-line"></div>
      <el-row class="pro-el-row" :gutter="20">
        <el-col :span="6"><div class="">手机号码:</div></el-col>
        <el-col :span="12"><div class="">150****0000</div></el-col>
      </el-row>
    </div>
    <div class="pro-upload">
      <avatar-upload></avatar-upload>
    </div>
  </div>
</template>

<script>

  import avatarUpload from './components/avatarUpload'

  export default {
    components: { avatarUpload },
    data() {
      return {
      }
    }
  }
</script>
<style>
  .pro-box,
  .pro-title,
  .pro-upload {
    width: 80%;
    margin: 0 auto;
  }
  .pro-box {
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 20px;
  }
  .pro-title {
    line-height: 50px;
    font-size: 20px;
    margin: 50px auto;
  }
  .pro-el-row {
    line-height: 40px;
  }
  .por-line {
    width: 98%;
    margin: 15px auto;
    border-top: 1px solid #ddd;
  }

</style>