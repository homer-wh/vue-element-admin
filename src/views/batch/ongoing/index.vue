<template>
    <div class="app-container">
        <div class="detail-title">新建批次</div>
        <div class="detail-box">
            <el-form ref="form" :model="form" label-position="top">
                <div class="detail-item-title"><span class="vertical-line-b">&nbsp;</span>批次信息</div>
                <el-form-item label="批次号">
                    <el-input v-model="form.batchnum" style="width:500px;" placeholder="P20170516A(系统自动生成)"></el-input>
                </el-form-item>

                <el-form-item label="进货商">
                    <el-button type="primary" v-if="!supplychecked" @click="dialogFormVisible = true">点击选择进货商</el-button>
                    <div v-else>
                        <el-input v-model="form.supply" style="width:300px;" placeholder="香港大佬"></el-input>
                        <el-button @click="dialogFormVisible = true">更改</el-button>
                    </div>
                    <el-dialog title="选择供应商" :visible.sync="dialogFormVisible" top="5%">
                        <div class="search-supply">
                            <el-input placeholder="搜索供应商" v-model="searchsupply">
                                <el-button slot="append" icon="search"></el-button>
                            </el-input>
                        </div>
                        <div class="supply-container">
                            <div class="supply-wrap" v-for="item in supplyobj">
                                <div class="abc-title">{{item.title}}</div>
                                <ul class="supply-lists">
                                    <li class="supply-list-item" @click="chooseASupply(list)" v-for="list in item.value">{{list}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="add-supply">
                            <el-input class="add-supply-input" placeholder="请输入供应商名称" v-model="searchsupply">
                            </el-input>
                            <el-button type="primary">新&nbsp;&nbsp;建</el-button>
                        </div>
                        <div class="check-supply">
                            <p><span class="short-v-line">&nbsp;</span><span class="bold-text">您当前选择的供应商是:</span> {{chosedSupply}}</p>
                        </div>
                        <div class="besure-choose">
                            <el-button type="primary" plain size="large" @click="dialogFormVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                            <el-button type="primary" size="large" @click="sureAboutChoose">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        </div>

                    </el-dialog>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker
                        v-model="form.date"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      placeholder="请输入内容"
                      v-model="form.backup">
                    </el-input>
                </el-form-item>

                <div class="detail-item-title detail-item-title-biggap">
                    <span class="vertical-line-b">&nbsp;</span>采购清单
                    <div class="add-product-btns">
                        <el-button type="primary" size="large" @click="dialogChooseProductVisible = true">选择已有商品</el-button>
                        <router-link to="/commodity/index/addcommodity">
                            <el-button type="primary" size="large">添加商品源</el-button>
                        </router-link>
                    </div>
                </div>

                <el-form-item>
                    <div class="total-money">预计商品成本支出: ¥ {{computedTotalMoney}}</div>
                    <div class="buy-table">
                        <el-table
                            :data="tableData3"
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
                              prop="total"
                              align="center"
                              label="进货数量">
                            </el-table-column>
                            <el-table-column
                              prop="price"
                              label="进货单价"
                              align="center">
                              <template scope="scope">
                                <el-input v-show="scope.row.edit" size="small" v-model="scope.row.price"></el-input>
                                <span v-show="!scope.row.edit">{{ scope.row.price }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="operate"
                              align="center"
                              label="操作">
                              <template scope="scope">
                                  <div><el-button type="text" @click="dialogEditNumVisible = true">编辑进货数量</el-button></div>
                                  <div>
                                        <el-button v-show='!scope.row.edit' type="text" @click='scope.row.edit=true'>编辑进货单价</el-button>
                                        <el-button v-show='scope.row.edit' type="primary" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
                                  </div>
                                  <div><el-button type="text" @click="handleDelete(scope.$index, scope.row)">移除</el-button></div>
                              </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>

                <el-dialog title="编辑进货数量" :visible.sync="dialogEditNumVisible" top="15%">

                    <el-table
                        :data="tableData4"
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
                          prop="color"
                          align="center"
                          label="颜色">
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
                          prop="nums"
                          label="数量"
                          align="center">
                          <template scope="scope">
                            <div v-for="item in scope.row.products">
                                <el-input class="edit-products-num" size="small" v-model="item.nums"></el-input>
                            </div>
                          </template>
                        </el-table-column>
                    </el-table>

                    <div class="add-supply">
                        <p>尺寸:</p>
                        <div class="size-tags">
                            <span v-for="(item, index) in sizeTags" :key="index" @click="addNewTabelItem(item)">
                                <el-tag class="size-tag-item" color="#20a0ff" :closable="index > 3" @close.stop="handleClose(index)">{{item}}</el-tag>
                            </span>
                        </div>
                        <div class="add-size-tag">
                            <el-input class="add-size-name" v-model="addAnotherTag" placeholder="自定义属性"></el-input><el-button type="primary" @click="createNewTag">新建</el-button>
                        </div>
                    </div>
                    <div class="besure-choose">
                        <el-button type="primary" plain size="large" @click="dialogEditNumVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveEditProductNums">&nbsp;&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </div>

                </el-dialog>

                <el-dialog title="选择已有商品" :visible.sync="dialogChooseProductVisible" top="5%">
                    <div class="search-supply">
                        <el-input placeholder="搜索商品" v-model="searchprodutclist">
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                    <div class="fixed-height-box">
                        <el-table
                            ref="multipleTable"
                            :data="tableData5"
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
                        </el-table>
                    </div>
                    <div class="add-product-btn-box">
                        <router-link to="/commodity/index/addcommodity">
                            <el-button type="primary" size="large">添加商品源</el-button>
                        </router-link>
                    </div>
                    <div class="besure-choose">
                        <el-button type="primary" plain size="large" @click="dialogChooseProductVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        <el-button type="primary" size="large" @click="saveChooseProduct">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </div>

                </el-dialog>

                <el-dialog
                  title="操作确认"
                  :visible.sync="dialogDeleteConfirmVisible"
                  size="tiny">
                  <span>您确认要从批次{{batchNums}}中移除该商品吗？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogDeleteConfirmVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
                  </span>
                </el-dialog>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            form: {
              date: '',
              supply: '',
              batchnum: '',
              list: '',
              backup: ''
            },
            searchsupply: '',
            searchprodutclist: '',
            chosedSupply: '',
            supplyobj: [
                {
                    title: 'A',
                    value: ['ACNE STUDIOS',' Alaia','ALEXANDER MCQUEEN 亚历山大·麦昆','ACNE STUDIOS','Alaia','ALEXANDER MCQUEEN 亚历山大·麦昆']
                },
                {
                    title: 'B',
                    value: ['BCNE STUDIOS',' Alaia','BLEXANDER MCQUEEN 亚历山大·麦昆','ACNE STUDIOS','Alaia','BLEXANDER MCQUEEN 亚历山大·麦昆']
                },
                {
                    title: 'C',
                    value: ['BCNE STUDIOS',' Alaia','BLEXANDER MCQUEEN 亚历山大·麦昆','ACNE STUDIOS','Alaia','BLEXANDER MCQUEEN 亚历山大·麦昆']
                }

            ],
            dialogFormVisible: false,
            dialogEditNumVisible: false,
            dialogChooseProductVisible: false,
            dialogDeleteConfirmVisible: false,
            batchNums: 'P20170517A',
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            supplychecked: false,
            tableData3: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              price: '¥1,900.00',
              total: '10',
              operate: '',
              edit: false
            },{
              product: 'FENDI男士包包',
              color: '如图色',
              img: 'img2',
              price: '¥2,860.00',
              total: '5',
              operate: '',
              edit: false
            }],
            tableData4: [{
              product: 'FENDI男士腰带',
              color: '白色',
              img: 'img1',
              products: [
                {size: 'S', nums: 3},
                {size: 'M', nums: 3},
                {size: 'L', nums: 3},
                {size: 'XL', nums: 3}
              ]
            }],
            tableData5: [{
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
            sizeTags: ['S', 'M', 'L', 'XL'],
            addAnotherTag: '',
            confirmDeleteIndex: null
          }
        },
        computed: {
            computedTotalMoney: function() {
                var total = 0;
                for(var i = 0; i < this.tableData3.length; i++) {
                    var price = parseFloat(this.tableData3[i]['price'].slice(1).split(',').join(''));
                    total += price * parseInt(this.tableData3[i]['total'])
                }
                return total.toFixed(2)
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            chooseASupply(str) {
                this.chosedSupply = str;
            },
            sureAboutChoose() {
                if(this.chosedSupply) {
                    this.form.supply = this.chosedSupply;
                    this.dialogFormVisible = false;
                    this.supplychecked = true;
                } else {
                    this.$message({
                        message: '请选择供应商',
                        type: 'warning'
                    });
                }
            },
            createNewTag() {
                if(this.addAnotherTag) {
                    this.sizeTags.push(this.addAnotherTag)
                    this.addAnotherTag = ''
                } else {
                    this.$message({
                        message: '请输入新建尺寸属性',
                        type: 'warning'
                    });
                }
            },
            handleClose(index) {
                this.sizeTags.splice(index, 1)
            },
            addNewTabelItem(item) {
                var added = false
                for(var i = 0; i < this.tableData4[0].products.length; i++) {
                    if(this.tableData4[0].products[i].size == item) {
                        added = true
                        break
                    }
                }
                if(!added) {
                    this.tableData4[0].products.push({size: item, nums: 1})
                } else {
                    this.$message({
                        message: '该尺寸已添加',
                        type: 'warning'
                    });
                }

            },
            saveEditProductNums() {
                var total = 0
                for(var i = 0; i < this.tableData4[0].products.length; i++) {
                    total += this.tableData4[0].products[i].nums
                }
                console.log(total)
                this.dialogEditNumVisible = false
            },
            saveChooseProduct() {
                console.log('save choose product')
                this.dialogChooseProductVisible = false
            },
            handleDelete(index, row) {
                this.confirmDeleteIndex = index
                this.dialogDeleteConfirmVisible = true
            },
            handleDeleteConfirm() {
                this.tableData3.splice(this.confirmDeleteIndex, 1)
                this.dialogDeleteConfirmVisible = false
            },
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
    .detail-item-title.detail-item-title-biggap {
        margin-bottom: 40px;
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
    .supply-container {
        border: 1px solid #ddd;
        height: 500px;
        text-align: left;
        overflow-y: auto;
    }
    .supply-wrap {

    }
    .supply-lists {
        list-style: none;
        padding: 0;
        padding-left: 20px;
    }
    .supply-list-item {
        cursor: pointer;
    }
    .abc-title {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding-left: 20px;
    }
    .search-supply {
        width: 60%;
        margin: 0 auto 15px 0;
    }
    .add-supply {
        text-align: left;
        margin: 15px auto 25px 0;
    }
    .add-supply-input {
        width: 60%;
    }
    .short-v-line {
        border-left: 2px solid #000;
    }
    .bold-text {
        font-weight: bold;
    }
    .besure-choose {
        text-align: center;
    }
    .img-box-table {
        width: 100px;
        height: 100px;
        background: #ccc;
    }
    .table-el-row {
        padding: 10px 0;
    }
    .add-product-btns {
        float: right;
    }
    .total-money {
        line-height: 40px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-bottom: 0px;
        padding-left: 20px;
        background-color: #eef1f6;
    }
    .edit-products-num {
        text-align: center;
        margin: 2px auto;
    }
    .edit-products-size {
        line-height: 34px;
    }
    .edit-products-num input {
        text-align: center;
    }
    .size-tags,
    .add-size-tag {
        margin: 15px 0;
    }
    .size-tag-item {
        margin: 0 5px;
        min-width: 60px;
        height: 30px;
        line-height: 28px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .add-size-name {
        width: 200px;
        margin-right: 10px;
    }
    .fixed-height-box {
        height: 600px;
        border: 1px solid #ddd;
        overflow-y: auto;
    }
    .add-product-btn-box {
        text-align: left;
        margin: 20px 0;
    }
</style>