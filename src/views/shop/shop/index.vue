<template>
  <div class="app-container">
    <div class="shop-title">店铺装修</div>
    <div class="shop-box">
        <el-row :gutter="20">
          <el-col class="left-box" :span="10">
            <div class="img-box" v-bind:class="{ img_box_mask: isTabs }">
                <img :src="shop_bg" alt="">
                <div class="abs-box" v-if="!isPreview" v-bind:class="{ abs_box_mask: !isTabs }" @click="showEditor">
                    
                </div>
                <div class="abs-box" v-if="isPreview">
                    <img class="shop_header" :src="previewHeader" alt="">
                    <div class="shop_avatar">
                        <img class="shop_avatar_img" :src="previewAvatar" alt="">
                    </div>
                    <p class="shop_title">DOPE官方旗舰店</p>
                    <p class="shop_collect">+关注</p>
                </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div v-if="!isTabs">
                <div class="desc-title"><span v-if="!isPreview">打造个性店铺</span><span v-else>预览</span></div>
                <ul class="desc-list">
                    <li>你可以自定义店铺logo</li>
                    <li>选择店铺招牌图片</li>
                </ul>
                <div v-if="isPreview" class="preview-btn-box">
                    <div class="preview-btn-item">
                        <el-button class="preview-btn-apply" type="primary" @click="applyPreview" size="large">应用到店铺</el-button>
                    </div>
                    <div class="preview-btn-item">
                        <el-button class="preview-btn-cancel" type="primary" @click="cancelPreview" plain size="large">取&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                    </div>
                </div>
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
                                  class="avatar-uploader"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :show-file-list="false"
                                  :auto-upload="false"
                                  :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="imageUrl" :src="imageUrl" class="avatar avatar_hover">
                                  <span v-else class="holder-text">点击上传招牌图片</span>
                                </el-upload>
                            </div>

                        </div>
                        <div class="pre-view">
                            <el-button class="pre-view-btn" type="primary" @click="goToPreview" plain size="large">预览</el-button>
                        </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="编辑店铺LOGO">
                    <div class="editor-box">
                        <p>店铺LOGO</p>
                        <div class="upload-box">
                            <div class="uploader-border-circle">
                                <el-upload
                                  class="logo-uploader"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                  :auto-upload="false"
                                  :show-file-list="false"
                                  :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="logoUrl" :src="logoUrl" class="logoImg logo_hover">
                                  <span v-else class="holder-text">点击上传LOGO图片</span>
                                </el-upload>
                            </div>
                        </div>
                        <div class="pre-view">
                            <el-button class="pre-view-btn" type="primary" @click="goToPreview" plain size="large">预览</el-button>
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
    import header_bg from '@/assets/shop_images/header_bg.png'
    import previewHeader from '@/assets/shop_images/new_header_bg.jpg'
    import previewAvatar from '@/assets/shop_images/header_avatar.jpg'
    export default {
        data() {
            return {
                shop_bg,
                previewHeader,
                previewAvatar,
                isTabs: false,
                imageUrl: '',
                logoUrl: '',
                isImg: false,
                isPreview: false,
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
            },
            goToPreview() {
                this.isPreview = true;
                this.isTabs = false;
            },
            applyPreview() {
                // this.isPreview = false;
                // this.isTabs = false;
            },
            cancelPreview() {
                this.isPreview = false;
                this.isTabs = false;
            },
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
        top: 71px;
        left: 0;
        width: 100%;
        height: 116px;
        line-height: 116px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: url('../../../assets/shop_images/header_bg.png');
        z-index: 2;
        overflow: hidden;
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
    .preview-btn-box {
        margin: 40px 0;
    }
    .preview-btn-apply,
    .preview-btn-cancel {
        width: 300px;
        margin: 20px auto;
    }
    .shop_header {
        display: block;
        width: 100%;
    }
    .shop_avatar {
        position: absolute;
        left: 43px;
        bottom: 15px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #eee;
        overflow: hidden;
    }
    .shop_avatar_img {
        display: block;
        width: 100%;
    }
    .shop_title {
        position: absolute;
        left: 108px;
        bottom: 18px;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: #fff;
    }
    .shop_collect {
        position: absolute;
        right: 20px;
        bottom: 16px;
        width: 66px;
        height: 26px;
        line-height: 25px;
        font-size: 14px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 4px;
    }

</style>
