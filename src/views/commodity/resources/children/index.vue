<template>
    <div class="app-container">
        <div class="detail-title">查看商品详情</div>
        <div class="detail-label-item">
            <span class="label-bold-text">创建时间: </span>
            <span class="label-normal-text">2017-05-21 01:35</span>
            <div class="label-right-btn">
                <router-link to="/commodity/index/addcommodity">
                    <el-button type="primary">编辑商品源</el-button>
                </router-link>
            </div>
        </div>
        <div class="resources-detail-box">
            <div class="detail-label-item">
                <span class="label-bold-text">商品图片: </span>
                <div class="label-img-box">
                    <ul class="label-img-lists">
                        <li class="label-img-item"></li>
                        <li class="label-img-item"></li>
                    </ul>
                </div>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品名称: </span>
                <span class="label-normal-text">FENDI 男士腰带</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品品牌: </span>
                <span class="label-normal-text">FENDI</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品类目: </span>
                <span class="label-normal-text">服装-->男装-->衬衫</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品货号: </span>
                <span class="label-normal-text">NSK0059</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品图片: </span>
                <div class="label-img-box">
                    <el-table
                        :data="colorASize"
                        style="width: 300px;margin:10px 0;">
                        <el-table-column
                            prop="color"
                            label="颜色"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="尺寸"
                            align="center">
                            <template scope="scope">
                                <div class="edit-products-size" v-for="item in scope.row.size">{{item}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品详情: </span>
                <div class="label-img-box">
                    <div class="label-detail-content-box">
                        <div class="act-like-img"></div>
                        <p>好货</p>
                    </div>
                </div>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">交易备注: </span>
                <span class="label-normal-text">无</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">货源: </span>
                <span class="label-normal-text">美国纽约</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">运费: </span>
                <span class="label-normal-text">包邮</span>
            </div>

        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            colorASize: [
                {
                    color: '白色',
                    size: ['XS', 'S', 'M', 'L', 'XL']
                }
            ]
        }
    }
}
</script>
<style>
.detail-title {
    margin: 0 0 30px;
}
.detail-label-item {
    color: #333;
    margin: 8px 0;
}
.label-bold-text {
    font-size: 14px;
    font-weight: 500;
}
.label-normal-text {
    font-size: 14px;
    font-weight: 400;
}
.label-right-btn {
    float: right;
}
.resources-detail-box {
    border: 1px solid #ddd;
    margin: 40px 0;
    padding: 40px;
}
.label-img-lists {
    list-style: none;
    padding-left: 0;
}
.label-img-item {
    display: inline-block;
    width: 130px;
    height: 130px;
    margin-right: 5px;
    background: #eee;
}
.edit-products-size {
    line-height: 34px;
}
.label-detail-content-box {
    display: inline-block;
    margin: 10px 0;
    padding: 40px 40px 20px;
    border: 1px solid #ddd;
    font-size: 14px;
    text-align: center;
}
.act-like-img {
    width: 300px;
    height: 300px;
    background: #eee;
}
</style>
