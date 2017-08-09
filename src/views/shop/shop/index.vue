<template>
  <div class="app-container">
    <div class="shop-title">店铺装修</div>
    <div class="shop-box">
        <el-row :gutter="20">
          <el-col class="left-box" :span="10">
            <div class="img-box" v-bind:class="{ img_box_mask: isTabs }">
                <img :src="shop_bg" alt="">
                <div class="abs-box" v-bind:class="{ abs_box_mask: !isTabs }" @click="showEditor">&nbsp;</div>
            </div>
          </el-col>
          <el-col :span="14">
            <div v-if="!isTabs">
                <div class="desc-title">打造个性店铺</div>
                <ul class="desc-list">
                    <li>你可以自定义店铺logo</li>
                    <li>选择店铺招牌图片</li>
                </ul>
            </div>
            <div class="tabs-box" v-if="isTabs">
                <el-tabs type="border-card">
                  <el-tab-pane label="编辑店铺招牌">
                    <div class="editor-box">
                        <p>店铺招牌</p>
                        <p class="desc-gray">图片建议尺寸为 750px × 210px</p>
                        <div class="upload-box">
                            <div class="uploader-border">
                                <el-upload
                                  class="avatar-uploader avatar_hover"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :show-file-list="false"
                                  :auto-upload="false"
                                  :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                  <span v-else class="holder-text">点击上传招牌图片</span>
                                </el-upload>
                            </div>

                        </div>
                        <div class="pre-view">
                            <el-button class="pre-view-btn" type="primary" plain size="large">预览</el-button>
                        </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="编辑店铺LOGO">
                    <div class="editor-box">
                        <p>店铺LOGO</p>
                        <div class="upload-box">
                            <div class="uploader-border-circle">
                                <el-upload
                                  class="logo-uploader logo_hover"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :auto-upload="false"
                                  :show-file-list="false"
                                  :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="logoUrl" :src="logoUrl" class="logoImg">
                                  <span v-else class="holder-text">点击上传LOGO图片</span>
                                </el-upload>
                            </div>
                        </div>
                        <div class="pre-view">
                            <el-button class="pre-view-btn" type="primary" plain size="large">预览</el-button>
                        </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
            </div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
    import shop_bg from '@/assets/shop_images/shop_bg.png'
    export default {
        data() {
            return {
                shop_bg,
                isTabs: false,
                imageUrl: '',
                logoUrl: '',
                isImg: false
            }
        },
        methods: {
            showEditor() {
                this.isTabs = !this.isTabs
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.isImg = true;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
    .app-container {
        padding-left: 80px;
    }
    .shop-title {
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .el-col {
        overflow: hidden;
    }
    .img-box {
        width: 414px;
        position: relative;
    }
    .abs-box {
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        line-height: 117px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: url('../../../assets/shop_images/header_bg.png');
        z-index: 2;
    }
    .abs_box_mask::after {
        position: absolute;
        content: '编辑';
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .7);
        color: #fff;
        font-size: 20px;
        line-height: 117px;
        z-index: 3;
    }
    .img-box:hover .abs_box_mask::after {
        display: block;
    }
    .img_box_mask::after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        z-index: 1;
    }
    .abs-box:hover {
        cursor: pointer;
    }
    .desc-title {
        position: relative;
        font-size: 40px;
        padding-bottom: 20px;
        font-weight: 400;
    }
    .desc-title::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 80px;
        border-top: 3px solid #000;
    }
    .desc-list {
        padding: 0;
        margin: 30px 0;
        list-style: none;
    }
    .desc-list li {
        line-height: 40px;
    }
    .editor-box {
        padding: 20px;
    }
    .desc-gray {
        color: rgb(153, 153, 153);
    }
    .upload-box {
        margin: 50px 0;
    }
    .uploader-border,
    .uploader-border-circle {
        display: inline-block;
        padding: 10px;
        border: 1px solid #ddd;
    }
    .uploader-border-circle {
        margin-left: 90px;
        border-radius: 50%;
    }
    .pre-view {
        margin: 50px 0;
    }
    .pre-view-btn{
        width: 397px;
    }
    .el-button--large {
        font-size: 20px;
    }
    .avatar-uploader {
        height: 105px;
    }
    .avatar-uploader .el-upload {
        width: 375px;
        height: 105px;
        line-height: 105px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background: #f2f2f2;
    }
    .logo-uploader {
        height: 180px;
    }
    .logo-uploader .el-upload {
        width: 180px;
        height: 180px;
        line-height: 180px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background: #f2f2f2;
    }
    .logoImg {
        width: 180px;
        height: 180px;
        display: block;
    }
    .avatar {
        width: 375px;
        height: 105px;
        display: block;
    }
    .holder-text {
        font-size: 20px;
        color: rgb(204, 204, 204);
    }
    .avatar_hover,
    .logo_hover {
        position: relative;
    }
    .avatar_hover::after {
        position: absolute;
        display: none;
        content: '点击替换招牌图片';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        line-height: 105px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, .7);
    }
    .logo_hover::after {
        position: absolute;
        display: none;
        content: '点击替换LOGO图片';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        top: 0;
        left: 0;
        line-height: 180px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, .7);
    }

    .uploader-border:hover .avatar_hover::after,
    .uploader-border-circle:hover .logo_hover::after {
        display: block;
    }


</style>