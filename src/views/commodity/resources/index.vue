<template>
    <div class="app-container">
        <div class="detail-title">商品管理</div>

            <div class="commodity-search">
              <el-input placeholder="请输入内容" v-model="commoditysearch" style="width:500px;">
                  <el-button slot="prepend" icon="search"></el-button>
              </el-input>
              <div class="commodity-add">
                <el-button type="primary">添加商品源</el-button>
              </div>
            </div>
          <div class="table-header">
            <el-button type="primary" plain>批量显示</el-button>
            <div class="right-select">
              <el-select v-model="commoditytype" placeholder="请选择" style="width:200px;">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="隐藏的商品源" value="hidden"></el-option>
                  <el-option label="未隐藏的商品源" value="show"></el-option>
              </el-select>
            </div>
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
</template>
<script>
    export default {
        data() {
          return {
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
            commoditysearch: '',
            commoditytype: '',
            multipleSelection: []
          }
        },
        methods: {
          handleSelectionChange(val) {
              this.multipleSelection = val;
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
</style>