<template>
  <div class="app-container">
    <div class="pro-title">实名认证</div>
    <div class="pro-box">
      <el-row :gutter="20">
        <el-col :span="6"><div class="">店铺创建者身份:</div></el-col>
        <el-col :span="12"><div class="">请在DOPE客户端的“实名认证”中填写个人资料</div></el-col>
        <el-col :span="4"><div class="go2certify"><span class="vertical-line">&nbsp;</span>未认证</div></el-col>
      </el-row>
      <div class="por-line"></div>
      <el-row :gutter="20">
        <el-col :span="6"><div class="">手机号码:</div></el-col>
        <el-col :span="12"><div class="">150****0000</div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {

      }
    },

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
  .el-row {
    line-height: 40px;
  }
  .por-line {
    width: 98%;
    margin: 15px auto;
    border-top: 1px solid #ddd;
  }
  .go2certify {
    color: rgb(22, 155, 213);
    cursor: pointer;
  }
  .vertical-line {
    color: #ddd;
    border-left: 1px solid #ddd;
    margin-right: 20px;
  }
</style>
