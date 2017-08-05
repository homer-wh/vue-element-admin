<template>
  <div class="app-container">
    <div class="shop-title">店铺装修</div>
    <div class="shop-box">
        <el-row :gutter="20">
          <el-col class="left-box" :span="10">
            <div class="img-box">
                <img :src="shop_bg" alt="">
                <div class="abs-box" @click="showEditor">编辑</div>
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
                        <p>图片建议尺寸为 750px × 210px</p>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="编辑店铺LOGO">
                    <div class="editor-box">
                        <p>店铺LOGO</p>
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
                isTabs: false
            }
        },
        methods: {
            showEditor() {
                this.isTabs = !this.isTabs
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
        background: rgba(0, 0, 0, .7);
        opacity: 0;
    }
    .img-box:hover .abs-box {
        opacity: 1;
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
</style>