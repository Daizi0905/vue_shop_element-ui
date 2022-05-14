<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--   卡片视图-->
    <el-card>
      <div>
        <el-button type="primary" @click="showAddClassifyDialog">添加分类</el-button>
      </div>
      <!--     <el-table-->
      <!--         :data="tableData"-->
      <!--         style="width: 100%;margin-bottom: 20px;"-->
      <!--         row-key="id"-->
      <!--         border-->
      <!--         default-expand-all-->
      <!--         :tree-props="{children: 'children', hasChildren: 'hasChildren'}">-->

      <!--     </el-table>-->
      <el-table :data="tableData" stripe style="width: 100%" row-key="cat_id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template #default="scope">
            <el-tag size="mini" v-if="scope.row.cat_deleted" class="el-icon-check"></el-tag>
            <el-tag size="mini" v-else type="danger" class="el-icon-close"></el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序">
          <template #default="scope">
            <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level == 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--     分页-->
      <el-pagination @current-change="handlePageChange" :page-sizes="[5, 10, 20, 30, 40]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
    <!--   添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="addClassifyDialog" width="50%" @close="addClassifyDialogClose">
      <el-form ref="addClassifyFormRef" :model="addClassifyForm" label-width="120px" :rules="addClassifyRules">
        <el-form-item label="分类名称：">
          <el-input v-model="addClassifyForm.cat_name"></el-input>
        </el-form-item>
        <!--        选择器-->
        <el-form-item label="父级分类：">
          <el-cascader change-on-select clearable style="width: 100%" expand-trigger="hover" v-model="selectParentId" :options="parentCateList" :props="cascaderProps" @change="parentCateChange"> </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="addClassify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsClassify, addCategories } from '@/config/api'
import fa from 'element-ui/src/locale/lang/fa'

export default {
  name: 'Cate',
  data() {
    return {
      addClassifyDialog: false, // 添加分类对话框
      // 表单列表
      tableData: [],
      // 父级分类列表
      parentCateList: [],
      total: null, // 数据总数
      queryInfo: {
        type: 3,
        pagesize: 5, // 每页显示多少条数据
        pagenum: 1 // 页数
      },
      selectParentId: [],
      addClassifyForm: {
        cat_name: '',
        cat_pid: 0, // 父级分类id
        cat_level: 0 // 默认添加一级分类
      },
      // 指定添加输入框父级分类配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
        // checkStrictly: true
      },

      // 添加分类表单验证规则
      addClassifyRules: {
        cat_name: [{ require: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取商品列表数据
    async getGoodsClassifyFn(type) {
      const res = await getGoodsClassify({
        type: type,
        pagesize: this.queryInfo.pagesize, // 每页显示多少条数据
        pagenum: this.queryInfo.pagenum // 页数
      })
      // console.log( res.data.result )
      // if (res.meta.status == 200) {
      this.tableData = res.data.result
      this.total = res.data.total
      // }
    },
    // 监听页数变化
    handlePageChange(newPage) {
      // console.log( newPage )
      this.queryInfo.pagenum = newPage
      this.getGoodsClassifyFn()
    },

    // 添加分类对话框
    showAddClassifyDialog() {
      this.addClassifyDialog = true
      this.getGoodsClassifyLevel2Fn()
    },

    // 获取父级分类数据
    async getGoodsClassifyLevel2Fn() {
      const res = await getGoodsClassify({
        type: 2
        // pagesize: 1000000,
        // pagenum: 1,
      })
      console.log(res)
      if (res.meta.status !== 200) return
      this.parentCateList = res.data
    },

    // 级联选择器的值改变触发该函数
    parentCateChange(value) {
      console.log(value)
      console.log(value.length)
      if (value.length > 0) {
        // 父级分类的id
        this.addClassifyForm.cat_pid = value[value.length - 1]
        // 为当前的分类等级赋值
        this.addClassifyForm.cat_level = value.length
      } else {
        this.addClassifyForm.cat_pid = 0
        this.addClassifyForm.cat_level = 0
      }
    },

    // 点击按钮，添加新的分类
    addClassify() {
      console.log(this.addClassifyForm)
      // console.log(this.addClassifyForm);
      this.$refs.addClassifyFormRef.validate(async valid => {
        if(!valid) return
        const res = await addCategories(this.addClassifyForm)
        console.log(res);
        if(res.meta.status !== 201) return
        this.$message.success('添加分类成功')
        this.getGoodsClassifyFn()
        this.addClassifyDialog = false
      })
    },

    // 添加分类对话框关闭，重置表单
    addClassifyDialogClose() {
      this.addClassifyForm.cat_name = ''
      this.addClassifyForm.cat_level = 0
      this.addClassifyForm.cat_pid = 0
      this.addClassifyForm.cat_level = 0
    }
  },

  created() {
    this.getGoodsClassifyFn(3)
  }
}
</script>

<style scoped></style>
