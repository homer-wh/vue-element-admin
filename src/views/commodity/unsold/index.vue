<template>
    <div class="app-container">
        <div class="detail-title">未出售</div>

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
            <el-button type="primary" plain>批量修改预设售价</el-button>
            <el-button type="primary" plain>批量修改预设在售</el-button>
            <el-button type="primary" plain>批量上架</el-button>
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
                    <el-table-column
                      label="商品名称"
                      width="280">
                      <template scope="scope">
                          <el-row class="table-el-row" :gutter="20">
                              <el-col :span="10">
                                  <div class="img-box-table">{{scope.row.img}}</div>
                              </el-col>
                              <el-col :span="14">
                                  <router-link to="/commodity/unsold/detail">
                                      <p>{{scope.row.product}}</p>
                                  </router-link>
                              </el-col>
                          </el-row>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="saleprice"
                      label="预设售价"
                      align="center">
                      <template scope="scope">
                        <el-input v-show="scope.row.priceEdit" size="small" v-model="scope.row.saleprice"></el-input>
                        <span v-show="!scope.row.priceEdit">{{ scope.row.saleprice }}</span>
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
                      label="预设在售">
                      <template scope="scope">
                        <el-input v-show="scope.row.numEdit" size="small" v-model="scope.row.onsale"></el-input>
                        <span v-show="!scope.row.numEdit">{{ scope.row.onsale }}</span>
                      </template>
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
                              <el-button v-show='!scope.row.priceEdit' type="text" @click='scope.row.priceEdit=true'>修改预设售价</el-button>
                              <el-button v-show='scope.row.priceEdit' type="primary" @click='scope.row.priceEdit=false' size="small" icon="check">完成</el-button>
                          </div>
                          <div>
                              <el-button v-show='!scope.row.numEdit' type="text" @click='scope.row.numEdit=true'>修改预设在售</el-button>
                              <el-button v-show='scope.row.numEdit' type="primary" @click='scope.row.numEdit=false' size="small" icon="check">完成</el-button>
                          </div>
                          <el-button @click="singleShangJia" type="text">上架</el-button>
                      </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="上架确认" :visible.sync="dialogShangJiaVisible" size="small" top="15%">
                    <el-table
                        :data="editSingleShangJia"
                        stripe
                        style="width: 100%">
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
                          <template scope="scope">
                            <el-input class="middle-input" size="small" v-model="scope.row.price"></el-input>
                          </template>
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
                          <template scope="scope">
                            <el-input class="middle-input" size="small" v-model="scope.row.nums"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="sticky"
                          align="center"
                          label="库存">
                        </el-table-column>
                    </el-table>
                    <div class="save-recieve-box">
                        <el-button type="primary" plain size="large" @click="dialogShangJiaVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveSingleShangJiaEdit">&nbsp;确&nbsp;认&nbsp;上&nbsp;架&nbsp;</el-button>
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
              priceEdit: false,
              numEdit: false,
            },{
              product: 'FENDI男士包包',
              img: 'img1',
              saleprice: '¥4,900.00',
              buyprice: '¥3200.00',
              soldcount: '3',
              onsale: '2',
              stickynum: '0',
              operate: '',
              priceEdit: false,
              numEdit: false,
            },{
              product: 'FENDI男士裤子',
              img: 'img1',
              saleprice: '¥2,900.00',
              buyprice: '¥1200.00',
              soldcount: '20',
              onsale: '20',
              stickynum: '10',
              operate: '',
              priceEdit: false,
              numEdit: false,
            }],
            editSingleShangJia: [
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
            currentPage4: 4,
            dialogShangJiaVisible: false,
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
          singleShangJia() {
              this.dialogShangJiaVisible = true
          },
          saveSingleShangJiaEdit() {
              this.dialogShangJiaVisible = false
          },
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
    .save-recieve-box {
        text-align: center;
        margin: 40px 0 20px;
    }
    .middle-input input {
        text-align: center;
    }
</style>
