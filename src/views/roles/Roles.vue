<template>
  <div class="roles_view">
    <!--  面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRolesBox = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
          :data="rolesList"
          stripe
          style="width: 100%">
        <!--        展开列-->
        <el-table-column
            type="expand">
          <template #default="scope">
            <el-row v-for="(item1, index1) in scope.row.children" :key="item1.id"
                    :class="['row_bottom',index1 === 0 ? 'row_top' : '']">
              <!--              一级权限-->
              <el-col :span="5">
                <el-tag closable @close="removeRolesRight(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <el-icon class="el-icon-caret-right"></el-icon>
              </el-col>
              <el-col :span="19">
                <!--                二级权限-->
                <el-row v-for="(item2, index2) in item1.children" :key="item2.id"
                        :class="index2 === 0 ? '' : 'row_top'">
                  <el-col :span="6">
                    <el-tag closable type="success" @close="removeRolesRight(scope.row, item2.id)">
                      {{ item2.authName }}
                    </el-tag>
                    <el-icon class="el-icon-caret-right"></el-icon>
                  </el-col>
                  <el-col :span="18">
                    <!--                    三级权限-->
                    <el-tag type="warning" closable v-for="(item3, index3) in item2.children" :key="item3.id"
                            @close="removeRolesRight(scope.row, item3.id)">{{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!--            <pre>{{ scope.row }}</pre>-->
          </template>
        </el-table-column>
        <el-table-column
            label="#"
            type="index">
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="角色名称">
        </el-table-column>
        <el-table-column
            prop="roleDesc"
            label="角色描述">
        </el-table-column>
        <el-table-column
            label="操作">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" @click="changeRolesData(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeRoles(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-s-tools" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--   添加用户对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addRolesBox"
        width="50%"
        @close="resetForm">
      <el-form :model="addRolesForm" ref="addRolesForm" label-width="100px">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addRolesBox = false">取 消</el-button>
    <el-button type="primary" @click="addURoles">确 定</el-button>
  </span>
    </el-dialog>
    <!--    编辑角色信息-->
    <el-dialog
        title="编辑角色信息"
        :visible.sync="editRolesBox"
        width="50%"
        @close="resetForm">
      <el-form :model="editRolesForm" ref="addRolesForm" label-width="100px">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editRolesBox = false">取 消</el-button>
    <el-button type="primary" @click="editURolesEnter">确 定</el-button>
  </span>
    </el-dialog>
    <!--    分配权限对话框-->
    <el-dialog
        title="分配权限"
        :visible.sync="setRightDialog"
        width="50%"
        @close="resetRightDialog">
      <!--      树形结构-->
      <el-tree :data="rightsList" :props="treeProps" node-key="id" :default-checked-keys="defaultKey" ref="treeRef"
               show-checkbox
               default-expand-all></el-tree>
      <span slot="footer">
    <el-button @click="setRightDialog = false">取 消</el-button>
    <el-button type="primary" @click="allotRight">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, addRoles, editRoles, deleteRoles, deleteRolesRight, getRights, allotRolesRight } from "@/config/api";

export default {
  name: "Roles",
  data () {
    return {
      setRightDialog: false,  // 分配权限
      addRolesBox: false,  // 添加角色盒子
      editRolesBox: false,  // 编辑角色盒子
      // 角色列表
      rolesList: [],
      // 权限列表
      rightsList: [],
      // 添加用户
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加用户
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 树形结构的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点id值
      defaultKey: [],
      // 需要分配权限的角色 id
      allotRoleId: ''
    }
  },
  methods: {
    // 获取角色列表
    async getRolesList () {
      const res = await getRoles()
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error( res.meta.status )
      this.rolesList = res.data
    },
    // 关闭添加对话框就重置表单
    resetForm () {
      this.$refs.addRolesForm.resetFields()
    },
    // 确定添加角色
    async addURoles () {
      const res = await addRoles( this.addRolesForm )
      if (res.meta.status !== 201) return this.$message.error( res.meta.msg )
      this.$message.success( res.meta.msg )
      this.addRolesBox = false
      console.log( res )
      this.getRolesList()
    },
    // 编辑角色信息
    changeRolesData (row) {
      this.editRolesBox = true
      // console.log(row)
      this.editRolesForm = row
    },
    // 确定编辑角色
    async editURolesEnter () {
      const { meta: res } = await editRoles( this.editRolesForm.id, this.editRolesForm )
      console.log( res )
      if (res.status !== 200) return this.$message.error( res.msg )
      this.$message.success( '修改信息提交成功！' )
      this.editRolesBox = false
      this.getRolesList()
    },
    // 删除角色
    async removeRoles (id) {
      const result = await this.$confirm( '此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).catch( err => err )
      if (result !== 'confirm') return this.$message( '您取消了删除！' )
      const res = await deleteRoles( id )
      console.log( res )
      if (res.meta.status !== 200) return this.$message.error( res.meta.msg )
      this.$message.success( res.meta.msg )
      this.getRolesList()
    },
    // 移除第三层权限
    async removeRolesRight (role, rightID) {
      // console.log(role, rightID)
      const result = await this.$confirm( '此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).catch( err => err )
      // console.log(result)
      if (result !== 'confirm') return this.$message( '您取消了删除!' )
      const res = await deleteRolesRight( role.id, rightID )
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error( res.meta.msg )
      this.$message.success( res.meta.msg )
      role.children = res.data
      // this.getRolesList()
    },
    //  分配权限对话框
    async showSetRightDialog (row) {
      this.allotRoleId = row.id
      const res = await getRights( 'tree' )
      if (res.meta.status !== 200) return this.$message.error( res.meta.msg )
      // console.log(res)
      this.rightsList = res.data
      this.setRightDialog = true
      this.getDefaultNodeId( row, this.defaultKey )
      console.log( row )
    },
    // 获取该角色已拥有的权限的id
    getDefaultNodeId (node, arr) {
      // 如果该节点没有 children 属性, 则将该节点的id添加到数组中
      if (!node.children) return arr.push( node.id )
      node.children.forEach( item => {
        this.getDefaultNodeId( item, arr )
      } )
    },
    // 分配权限管理对话框关闭重置树形结构
    resetRightDialog () {
      this.defaultKey = []
    },
    // 确定分配权限
    async allotRight () {
      // 获取已选中节点的id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join( ',' )
      // console.log(idStr)
      const { meta: res } = await allotRolesRight( this.allotRoleId, {
        rids: idStr
      } )
      console.log( res )
      if (res.status !== 200) return this.$message.error( res.msg )
      this.$message.success( res.msg )
      this.setRightDialog = false
      // this.allotRoleId = ''
      this.getRolesList()
    }
  },
  created () {
    this.getRolesList()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
}

.el-tag {
  margin: 10px;
}

.row_bottom {
  border-bottom: 1px solid #eeeeee;
}

.row_top {
  border-top: 1px solid #eeeeee;
}
</style>