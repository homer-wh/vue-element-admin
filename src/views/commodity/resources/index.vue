<template>
    <div class="app-container">
        <div class="detail-title">商品管理</div>

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
            <el-button type="primary" plain>批量显示</el-button>
            <div class="right-select">
              <el-select class="choose-part-all" v-model="commoditytype" placeholder="请选择">
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
                                  <router-link to="/commodity/index/detail">
                                      <p>{{scope.row.product}}</p>
                                  </router-link>
                              </el-col>
                          </el-row>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="productnum"
                      label="商品货号"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="color"
                      align="center"
                      label="颜色">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="date"
                      label="创建时间">
                    </el-table-column>
                    <el-table-column
                      prop="operate"
                      align="center"
                      label="操作">
                      <template scope="scope">
                          <el-button type="text">编辑</el-button>
                          <div></div>
                          <el-button type="text" @click="displayNone(scope.$index, scope.row)">隐藏</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
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
              color: '白色',
              img: 'img1',
              productnum: 'NKS0059',
              date: '2017-07-09',
              operate: ''
            },{
              product: 'FENDI男士包包',
              color: '黑色',
              img: 'img1',
              productnum: 'NKS0059',
              date: '2017-07-09',
              operate: ''
            },{
              product: 'FENDI男士长裤',
              color: '红色',
              img: 'img1',
              productnum: 'NKS0059',
              date: '2017-07-09',
              operate: ''
            }],
            commoditysearch: '',
            commoditytype: '',
            multipleSelection: [],
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
          },
          displayNone(index, row) {
            console.log("隐藏当前行:" + index)
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
    .el-select.choose-part-all .el-input {
      width: 200px;
    }
</style>