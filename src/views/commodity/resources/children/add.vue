<template>
    <div class="app-container">
        <div class="detail-title">添加商品源</div>
        <div class="add-form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="add-ruleForm">
                <div class="form-group-title">
                    <span class="vertical-line-b">&nbsp;</span>商品信息
                </div>
                <el-form-item label="商品主图" prop="mainImg" required class="add-form-item">
                    <el-upload
                      class="mainimg-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="mainimg">
                      <i v-else class="el-icon-plus mainimg-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品细节图" prop="detaileImg" class="add-form-item">
                    <el-upload
                      class="mainimg-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleDetailSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="ruleForm.detailImageUrl" :src="ruleForm.detailImageUrl" class="mainimg">
                      <i v-else class="el-icon-plus mainimg-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品名称" prop="productName" required class="add-form-item">
                    <el-input v-model="ruleForm.productName" class="common-width" placeholder="请输入商品名称"></el-input>
                </el-form-item>

                <el-form-item label="商品品牌" prop="productBrand" required class="add-form-item">
                    <el-button type="primary" v-if="!brandchecked" @click="dialogBrandFormVisible = true">点击选择品牌</el-button>
                    <div v-else>
                        <el-input v-model="ruleForm.productBrand" style="width:300px;" placeholder="FENDI"></el-input>
                        <el-button @click="dialogBrandFormVisible = true">更改</el-button>
                    </div>

                    <el-dialog title="商品品牌" :visible.sync="dialogBrandFormVisible" top="5%">
                        <div class="search-supply">
                            <el-input placeholder="搜索商品品牌" v-model="searchbrand">
                                <el-button slot="append" icon="search"></el-button>
                            </el-input>
                        </div>
                        <div class="supply-container">
                            <div class="supply-wrap" v-for="item in brandobj">
                                <div class="abc-title">{{item.title}}</div>
                                <ul class="supply-lists">
                                    <li class="supply-list-item" @click="chooseABrand(list)" v-for="list in item.value">{{list}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="check-supply">
                            <p><span class="short-v-line">&nbsp;</span><span class="bold-text">您当前选择的品牌是:</span> {{chosedBrand}}</p>
                        </div>
                        <div class="besure-choose">
                            <el-button type="primary" plain size="large" @click="dialogBrandFormVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                            <el-button type="primary" size="large" @click="sureAboutBrandChoose">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        </div>

                    </el-dialog>
                </el-form-item>

                <el-form-item label="商品类目" prop="productClass" required class="add-form-item">
                    <el-input v-model="ruleForm.productClass" class="common-width" placeholder="根据商品名称自动匹配到的类目"></el-input>
                    <el-button type="text" @click="dialogClassFormVisible = true">无合适的类目,手动选择</el-button>
                    <el-dialog title="商品类目" :visible.sync="dialogClassFormVisible" top="5%">
                        <div class="search-supply">
                            <el-input placeholder="搜索商品类目" v-model="searchbrand">
                                <el-button slot="append" icon="search"></el-button>
                            </el-input>
                        </div>
                        <div class="level-container">
                            <el-row :gutter="20">
                              <el-col :span="8">
                                <div class="grid-content">
                                  <div class="level-search-box">
                                    <el-input size="small" v-model="level1Search" placeholder="搜索一级类目"></el-input>
                                  </div>
                                  <ul class="level-list-box">
                                    <li class="level-list-item" v-for="(item, index) in level1List" @click="level1Click(item, index)">{{item}}<span class="level-right-icon"><i class="el-icon-arrow-right"></i></span></li>
                                  </ul>
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="grid-content">
                                  <div class="level-search-box">
                                    <el-input size="small" v-model="level2Search" placeholder="搜索二级类目"></el-input>
                                  </div>
                                  <ul class="level-list-box">
                                    <li class="level-list-item" v-for="(item, index) in level2List" @click="level2Click(item, index)">{{item}}<span class="level-right-icon"><i class="el-icon-arrow-right"></i></span></li>
                                  </ul>
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="grid-content">
                                  <div class="level-search-box">
                                    <el-input size="small" v-model="level3Search" placeholder="搜索三级类目"></el-input>
                                  </div>
                                  <ul class="level-list-box">
                                    <li class="level-list-item" v-for="(item, index) in level3List" @click="level3Click(item, index)">{{item}}<span class="level-right-icon"><i class="el-icon-arrow-right"></i></span></li>
                                  </ul>
                                </div>
                              </el-col>
                            </el-row>
                        </div>
                        <div class="check-supply">
                            <p><span class="short-v-line">&nbsp;</span><span class="bold-text">您当前选择的商品类目是:</span> {{chosedClass}}</p>
                        </div>
                        <div class="besure-choose">
                            <el-button type="primary" plain size="large" @click="dialogClassFormVisible = false">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                            <el-button type="primary" size="large" @click="sureAboutClassChoose">&nbsp;&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        </div>

                    </el-dialog>
                </el-form-item>

                <el-form-item label="商品规格" prop="productSpecify" required class="add-form-item">
                    <div class="specify-item">
                        <p>颜色:(只能选择一种颜色)</p>
                        <div class="size-tags">
                            <span v-for="(item, index) in tagsOfColor" :key="index" @click="addNewColorItem(item)">
                                <el-tag class="size-tag-item" color="#20a0ff" :closable="index > 5" @close.stop="handleColorTagClose(index)">{{item}}</el-tag>
                            </span>
                        </div>
                        <div class="add-size-tag">
                            <el-input class="add-size-name" v-model="addMoreColorTag" placeholder="自定义属性"></el-input><el-button type="primary" @click="createNewColorTag">新建</el-button>
                        </div>

                        <p>尺寸:(尺寸可以多选)</p>
                        <div class="size-tags">
                            <span v-for="(item, index) in tagsOfSize" :key="index" @click="addNewSizeItem(item)">
                                <el-tag class="size-tag-item" color="#20a0ff" :closable="index > 5" @close.stop="handleSizeTagClose(index)">{{item}}</el-tag>
                            </span>
                        </div>
                        <div class="add-size-tag">
                            <el-input class="add-size-name" v-model="addMoreSizeTag" placeholder="自定义属性"></el-input><el-button type="primary" @click="createNewSizeTag">新建</el-button>
                        </div>

                        <div>
                            <el-table
                                :data="ruleForm.productSpecify"
                                border
                                style="width: 600px">
                                <el-table-column
                                  prop="color"
                                  label="颜色"
                                  align="center"
                                  width="200">
                                </el-table-column>
                                <el-table-column
                                  prop="size"
                                  label="尺寸"
                                  align="center"
                                  width="200">
                                </el-table-column>
                                <el-table-column
                                  prop="productNum"
                                  align="center"
                                  label="货号">
                                  <template scope="scope">
                                    <el-input v-model="scope.row.productNum" size="small"></el-input>
                                  </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form-item>

                <div class="product-detail">
                    <span class="vertical-line-b">&nbsp;</span><em class="require-star">*</em><span class="show-like-label">商品信息</span>
                    <router-link to="/commodity/index/editdetail">
                        <span class="show-like-a"><i class="el-icon-edit"></i>编辑商品详情</span>
                    </router-link>
                </div>

                <div class="product-detail no-border">
                    <span class="vertical-line-b">&nbsp;</span>其他信息
                </div>

                <el-form-item label="商品备注" prop="productBackup" class="add-form-item">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      placeholder="请输入内容"
                      v-model="ruleForm.productBackup">
                    </el-input>
                    <div>
                        <p>货源</p>
                        <el-input v-model="ruleForm.productFromCountry" class="product-from-place" placeholder="国家"></el-input>
                        <el-input v-model="ruleForm.productFromCity" class="product-from-place" placeholder="城市"></el-input>
                    </div>
                    <div>
                        <p><em class="require-star">*</em>运费</p>
                        <el-input v-model="ruleForm.productTransform" disabled class="product-from-place" placeholder="到付"></el-input>
                    </div>

                </el-form-item>


            </el-form>
        </div>



    </div>
</template>
<script>
    export default {
        data() {
          return {
              ruleForm: {
                imageUrl: '',
                detailImageUrl: '',
                productName: '',
                productBrand: '',
                productClass: '',
                productBackup: '',
                productFromCountry: '',
                productFromCity: '',
                productTransform: '',
                productSpecify: [],
              },
              brandobj: [
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
              tagsOfSize: ['XS','S', 'M', 'L', 'XL', 'XXL'],
              tagsOfColor: ['绿色', '黑色', '白色', '红色', '黄色', '蓝色'],
              level1List: [1, 2],
              level2List: [],
              level3List: [],
              chosedBrand: '',
              chosedClass: '',
              brandchecked: false,
              dialogBrandFormVisible: false,
              dialogClassFormVisible: false,
              levelData:[
                {
                  level: 1,
                  children: [
                    {
                      level: 11,
                      children: [
                        {
                          level: 111
                        },
                        {
                          level: 112
                        }
                      ]
                    },
                    {
                      level: 12,
                      children: [
                        {
                          level: 121
                        },
                        {
                          level: 122
                        }
                      ]
                    }

                  ]
                },
                {
                  level: 2,
                  children: [
                    {
                      level: 21,
                      children: [
                        {
                          level: 211
                        },
                        {
                          level: 212
                        }
                      ]
                    },
                    {
                      level: 22,
                      children: [
                        {
                          level: 221
                        },
                        {
                          level: 222
                        }
                      ]
                    }

                  ]
                },
              ],
              level1Search: '',
              level2Search: '',
              level3Search: '',
              levelChoosedObj: [
                {
                  Choosedindex: '',
                  Chooseditem: ''
                },
                {
                  Choosedindex: '',
                  Chooseditem: ''
                },
                {
                  Choosedindex: '',
                  Chooseditem: ''
                },
              ],
              colorchoosed: 'gray',
              searchbrand: '',
              addMoreSizeTag: '',
              addMoreColorTag: '',
              sizeChoosed: [],
              temporaryItem: {color: '', size: ''},
              rules: {

              }
          }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleDetailSuccess(res, file) {
                this.detailImageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            chooseABrand(str) {
                this.chosedBrand = str;
            },
            sureAboutBrandChoose() {
                if(this.chosedBrand) {
                    this.ruleForm.productBrand = this.chosedBrand;
                    this.dialogBrandFormVisible = false;
                    this.brandchecked = true;
                } else {
                    this.$message({
                        message: '请选择供应商',
                        type: 'warning'
                    });
                }
            },
            sureAboutClassChoose() {
                if(this.chosedClass) {
                    this.ruleForm.productClass = this.chosedClass;
                    this.dialogClassFormVisible = false;
                    // this.classchecked = true;
                } else {
                    this.$message({
                        message: '请选择商品类目',
                        type: 'warning'
                    });
                }
            },
            addNewSizeItem(item) {
                if(this.temporaryItem.color) {
                    if(this.sizeChoosed.indexOf(item) > -1) {
                        this.$message({
                            message: '该尺寸已被选择',
                            type: 'warning'
                        });
                    } else {
                        this.temporaryItem.size = item
                        this.ruleForm.productSpecify.push({color: this.temporaryItem.color, size: this.temporaryItem.size, productNum: ''})
                        this.sizeChoosed.push(item)
                    }

                } else {
                    this.$message({
                        message: '请先选择商品颜色',
                        type: 'warning'
                    });
                }
            },
            addNewColorItem(item) {
                if(!this.temporaryItem.color) {
                    this.temporaryItem.color = item
                } else {
                    if(this.temporaryItem.color != item) {
                        this.$message({
                            message: '只能选择一种颜色',
                            type: 'warning'
                        });
                    }

                }

            },
            handleSizeTagClose(index) {
                this.tagsOfSize.splice(index, 1)
            },
            handleColorTagClose(index) {
                this.tagsOfColor.splice(index, 1)
            },
            createNewSizeTag() {
                if(this.addMoreSizeTag) {
                    this.tagsOfSize.push(this.addMoreSizeTag)
                    this.addMoreSizeTag = ''
                } else {
                    this.$message({
                        message: '请输入新建尺寸属性',
                        type: 'warning'
                    });
                }
            },
            createNewColorTag() {
                if(this.addMoreColorTag) {
                    this.tagsOfColor.push(this.addMoreColorTag)
                    this.addMoreColorTag = ''
                } else {
                    this.$message({
                        message: '请输入新建尺寸属性',
                        type: 'warning'
                    });
                }
            },
            level1Click(item, index) {
              this.level2List.splice(0)
              this.level3List.splice(0)
              this.levelChoosedObj[0].Chooseditem = item
              this.levelChoosedObj[0].Choosedindex = index
              if(this.levelData[index].children) {
                for(var i = 0; i < this.levelData[index].children.length; i++) {
                  this.level2List.push(this.levelData[index].children[i].level)
                }
              }
            },
            level2Click(item, index) {
              this.level3List.splice(0)
              this.levelChoosedObj[1].Chooseditem = item
              this.levelChoosedObj[1].Choosedindex = index

              if(this.levelData[this.levelChoosedObj[0].Choosedindex].children[index].children) {
                for(var i = 0; i < this.levelData[this.levelChoosedObj[0].Choosedindex].children[index].children.length; i++) {
                  this.level3List.push(this.levelData[this.levelChoosedObj[0].Choosedindex].children[index].children[i].level)
                }
              }
            },
            level3Click(item, index) {

            },
        }
      }
</script>

<style>
    .detail-title {
        margin: 0 0 30px;
    }
    .add-form-box {
        border: 1px solid #ddd;
        padding: 40px;
        font-size: 14px;
    }
    .add-form-item {
        margin: 20px 0;
    }
    .form-group-title {
        font-size: 16px;
    }
    .mainimg-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .mainimg-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .mainimg-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .mainimg {
        width: 178px;
        height: 178px;
        display: block;
    }
    .vertical-line-b {
        border-left: 4px solid #333;
    }
    .common-width {
        width: 600px;
    }
    .search-supply {
        width: 60%;
        margin: 0 auto 15px 0;
    }
    .supply-container {
        border: 1px solid #ddd;
        height: 500px;
        text-align: left;
        overflow-y: auto;
    }
    .level-container {
      padding: 20px 0;
    }
    .abc-title {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding-left: 20px;
    }
    .supply-lists {
        list-style: none;
        padding: 0;
        padding-left: 20px;
    }
    .supply-list-item {
        cursor: pointer;
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
    .grid-content {
        /* background-color: #eee; */
        border: 1px solid #ddd;
        padding: 5px 10px;
        height: 400px;
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
    .require-star {
        font-size: 18px;
        vertical-align: -3px;
        color: #f00;
        margin: 0 3px;
    }
    .product-detail {
        line-height: 80px;
        border: 1px solid #ddd;
        border-left: 0;
        border-right: 0;
    }
    .product-detail.no-border {
        border: 0;
    }
    .show-like-label {
        font-size: 14px;
        font-weight: 700;
        color: #48576a;
    }
    .show-like-a {
        color: rgb(22, 155, 213);
        margin: 0 8px;
    }
    .show-like-a i {
        margin: 0 5px;
    }
    .product-from-place {
        width: 200px;
        margin-right: 20px;
    }
    .level-search-box {
      text-align: center;
    }
    .level-list-box {
      list-style: none;
      padding: 0;
    }
    .level-list-item {
      color: #333;
      cursor: pointer;
    }
    .level-list-item:hover {
      background-color: #333;
      color: #fff;
    }
    .level-right-icon {
      float: right;
    }
</style>