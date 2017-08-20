<template>
    <div class="app-container">
        <div class="detail-title">库存</div>

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
                                  <router-link to="/commodity/sticky/detail">
                                      <p>{{scope.row.product}}</p>
                                  </router-link>
                              </el-col>
                          </el-row>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="productnum"
                      align="center"
                      label="商品货号">
                    </el-table-column>
                    <el-table-column
                      prop="averageprice"
                      label="进货均价"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="soldnum"
                      align="center"
                      label="总销量">
                    </el-table-column>
                    <el-table-column
                      prop="onsalenum"
                      align="center"
                      label="在售">
                    </el-table-column>
                    <el-table-column
                      prop="stickynum"
                      align="center"
                      label="库存">
                      <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.stickynum"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.stickynum }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="operate"
                      align="center"
                      label="操作">
                      <template scope="scope">
                          <div>
                              <el-button v-show='!scope.row.edit' type="text" @click='scope.row.edit=true'>修改库存</el-button>
                              <el-button v-show='scope.row.edit' type="primary" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
                          </div>
                          <el-button type="text">查看历史进货价</el-button>
                      </template>
                    </el-table-column>
                  </el-table>


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
              averageprice: '¥1,900.00',
              productnum: 'NKS0059',
              soldnum: '15',
              onsalenum: '5',
              stickynum: '10',
              operate: '',
              edit: false,
            },{
              product: 'FENDI男士包包',
              img: 'img1',
              averageprice: '¥5,900.00',
              productnum: 'NKS0059',
              soldnum: '2',
              onsalenum: '2',
              stickynum: '1',
              operate: '',
              edit: false,
            },{
              product: 'FENDI男士裤子',
              img: 'img1',
              averageprice: '¥3,900.00',
              productnum: 'NKS0059',
              soldnum: '25',
              onsalenum: '15',
              stickynum: '0',
              operate: '',
              edit: false,
            }],
            commoditysearch: '',
            currentPage4: 4
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
</style>
