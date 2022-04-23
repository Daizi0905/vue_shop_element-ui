<template>
  <div class="view">
    <!--  面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  用户列表-->
    <el-card class="box-card">
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserBox = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--    用户列表数据-->
      <el-table
          :data="userList"
          style="width: 100%">
        <el-table-column
            label="#"
            type="index">
        </el-table-column>
        <el-table-column
            prop="username"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="180">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="role_name"
            label="角色">
        </el-table-column>
        <el-table-column
            label="状态">
          <template #default="scope">
            <el-switch
                v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template #default="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="changeUsersFrom(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeUsers(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--      分页区域-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 5, 10, 14]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
<!--   添加用户对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addUserBox"
        width="50%"
    @close="resetForm">
      <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addUserBox = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
<!--    修改用户信息对话框-->
    <el-dialog
        title="修改用户信息"
        :visible.sync="changeUserBox"
        width="50%"
        @close="resetForm">
      <el-form :model="changeUserFrom" :rules="addUserFormRules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：">
          <el-input v-model="changeUserFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="changeUserFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="mobile">
          <el-input v-model="changeUserFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changeUserBox = false">取 消</el-button>
    <el-button type="primary" @click="changeUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUsers, userState, addUsers, queryUser, changeUsers, deleteUser} from "@/config/api";

export default {
  name: "Users",
  data() {
    // 邮箱验证
    var checkEmail = (rules, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) return cb()
      cb(new Error('请输入合法的邮箱！'))
    }
    // 手机号码验证
    var checkMobile = (rules, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) return cb()
      cb(new Error('请输入合法的手机号码！'))
    }
    return {
      total: 0, //  总页数
      addUserBox: false,  // 添加用户对话框
      changeUserBox: false,  // 修改用户信息对话框
      // 获取用户列表的对象参数
      queryInfo: {
        query: '',  // 搜索关键字
        pagenum: 1, // 当前的页数
        pagesize: 2  // 当前每页显示多少条数据
      },
      //  用户列表
      userList: [],
      // 添加用户的表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改用户信息表单
      changeUserFrom: {},
      // 添加用户表单验证
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名长度在2-10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6-15个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    getUsersList() {
      getUsers(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return this.$message.error('用户数据获取失败！！！')
        this.userList = res.data.users
        this.total = res.data.total
        // console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 监听pageSize(每页显示几条数据)改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      // 获取最新的pageSize，重新发起数据请求
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
  //  监听页码的改变
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    // 监听状态开关的改变
    userStateChange(row) {
      // console.log(row)
      userState(row.id, row.mg_state).then(res => {
        if (res.meta.status !== 200) {
          // 若是更新用户状态失败，则修改回按钮原来的状态
          row.mg_state = !row.mg_state
          return this.$message.error('更新用户状态失败！！！')
        }
        this.$message.success('更新用户状态成功！')
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加用户取消按钮
    resetForm() {
      this.$refs.addUserForm.resetFields()
    },
  //  添加用户确定按钮
    addUser() {
      this.$refs.addUserForm.validate(valid => {
        // console.log(valid)
        if (!valid) return
        addUsers(this.addUserForm).then(res => {
          // console.log(res)
          if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.getUsersList()
          this.addUserBox = false
        }).catch(err => {
          console.log(err)
        })
      })
    },
  //  修改用户信息表单
    changeUsersFrom(row) {
      this.changeUserBox = true
      // console.log(row.id)
      // 通过id发送数据请求
      queryUser(row.id).then(res => {
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.changeUserFrom = res.data
      }).catch(err => {
        console.log(err)
      })
    },
  //  确定修改用户信息按钮
    changeUser() {
    //  表达预验证
      this.$refs.addUserForm.validate(valid => {
        // console.log(valid)
        if (!valid) return Error
        changeUsers(this.changeUserFrom.id, {
          email: this.changeUserFrom.email,
          mobile: this.changeUserFrom.mobile
        }).then(res => {
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.getUsersList()
          this.changeUserBox = false
          // console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    },
  //  删除用户
    async removeUsers(row) {
      const result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(result)
      if (result == 'cancel') return this.$message.info('您已取消删除用户！')
      const { meta: res } = await deleteUser(row.id)
      // console.log(res)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUsersList()
    }
  },
  created() {
    this.getUsersList()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

</style>