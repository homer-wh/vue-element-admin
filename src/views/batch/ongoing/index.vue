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
                        <el-button>更改</el-button>
                    </div>
                    <el-dialog title="选择供应商" :visible.sync="dialogFormVisible">
                        <div class="supply-wrap">

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

                <div class="detail-item-title"><span class="vertical-line-b">&nbsp;</span>采购清单</div>

                <el-form-item>
                    <el-input v-model="form.list"></el-input>
                </el-form-item>

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
            supllyform: {

            },
            dialogFormVisible: false,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            supplychecked: false
          }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
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
</style>