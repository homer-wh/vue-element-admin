<template>
    <div class="app-container">
        <div class="detail-title">出售中</div>

            <div class="commodity-search">
              <el-input placeholder="请输入内容" v-model="commoditysearch" style="width:500px;">
                  <el-button slot="prepend" icon="search"></el-button>
              </el-input>
              <div class="commodity-add">
                <router-link to="/commodity/index/addcommodity">
                  <el-button type="primary">添加商品源</el-button>
                </router-link>
              </div>
            </div>
          <div class="table-header">
            <el-button type="primary" @click="dialogEditPriceVisible = true" plain>批量修改售价</el-button>
            <el-button type="primary" @click="dialogMutiSaleNumVisible = true" plain>批量修改在售</el-button>
            <el-button type="primary" @click="dialogMutiXiaJiaVisible = true" plain>批量下架</el-button>
          </div>
          <div class="detail-box">
            <div class="payout-tabal">
                <el-table
                    ref="multipleTable"
                    :data="tableData2"
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                      label="商品名称"
                      width="280">
                      <template scope="scope">
                          <el-row class="table-el-row" :gutter="20">
                              <el-col :span="10">
                                  <div class="img-box-table">{{scope.row.img}}</div>
                              </el-col>
                              <el-col :span="14">
                                  <router-link to="/commodity/forsale/detail">
                                      <p>{{scope.row.product}}</p>
                                  </router-link>
                              </el-col>
                          </el-row>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="saleprice"
                      label="售价"
                      align="center">
                      <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.saleprice"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.saleprice }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="buyprice"
                      align="center"
                      label="进货均价">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="soldcount"
                      label="总销量">
                    </el-table-column>
                    <el-table-column
                      prop="onsale"
                      align="center"
                      label="在售">
                    </el-table-column>
                    <el-table-column
                      prop="stickynum"
                      align="center"
                      label="库存">
                    </el-table-column>
                    <el-table-column
                      prop="operate"
                      align="center"
                      label="操作">
                      <template scope="scope">
                          <div>
                              <el-button v-show='!scope.row.edit' type="text" @click='scope.row.edit=true'>修改售价</el-button>
                              <el-button v-show='scope.row.edit' type="primary" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
                          </div>
                          <div>
                              <el-button type="text" @click="dialogEditSaleNumVisible = true">修改在售</el-button>
                          </div>
                          <div>
                              <el-button type="text">下架</el-button>
                          </div>
                      </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="修改在售" :visible.sync="dialogEditSaleNumVisible" size="small" top="15%">
                    <el-table
                        :data="SaleNumData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                          label="商品名称"
                          width="280">
                          <template scope="scope">
                              <el-row class="table-el-row" :gutter="20">
                                  <el-col :span="10">
                                      <div class="img-box-table">{{scope.row.img}}</div>
                                  </el-col>
                                  <el-col :span="14">
                                      <p>{{scope.row.product}}</p>
                                  </el-col>
                              </el-row>
                          </template>
                        </el-table-column>
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
                    <div class="save-recieve-box">
                        <el-button type="primary" plain size="large" @click="dialogEditSaleNumVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveSingleNewSaleNum">&nbsp;保&nbsp;存&nbsp;修&nbsp;改&nbsp;</el-button>
                    </div>

                </el-dialog>

                <el-dialog title="批量修改预设售价" :visible.sync="dialogEditPriceVisible" size="small" top="15%">
                    <el-table
                        :data="editMutiplePrice"
                        stripe
                        style="width: 100%">
                        <el-table-column
                          label="商品名称"
                          prop="name"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          label="预设售价"
                          prop="price"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="editPrice"
                          align="center"
                          label="修改后预设售价">
                        </el-table-column>
                    </el-table>
                    <div class="edit-way-box">
                        <div class="edit-way-item">
                            <el-radio class="radio" v-model="radio" label="1">直接修改价格: 设置统一价格</el-radio>
                            <div class="edit-price-input">
                                <el-input v-model="priceInput" placeholder="请输入统一价格">
                                    <el-button slot="append" @click="confirmInputPrice">修改</el-button>
                                </el-input>
                            </div>
                        </div>
                        <div class="edit-way-item">
                            <el-radio class="radio" v-model="radio" label="2">运用统一公式修改价格: 原价</el-radio>
                            <div class="edit-price-input">
                                <el-input placeholder="请输入内容" v-model="countRate">
                                    <el-select class="fixed-width-select" v-model="editSelect" slot="prepend" placeholder="加">
                                      <el-option label="加" value="1"></el-option>
                                      <el-option label="减" value="2"></el-option>
                                      <el-option label="乘" value="3"></el-option>
                                      <el-option label="除" value="4"></el-option>
                                    </el-select>
                                    <el-button slot="append" @click="confirmCountPrice">修改</el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="save-recieve-box">
                        <el-button type="primary" plain size="large" @click="dialogEditPriceVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveMutiplePriceEdit">&nbsp;保&nbsp;存&nbsp;修&nbsp;改&nbsp;</el-button>
                    </div>

                </el-dialog>

                <el-dialog title="批量修改在售数量" :visible.sync="dialogMutiSaleNumVisible" size="small" top="15%">
                    <el-table
                        :data="editMutipleSaleNum"
                        stripe
                        style="width: 100%">
                        <el-table-column
                          label="商品名称"
                          prop="name"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          label="目前在售数量"
                          prop="nums"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="editNums"
                          align="center"
                          label="修改后数量">
                        </el-table-column>
                        <el-table-column
                          prop="sticky"
                          align="center"
                          label="库存">
                        </el-table-column>
                    </el-table>
                    <p class="edit-sale-num-tips"><i style="color: #f00;font-size: 18px;vertical-align:-5px;">*</i> 将库存数量设置为在售数量</p>
                    <div class="save-recieve-box">
                        <el-button type="primary" plain size="large" @click="dialogMutiSaleNumVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveMutiSaleNumEdit">&nbsp;保&nbsp;存&nbsp;修&nbsp;改&nbsp;</el-button>
                    </div>

                </el-dialog>

                <el-dialog title="批量下架确认" :visible.sync="dialogMutiXiaJiaVisible" size="small" top="15%">
                    <el-table
                        :data="editMutiXiaJia"
                        stripe
                        @selection-change="handleXiaJiaChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="35">
                        </el-table-column>
                        <el-table-column
                          label="商品名称"
                          prop="name"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          label="售价"
                          prop="price"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="buy"
                          align="center"
                          label="进货均价">
                        </el-table-column>
                        <el-table-column
                          prop="nums"
                          align="center"
                          label="在售">
                        </el-table-column>
                        <el-table-column
                          prop="sticky"
                          align="center"
                          label="库存">
                        </el-table-column>
                    </el-table>
                    <div class="save-recieve-box">
                        <el-button type="primary" plain size="large" @click="dialogMutiXiaJiaVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveMutiXiaJiaEdit">&nbsp;批&nbsp;量&nbsp;下&nbsp;架&nbsp;</el-button>
                    </div>

                </el-dialog>
              </div>
            </div>
            <div class="page-count">
              <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                  </el-pagination>
            </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            tableData2: [{
              product: 'FENDI男士腰带',
              img: 'img1',
              saleprice: '¥1,900.00',
              buyprice: '¥1200.00',
              soldcount: '10',
              onsale: '2',
              stickynum: '5',
              operate: '',
              edit: false,
            },{
              product: 'FENDI男士包包',
              img: 'img1',
              saleprice: '¥4,900.00',
              buyprice: '¥3200.00',
              soldcount: '3',
              onsale: '2',
              stickynum: '0',
              operate: '',
              edit: false,
            },{
              product: 'FENDI男士裤子',
              img: 'img1',
              saleprice: '¥2,900.00',
              buyprice: '¥1200.00',
              soldcount: '20',
              onsale: '20',
              stickynum: '10',
              operate: '',
              edit: false,
            }],
            SaleNumData: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              products: [
                {size: 'S', saleNum: 3, soldNum: 1, lefted: 2},
                {size: 'M', saleNum: 3, soldNum: 1, lefted: 2},
                {size: 'L', saleNum: 3, soldNum: 1, lefted: 2},
                {size: 'XL', saleNum: 3, soldNum: 0, lefted: 3}
              ]
            }],
            editMutiplePrice: [
                {
                    name: '商品名称1',
                    price: '9000.00',
                    editPrice: '9000.00'
                },
                {
                    name: '商品名称2',
                    price: '9000.00',
                    editPrice: '9000.00'
                },
                {
                    name: '商品名称3',
                    price: '9000.00',
                    editPrice: '9000.00'
                }
            ],
            editMutipleSaleNum: [
                {
                    name: '商品名称1',
                    nums: '3',
                    editNums: '40',
                    sticky: '40'
                },
                {
                    name: '商品名称2',
                    nums: '3',
                    editNums: '40',
                    sticky: '40'
                },
                {
                    name: '商品名称3',
                    nums: '3',
                    editNums: '40',
                    sticky: '40'
                }
            ],
            editMutiXiaJia: [
                {
                    name: '商品名称1',
                    price: '9000.00',
                    buy: '6000.00',
                    nums: '3',
                    sticky: '1'
                },
                {
                    name: '商品名称2',
                    price: '9000.00',
                    buy: '6000.00',
                    nums: '3',
                    sticky: '1'
                },
                {
                    name: '商品名称3',
                    price: '9000.00',
                    buy: '6000.00',
                    nums: '3',
                    sticky: '1'
                }
            ],
            commoditysearch: '',
            commoditytype: '',
            multipleSelection: [],
            multipleXiaJia: [],
            currentPage4: 4,
            dialogEditSaleNumVisible: false,
            dialogEditPriceVisible: false,
            dialogMutiSaleNumVisible: false,
            dialogMutiXiaJiaVisible: false,
            radio: '1',
            editSelect: '1',
            priceInput: '',
            countRate: '',
          }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleXiaJiaChange(val) {
                this.multipleXiaJia = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            saveSingleNewSaleNum() {
                console.log('保存单个商品修改')
                this.dialogEditSaleNumVisible = false
            },
            saveMutiplePriceEdit() {
                console.log('批量修改价格')
                this.dialogEditPriceVisible = false
            },
            saveMutiSaleNumEdit() {
                console.log('批量修改在售数量')
                this.dialogMutiSaleNumVisible = false
            },
            saveMutiXiaJiaEdit() {
                console.log('批量下架确认')
                this.dialogMutiXiaJiaVisible = false
            },
            confirmInputPrice() {
                if(this.radio == 1) {
                    if(parseFloat(this.priceInput)) {
                        var price = this.priceInput
                        this.editMutiplePrice.forEach(function(item) {
                            item.editPrice = parseFloat(price).toFixed(2)
                        })
                    } else {
                        this.$message({
                            message: '请输入数字',
                            type: 'warning'
                        });
                    }
                } else {
                    this.$message({
                        message: '请先选择统一修改价格',
                        type: 'warning'
                    });
                }
            },
            confirmCountPrice() {
                if(this.radio == 2) {
                    if(parseFloat(this.countRate)) {
                        var count = parseFloat(this.countRate),
                            select = this.editSelect;
                        this.editMutiplePrice.forEach(function(item) {
                            switch (select) {
                                case '1':
                                    item.editPrice = parseFloat(parseFloat(item.price) + count).toFixed(2)
                                    break;
                                case '2':
                                    item.editPrice = parseFloat(parseFloat(item.price) - count).toFixed(2)
                                    break;
                                case '3':
                                    item.editPrice = parseFloat(parseFloat(item.price) * count).toFixed(2)
                                    break;
                                case '4':
                                    item.editPrice = parseFloat(parseFloat(item.price) / count).toFixed(2)
                                    break;
                            }

                        })
                    } else {
                        this.$message({
                            message: '请输入数字',
                            type: 'warning'
                        });
                    }
                } else {
                    this.$message({
                        message: '请先选择统一公式修改价格',
                        type: 'warning'
                    });
                }
            }
        }
      }
