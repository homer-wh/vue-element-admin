<template>
    <div class="app-container">
        <div class="detail-title">查看详情</div>
        <div class="detail-box">
            <div class="detail-item">
                <div class="detail-item-title"><span class="vertical-line-b">&nbsp;</span>批次信息 <span class="go2batch-editor">编辑批次</span></div>
                <p><span class="bold-text">批次号: </span><span>P20170517A</span></p>
                <p><span class="bold-text">进货商: </span><span>哈哈哈</span></p>
                <p><span class="bold-text">创建时间: </span><span>2017-05-17</span></p>
                <p><span class="bold-text">备注: </span><span>无</span></p>
            </div>

            <div class="detail-item">
                <div class="detail-item-title"><span class="vertical-line-b">&nbsp;</span>支出明细</div>
                <div class="payout-box">
                    <p><span class="bold-text">预计商品成本支出: </span><span>¥25,400.00</span></p>
                    <p><span class="bold-text">实际已支付商品成本: </span><span>¥1,090.00</span></p>
                    <p><span class="bold-text">实际已支付其他成本: </span><span>¥1,100.00</span> <span class="go2batch-editor go2phone-editor">前往客户端添加支出</span></p>
                </div>
                <div class="payout-tabal">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="支付时间"
                          align="center"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="事件"
                          align="center"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="money"
                          align="center"
                          label="支付金额">
                        </el-table-column>
                        <el-table-column
                          align="center"
                          prop="detail"
                          label="明细">
                          <template scope="scope">
                              <el-button type="text" @click="dialogPaymentVisible = true">查看支付明细</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="backup"
                          align="center"
                          label="备注">
                        </el-table-column>
                      </el-table>
                </div>
            </div>

            <el-dialog title="查看支付明细" :visible.sync="dialogPaymentVisible" size="large" top="15%">
                <el-table
                    :data="paymentData"
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
                                  <el-button plain>{{scope.row.color}}</el-button>
                              </el-col>
                          </el-row>
                      </template>
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
                      prop="total"
                      align="center"
                      label="进货总数">
                      <template scope="scope">
                          <div class="edit-products-size" v-for="item in scope.row.products">{{item.total}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="recieved"
                      label="已到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.recieved}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="lefted"
                      label="剩余到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.lefted}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="shouldRecieved"
                      label="支付应到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.shouldRecieved}}</div>
                      </template>
                    </el-table-column>
                </el-table>
            </el-dialog>

            <div class="detail-item">
                <div class="detail-item-title"><span class="vertical-line-b">&nbsp;</span>采购清单</div>
                <div class="payout-tabal">
                    <el-table
                        :data="tableData2"
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
                                      <el-button plain>{{scope.row.color}}</el-button>
                                  </el-col>
                              </el-row>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="进货单价"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="paied"
                          align="center"
                          label="已支付">
                        </el-table-column>
                        <el-table-column
                          align="center"
                          prop="shouldpay"
                          label="还应支付">
                        </el-table-column>
                        <el-table-column
                          prop="receive"
                          align="center"
                          label="已到货">
                        </el-table-column>
                        <el-table-column
                          prop="shouldreceive"
                          align="center"
                          label="应到货">
                        </el-table-column>
                        <el-table-column
                          prop="total"
                          align="center"
                          label="进货总数">
                        </el-table-column>
                        <el-table-column
                          prop="operate"
                          align="center"
                          label="操作">
                          <template scope="scope">
                              <el-button type="text" @click="dialogRecievedVisible = true">查看到货</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                </div>
            </div>

            <el-dialog title="查看到货明细" :visible.sync="dialogRecievedVisible" size="large" top="15%">
                <el-table
                    :data="recievedData"
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
                                  <el-button plain>{{scope.row.color}}</el-button>
                              </el-col>
                          </el-row>
                      </template>
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
                      prop="total"
                      align="center"
                      label="进货总数">
                      <template scope="scope">
                          <div class="edit-products-size" v-for="item in scope.row.products">{{item.total}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="recieved"
                      label="已到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.recieved}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="lefted"
                      label="剩余到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.lefted}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="shouldRecieved"
                      label="支付应到货"
                      align="center">
                      <template scope="scope">
                        <div class="edit-products-size" v-for="item in scope.row.products">{{item.shouldRecieved}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="newRecieved"
                      label="新到货"
                      align="center">
                      <template scope="scope">
                        <div v-for="item in scope.row.products">
                            <el-input class="edit-products-num" size="small" v-model="item.newRecieved"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                </el-table>
                <div class="save-recieve-box">
                    <el-button type="primary" plain size="large" @click="dialogRecievedVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    <el-button type="primary" size="large" @click="saveNewRecieved">&nbsp;保&nbsp;存&nbsp;修&nbsp;改&nbsp;</el-button>
                </div>

            </el-dialog>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            tableData: [{
              date: '2017-05-02 08:25',
              name: '商品成本',
              money: '¥1,0900.00',
              detail: '查看支付明细',
              backup: '无'
            },{
              date: '2017-05-02 08:25',
              name: '货运成本',
              money: '¥900.00',
              detail: '查看支付明细',
              backup: '无'
            },{
              date: '2017-05-02 08:25',
              name: '商品成本',
              money: '¥200.00',
              detail: '无',
              backup: '退换损失'
            }],
            tableData2: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              price: '¥1,900.00',
              paied: '¥900.00',
              shouldpay: '¥10,000.00',
              receive: '2',
              shouldreceive: '5',
              total: '10',
              operate: ''
            },{
              product: 'FENDI男士包包',
              color: '如图色',
              img: 'img2',
              price: '¥2,860.00',
              paied: '¥0.00',
              shouldpay: '¥1,000.00',
              receive: '0',
              shouldreceive: '1',
              total: '5',
              operate: ''
            }],
            paymentData: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              products: [
                {size: 'S', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2},
                {size: 'M', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2},
                {size: 'L', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2},
                {size: 'XL', total: 3, recieved: 0, lefted: 3, shouldRecieved: 1}
              ]
            },{
              product: 'FENDI男包',
              color: '如图色',
              img: 'img1',
              products: [
                {size: 'M', total: 5, recieved: 2, lefted: 3, shouldRecieved: 3}
              ]
            }],
            recievedData: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              products: [
                {size: 'S', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2, newRecieved: 0},
                {size: 'M', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2, newRecieved: 0},
                {size: 'L', total: 3, recieved: 1, lefted: 2, shouldRecieved: 2, newRecieved: 0},
                {size: 'XL', total: 3, recieved: 0, lefted: 3, shouldRecieved: 1, newRecieved: 0}
              ]
            }],
            dialogPaymentVisible: false,
            dialogRecievedVisible: false
          }
        },
        methods: {
          saveNewRecieved() {
            this.dialogRecievedVisible = false
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
    .save-recieve-box {
        text-align: center;
        margin: 40px 0 20px;
    }
</style>