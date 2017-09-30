<template>
  <div class="wrapper">
    <div>
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="登录名">
          <el-input v-model="formInline.username" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="状态">
            <el-option label="启用" value="true"></el-option>
            <el-option label="禁用" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSelectForm">查询</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="userInfo"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="操作人">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="请求地址">
                <span>{{ props.row.url }}</span>
              </el-form-item>
              <el-form-item label="请求IP">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="终端类型">
                <span>{{ props.row.terminalType }}</span>
              </el-form-item>
              <el-form-item label="请求参数">
                <span>{{ props.row.param }}</span>
              </el-form-item>
              <el-form-item label="操作类型">
                <span>{{ props.row.logType }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="操作人"
          prop="username">
        </el-table-column>
        <el-table-column
          label="操作类型"
          prop="logType">
        </el-table-column>
        <el-table-column
          label="内容"
          prop="content">
        </el-table-column>
        <el-table-column
          label="操作时间"
          prop="createTime">
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100, 200]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .wrapper {
    margin: 5px 5px 5px 5px;
  }
</style>

<script>
  import { getLogInfo } from '@/api/sysLog'
  export default {
    data() {
      return {
        userInfo: null,
        listQuery: {
          page: 1,
          limit: 10,
          username: null,
          email: null,
          mobile: null,
          status: null
        },
        total: null,
        currentPage: null,
        formInline: {
          username: null,
          mobile: null,
          email: null,
          status: null
        },
        dialogFormVisible: false,
        ruleForm: {
          username: '',
          email: '',
          mobile: '',
          status: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请填写正确的邮箱地址', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请填写正确的手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请填写正确的11位手机号', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getLogInfo(this.listQuery).then(response => {
          console.log('query---------')
          console.log(this.listQuery)
          console.log(response.data.data.records)
          this.userInfo = response.data.data.records
          this.total = response.data.data.total
          this.currentPage = response.data.data.current
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.listQuery.page = val
        this.getList()
      },
      submitSelectForm() {
        console.log('submit!')
        this.listQuery.page = 1
        this.listQuery.username = this.formInline.username === '' ? null : this.formInline.username
        this.listQuery.mobile = this.formInline.mobile === '' ? null : this.formInline.mobile
        this.listQuery.email = this.formInline.email === '' ? null : this.formInline.email
        this.listQuery.status = this.formInline.status === '' ? null : this.formInline.status
        console.log(this.formInline)
        this.getList()
      }
    }
  }
</script>