</script>

<style>
    .detail-title {
        margin: 0 0 30px;
    }
    .detail-box {
        padding: 30px;
        border: 1px solid #ddd;
    }
    .detail-item {
        font-size: 14px;
        margin: 20px 0;
    }
    .detail-item-title {
        font-size: 16px;
        margin: 20px 0;
    }
    .vertical-line-b {
        border-left: 4px solid #333;
    }
    .bold-text {
        font-weight: 500;
    }
    .go2batch-editor {
        float: right;
        display: inline-block;
        width: 150px;
        line-height: 40px;
        text-align: center;
        background: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .payout-box {
        padding: 20px;
        border: 1px solid #ddd;
        margin: 20px 0;
        color: rgb(153, 153, 153);
    }
    .go2phone-editor {
        width: 200px;
        background: #999;
    }
    .img-box-table {
        width: 100px;
        height: 100px;
        background: #ccc;
    }
    .table-el-row {
        padding: 10px 0;
    }
    .commodity-search {
      margin: 20px 0;
    }
    .commodity-add {
      float: right;
    }
    .table-header {
      background: #ddd;
      padding: 20px 30px;
    }
    .right-select {
      float: right;
    }
    .page-count {
      float: right;
      margin: 20px;
    }
    .edit-products-size {
        line-height: 34px;
    }
    .right-btn-box {
        text-align: right;
    }
    .edit-products-num {
        text-align: center;
        margin: 2px auto;
    }
    .edit-products-num input {
        text-align: center;
    }
    .save-recieve-box {
        text-align: center;
        margin: 40px 0 20px;
    }
    .edit-way-item {
        margin: 10px 0;
    }
    .edit-price-input {
        display: inline-block;
        width: 280px;
    }
    .fixed-width-select {
        width: 64px;
    }
    .edit-sale-num-tips {
        font-size: 14px;
        color: #333;
        margin: 15px 0;
    }
</style>
