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
              <el-form-item label="登录名">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.mobile }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email }}</span>
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
          label="登录名"
          prop="username">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email">
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
    <div>
      <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAddForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetAddForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--<div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>-->
      </el-dialog>
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
  import {getAllSysUsers, getSysUsers} from '@/api/user'
  export default {
    data() {
      return {
        userInfo: null,
        listQuery: {
          page: 1,
          limit: 20,
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getSysUsers(this.listQuery).then(response => {
          console.log('query---------')
          console.log(this.listQuery)
          console.log(response.data.data.records)
          this.userInfo = response.data.data.records
          this.total = response.data.data.total
          this.currentPage = response.data.data.current
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val
        this.getList()
      },
      submitSelectForm() {
        console.log('submit!');
        this.listQuery.page = 1
        this.listQuery.username = this.formInline.username == '' ? null : this.formInline.username
        this.listQuery.mobile = this.formInline.mobile == '' ? null : this.formInline.mobile
        this.listQuery.email = this.formInline.email == '' ? null : this.formInline.email
        this.listQuery.status = this.formInline.status == '' ? null : this.formInline.status
        console.log(this.formInline);
        this.getList()
      },
      submitAddForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetAddForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
