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
                <span class="label-bold-text">商品售价: </span>
                <span class="label-normal-text" v-if="!priceInputVisible">{{editablePrice}}</span>
                <el-input class="input-fixed-width" v-else placeholder="请输入价格" v-model="editPrice">
                    <el-button slot="append" @click="confirmEditPrice">确认</el-button>
                </el-input>
                <span class="label-normal-icon" v-show="!priceInputVisible" @click="priceInputVisible = true"><i class="el-icon-edit"></i></span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">进货均价: </span>
                <span class="label-normal-text">¥980.00</span>
            </div>
            <div class="detail-label-item">
                <span class="label-bold-text">商品图片: </span>
                <div class="label-img-box">
                    <el-table
                        :data="saleDetailData"
                        stripe
                        style="width: 100%;margin: 10px 0;">
                        <el-table-column
                          label="颜色"
                          prop="color"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="size"
                          align="center"
                          label="尺寸">
                          <template scope="scope">
                              <div class="edit-products-size" v-for="item in scope.row.products">{{item.size}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="productNums"
                          align="center"
                          label="货号">
                          <template scope="scope">
                              <div class="edit-products-size" v-for="item in scope.row.products">{{item.productNums}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="soldNum"
                          label="销量"
                          align="center">
                          <template scope="scope">
                            <div class="edit-products-size" v-for="item in scope.row.products">{{item.soldNum}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="saleNum"
                          label="在售"
                          align="center">
                          <template scope="scope">
                            <div v-for="item in scope.row.products">
                                <el-input class="edit-products-num" size="small" v-model="item.saleNum"></el-input>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="lefted"
                          label="库存"
                          align="center">
                          <template scope="scope">
                            <div class="edit-products-size" v-for="item in scope.row.products">{{item.lefted}}</div>
                          </template>
                        </el-table-column>
                    </el-table>
                    <div class="right-btn-box">
                        <el-button type="primary" @click="saveNewSaleNum">保存修改</el-button>
                    </div>
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
            ],
            priceInputVisible: false,
            editPrice: '',
            editablePrice: '¥1,680.00',
            saleDetailData: [
                {
                    color: '白色',
                    products: [
                      {size: 'S', productNums: 'NSK0059-S', lefted: 2, soldNum: 2, saleNum: 2},
                      {size: 'M', productNums: 'NSK0059-M', lefted: 2, soldNum: 2, saleNum: 2},
                      {size: 'L', productNums: 'NSK0059-L', lefted: 2, soldNum: 2, saleNum: 3},
                      {size: 'XL', productNums: 'NSK0059-XL', lefted: 3, soldNum: 1, saleNum: 4}
                    ]
                }
            ]
        }
    },
    methods: {
        confirmEditPrice() {
            if(this.editPrice) {
                this.editablePrice = this.editPrice
                this.priceInputVisible = false
            } else {
                this.priceInputVisible = false
            }
        },
        saveNewSaleNum() {
            console.log('保存数据')
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
.label-normal-icon {
    margin-left: 20px;
    color: #169bd5;
}
.input-fixed-width {
    width: 200px;
}
.edit-products-num {
    text-align: center;
    margin: 2px auto;
}
.edit-products-num input {
    text-align: center;
}
.edit-products-size {
    line-height: 34px;
}
.right-btn-box {
    text-align: right;
}
</style>
