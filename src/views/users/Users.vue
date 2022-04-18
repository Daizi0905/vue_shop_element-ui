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
          <el-button type="primary">添加用户</el-button>
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
              <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
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
  </div>
</template>

<script>
import {getUsers, userState} from "@/config/api";

export default {
  name: "Users",
  data() {
    return {
      // 获取用户列表的对象参数
      queryInfo: {
        query: '',  // 搜索关键字
        pagenum: 1, // 当前的页数
        pagesize: 2  // 当前每页显示多少条数据
      },
      //  用户列表
      userList: [],
      total: 0
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