<template>
    <div class="app-container">
        <div class="model-title clr">
            <div class="title-text"><span class="vertical-line-b">&nbsp;</span>添加模块</div>
            <ul class="model-wrap">
                <li class="model-item" @click="addTextModel">
                    <div class="model-icon text-model"></div>
                    <p>文字</p>
                </li>
                <li class="model-item" @click="addImgModel">
                    <div class="model-icon img-model"></div>
                    <p>图片</p>
                </li>
                <li class="model-item" @click="addLineModel">
                    <div class="model-icon line-model"></div>
                    <p>分割线</p>
                </li>
            </ul>
            <div class="title-save-btn"><el-button type="primary" size="large">&nbsp;&nbsp;保&nbsp;&nbsp;存&nbsp;&nbsp;</el-button></div>
        </div>
        <div class="detail-edit-wrap">
            <div class="dynamic-editor-container">
                <div class="model-item-box" v-for="(item, index) in dynamicModel">
                    <div class="add-img-box" v-if="item.type == 'img'">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="item.modelData" :src="item.modelData" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div class="add-text-box" v-if="item.type == 'text'">
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="item.modelData">
                        </el-input>
                    </div>
                    <div class="add-line-box" v-if="item.type == 'line'"></div>
                </div>
            </div>
            <div class="move-model-wrap">
                <ul class="model-wrap">
                    <li class="model-item" @click="addTextModel">
                        <div class="model-icon text-model"></div>
                        <p>文字</p>
                    </li>
                    <li class="model-item" @click="addImgModel">
                        <div class="model-icon img-model"></div>
                        <p>图片</p>
                    </li>
                    <li class="model-item" @click="addLineModel">
                        <div class="model-icon line-model"></div>
                        <p>分割线</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dynamicModel: [

                ]
            }
        },
        methods: {
            addTextModel() {
                this.dynamicModel.push({
                    type: 'text',
                    modelData: ''
                })
            },
            addImgModel() {
                this.dynamicModel.push({
                    type: 'img',
                    modelData: ''
                })
            },
            addLineModel() {
                this.dynamicModel.push({
                    type: 'line',
                    modelData: ''
                })
            },
            handleAvatarSuccess(res, file, index) {
                // this.dynamicModel[index].modelData = '';
                // console.log(index)
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
    .clr::after {
        content: '';
        display: table;
        clear: both;
    }
    .model-title {
        width: 80%;
        margin: 0 auto;
        padding: 40px;
        line-height: 40px;
        background: #f2f2f2;
    }
    .vertical-line-b {
        border-left: 4px solid #333;
    }
    .title-text {
        float: left;
        line-height: 1;
    }
    .title-save-btn {
        float: right;
    }
    .model-wrap {
        list-style: none;
        padding-left: 80px;
        display: inline-block;
        margin: 0;
    }
    .model-item {
        display: inline-block;
        text-align: center;
        margin: 0 10px;
        cursor: pointer;
    }
    .model-item p {
        margin: 0;
        line-height: 1;
        color: #333;
    }
    .model-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
    }
    .text-model {
        background: #fff url('../../../../assets/commodity_images/text_model.png') no-repeat 5px 5px/30px;
    }
    .img-model {
        background: #fff url('../../../../assets/commodity_images/img_model.png') no-repeat 5px 5px/30px;
    }
    .line-model {
        background: #fff url('../../../../assets/commodity_images/line_model.png') no-repeat 5px 5px/30px;
    }
    .detail-edit-wrap {
        width: 702px;
        margin: 30px auto;
        border: 1px solid #ddd;
        padding: 30px;
    }
    .move-model-wrap {
        background: #f2f2f2;
        text-align: center;
        padding: 20px 0;
    }
    .move-model-wrap .model-wrap {
        padding-left: 0;
    }
    .move-model-wrap .model-icon {
        margin-bottom: 10px;
    }
    .move-model-wrap .model-item {
        cursor: pointer;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .add-text-box,
    .add-img-box,
    .add-line-box {
        margin: 5px 0;
    }
    .add-line-box {
        border-top: 2px dashed #eee;
    }
</style>
