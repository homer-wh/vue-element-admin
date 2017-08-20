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
            <el-button type="primary" plain>批量修改售价</el-button>
            <el-button type="primary" plain>批量修改在售</el-button>
            <el-button type="primary" plain>批量下架</el-button>
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
            commoditysearch: '',
            commoditytype: '',
            multipleSelection: [],
            currentPage4: 4,
            dialogEditSaleNumVisible: false,
          }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
</style>
