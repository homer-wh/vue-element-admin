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
                              <el-button type="text">查看支付明细</el-button>
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
                              <el-button type="text">查看到货</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                </div>
            </div>
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
            }]
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
        border-left: 4px solid #ccc;
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
</style>