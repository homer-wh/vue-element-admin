<template>
  <div class="app-container calendar-list-container">
    <div class="batch-titel">批次管理</div>
    <div class="filter-container">
        <el-input placeholder="请输入内容" v-model="input5">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="全部" value="1"></el-option>
            <el-option label="批次号" value="2"></el-option>
            <el-option label="供应商" value="3"></el-option>
            <el-option label="商品" value="4"></el-option>
            <el-option label="备注" value="5"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
        </el-input>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="first">
            <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
              <el-table-column
                align="center"
                label="批次号"
                width="180px">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('P{y}{m}{d}A')}}</span>
                  <div style="text-align:center;margin:10px auto;">
                    <el-tag
                      v-if="scope.row.status!='1'"
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>进行中</el-tag>
                    <el-tag
                      v-else
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>已结束</el-tag>
                  </div>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="创建日期">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d}')}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="预计成本">
                <template scope="scope">
                  <span class="link-type">¥{{scope.row.title}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="已付金额">
                <template scope="scope">
                  <span>{{scope.row.title | randomMoney}}</span>
                </template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="商品总数">
                <template scope="scope">
                  <span>{{scope.row.auditor}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="已到货数量" width="120px">
                <template scope="scope">
                  <span class="link-type">{{scope.row.auditor | randomCount}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="">
                <template scope="scope">
                  <el-button v-if="scope.row.status!='1'" size="small" plain type="text" @click="handleModifyStatus(scope.row,'published')">追加支付
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <el-button v-if="scope.row.status!='1'" size="small" plain plain type="text" @click="handleCreate">追加采购
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <router-link to="/batch/detail">
                    <el-button v-if="scope.row.status" size="small" plain plain type="text" @click="go2detail">查看详情</el-button>
                  </router-link>

                </template>
              </el-table-column>

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="进行中" name="second">
            <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
              <el-table-column
                align="center"
                label="批次号"
                width="180px">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('P{y}{m}{d}A')}}</span>
                  <div style="text-align:center;margin:10px auto;">
                    <el-tag
                      v-if="scope.row.status!='1'"
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>进行中</el-tag>
                    <el-tag
                      v-else
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>已结束</el-tag>
                  </div>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="创建日期">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d}')}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="预计成本">
                <template scope="scope">
                  <span class="link-type">¥{{scope.row.title}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="已付金额">
                <template scope="scope">
                  <span>{{scope.row.title | randomMoney}}</span>
                </template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="商品总数">
                <template scope="scope">
                  <span>{{scope.row.auditor}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="已到货数量" width="120px">
                <template scope="scope">
                  <span class="link-type">{{scope.row.auditor | randomCount}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="">
                <template scope="scope">
                  <el-button v-if="scope.row.status!='1'" size="small" plain type="text" @click="handleModifyStatus(scope.row,'published')">追加支付
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <el-button v-if="scope.row.status!='1'" size="small" plain plain type="text" @click="handleCreate">追加采购
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <router-link to="/batch/detail">
                    <el-button v-if="scope.row.status" size="small" plain plain type="text" @click="go2detail">查看详情</el-button>
                  </router-link>

                </template>
              </el-table-column>

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="已结束" name="third">
            <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
              <el-table-column
                align="center"
                label="批次号"
                width="180px">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('P{y}{m}{d}A')}}</span>
                  <div style="text-align:center;margin:10px auto;">
                    <el-tag
                      v-if="scope.row.status!='1'"
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>进行中</el-tag>
                    <el-tag
                      v-else
                      :type="scope.row.status != '1' ? 'primary' : 'gray'"
                      close-transition>已结束</el-tag>
                  </div>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="创建日期">
                <template scope="scope">
                  <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d}')}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="预计成本">
                <template scope="scope">
                  <span class="link-type">¥{{scope.row.title}}</span>
                </template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="已付金额">
                <template scope="scope">
                  <span>{{scope.row.title | randomMoney}}</span>
                </template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="商品总数">
                <template scope="scope">
                  <span>{{scope.row.auditor}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="已到货数量" width="120px">
                <template scope="scope">
                  <span class="link-type">{{scope.row.auditor | randomCount}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="">
                <template scope="scope">
                  <el-button v-if="scope.row.status!='1'" size="small" plain type="text" @click="handleModifyStatus(scope.row,'published')">追加支付
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <el-button v-if="scope.row.status!='1'" size="small" plain plain type="text" @click="handleCreate">追加采购
                  </el-button>
                  <div style="margin=5px 0;" v-if="scope.row.status!='1'"></div>
                  <router-link to="/batch/detail">
                    <el-button v-if="scope.row.status" size="small" plain plain type="text" @click="go2detail">查看详情</el-button>
                  </router-link>

                </template>
              </el-table-column>

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="35%">
        <router-link to="/commodity/index/addcommodity">
            <el-button size="large" @click="dialogFormVisible = false">&nbsp;添加商品源&nbsp;</el-button>
        </router-link>
        <el-button size="large" v-if="dialogStatus=='create'" type="primary" @click="dialogFormVisible = false">选择已有商品</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchList, fetchPv } from 'api/article_table';
  import { parseTime } from 'utils';

  const calendarTypeOptions = [
      { key: 'CN', display_name: '中国' },
      { key: 'US', display_name: '美国' },
      { key: 'JP', display_name: '日本' },
      { key: 'EU', display_name: '欧元区' }
  ];

  // arr to obj
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc
  }, {});

  export default {
    name: 'table_demo',
    data() {
      return {
        select: '',
        input5: '',
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        temp: {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          type: '',
          status: 'published'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '追加采购'
        },
        dialogPvVisible: false,
        pvData: [],
        showAuditor: false,
        tableKey: 0,
        activeName: 'first',
      }
    },
    created() {
      this.getList();
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      },
      randomMoney(title) {
        return (title*(Math.floor(Math.random()*6 + 5)/10)).toFixed(2)
      },
      randomCount(auditor) {
        return (auditor*(Math.floor(Math.random()*6 + 5)/10)).toFixed(0)
      }
    },
    methods: {
      filterTag(value, row) {
        return row.status === value;
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined;
          this.listQuery.end = undefined;
          return;
        }
        this.listQuery.start = parseInt(+time[0] / 1000);
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '请前往移动端进行追加支付操作',
          type: 'success'
        });
        row.status = status;
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      },
      create() {
        this.temp.id = parseInt(Math.random() * 100) + 1024;
        this.temp.timestamp = +new Date();
        this.temp.author = '原创作者';
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        });
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp;
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1, this.temp);
            break;
          }
        }
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: 'published',
          type: ''
        };
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData;
          this.dialogPvVisible = true;
        })
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
          const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, 'table数据');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      go2detail() {

      },
      handleTabClick(tab, event) {
          console.log(tab, event);
      }
    }
  }
</script>

<style>
    .batch-titel {
        font-size: 20px;
        margin: 0 0 30px;
    }
    .filter-container {
        width: 500px;
    }
    .el-select .el-input {
        width: 110px;
    }
    .el-dialog__header,
    .el-dialog__body {
        text-align: center;
    }
</style>
