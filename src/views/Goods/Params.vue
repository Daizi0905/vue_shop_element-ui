<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
          title="注意：只允许为第三级分类设置相关参数"
          type="warning" :closable="false" show-icon>
      </el-alert>
      <div style="margin: 15px 0;">
        <span>选择商品分类：</span>
        <el-cascader
            v-model="selectClassificationOfGoodsId"
            :options="classificationOfGoodsList"
            :props="selectClassificationOfGoodsProps"
            @change="handleChange">
        </el-cascader>
      </div>
      <!--      tab-->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <!--        添加动态参数-->
        <el-tab-pane label="动态参数" name="many">
        </el-tab-pane>
        <!--        添加静态属性-->
        <el-tab-pane label="静态属性" name="only">
        </el-tab-pane>
        <div>
          <el-button type="primary" :disabled="btnDisabled" @click="addDialogVisible = true">
            {{ activeName === 'many' ? '添加参数' : '添加属性' }}
          </el-button>
        </div>
        <el-table
            :data="manyList"
            style="width: 100%">
          <el-table-column
              type="expand">
          </el-table-column>
          <el-table-column
              type="index">
          </el-table-column>
          <el-table-column
              prop="attr_name"
              label="参数名称">
          </el-table-column>
          <el-table-column
              label="操作">
            <template #default="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCategoriesFn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tabs>
    </el-card>
    <!--    添加对话框-->
    <el-dialog
        :title="activeName === 'many' ? '添加动态参数' : '添加静态属性'"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClose">
      <el-form ref="form" label-width="80px">
        <el-form-item :label="activeName === 'many' ? '动态参数:' : '静态属性:'">
          <el-input v-model="addDialogForm" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParamsFn">确 定</el-button>
  </span>
    </el-dialog>
<!--    编辑对话框-->
    <el-dialog
        :title="activeName === 'many' ? '编辑动态参数' : '编辑静态属性'"
        :visible.sync="editDialogVisible"
        width="30%"
        @close="addDialogClose">
      <el-form ref="form" label-width="80px">
        <el-form-item :label="activeName === 'many' ? '动态参数:' : '静态属性:'">
          <el-input v-model="addDialogForm" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParamsFn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { addParams, editParams, getGoodsClassify, getParameterList, removeCategories } from '@/config/api'

export default {
  name: "Params",
  data () {
    return {
      selectClassificationOfGoodsId: 0,  // 选择的商品分类id
      classificationOfGoodsList: [], // 商品分类列表数据
      selectClassificationOfGoodsProps: { // 商品分类级联选择器规则
        children: 'children',
        // emitPath: true,
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_pid',
      },
      activeName: 'many', // 当前的t|ab
      btnDisabled: true, // 添加按钮的状态
      cateId: null, // 需要获取的商品分类id
      // sel: 'only', //  only 或 many 来获取分类静态参数还是动态参数
      onlyList: [], // 静态参数
      manyList: [], // 动态参数
      addDialogVisible: false, // 添加对话框
      addDialogForm: '', // 添加对话框表单
      editDialogVisible: false, // 编辑对话框
      attrId: 0, // 属性 ID
    }
  },

  methods: {
    // 获取商品列表数据
    async getGoodsClassifyFn () {
      // let loadingInstance = Loading.service(options)
      const res = await getGoodsClassify( {
        type: 3,
      } )
      // console.log( res )
      // if (res.meta.status == 200) {
      this.classificationOfGoodsList = res.data
      // loadingInstance.close();
      // this.total = res.data.total
      // }
    },

    // 获取参数列表分类
    async getParameterListFn () {
      const res = await getParameterList( this.cateId, {
        sel: this.activeName
      } )
      // console.log( res )
      this.manyList = res.data
    },

    // 选择商品分类
    async handleChange (i) {
      // console.log( i )
      // console.log(this.selectClassificationOfGoodsId)
      if (i.length < 2) {
        this.selectClassificationOfGoodsId = []
      }
      // 如果选中的是三级分类，添加按钮启用和存入id
      if (i.length === 3) {
        this.btnDisabled = false
        this.cateId = i[ i.length - 1 ]
        // console.log( this.cateId )
        // 获取参数列表分类
        this.getParameterListFn()
      } else {
        this.btnDisabled = true
        this.cateId = null
      }
    },

    //  tab 切换
    tabClick (i) {
      // console.log(i)
      console.log( this.activeName )
      this.getParameterListFn()
    },

    // 监听添加对话框关闭
    addDialogClose () {
      this.addDialogForm = ''
    },

    // 添加参数或属性
    async addParamsFn () {
      if (!this.addDialogForm) return this.$message.error('请输入内容')
      const res = await addParams(this.cateId, {
        attr_name: this.addDialogForm,
        attr_sel: this.activeName,
      })
      if (res.meta.status !== 201) return
      this.addDialogVisible = false
      this.getParameterListFn()
    },

    // 展示编辑对话框
    showEditDialog(value) {
      this.editDialogVisible = true
      // console.log(value)
      this.attrId = value.attr_id
      this.addDialogForm = value.attr_name
    },

    // 提交编辑信息
    async editParamsFn() {
      const res = await editParams(this.cateId, this.attrId, {
        attr_name: this.addDialogForm,
        attr_sel: this.activeName
      })
      if (res.meta.status !== 200) return
      this.$message.success('更改成功！')
      this.getParameterListFn()
      this.editDialogVisible = false
    },

    // 删除分类
    async deleteCategoriesFn (value) {
      // console.log( value )
      const result = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(result)
      if (result !== 'confirm') return
      const res = await removeCategories( this.cateId, value.attr_id )
      // console.log(res)
      if (res.meta.status !== 200) return
      this.$message.success('删除成功')
      this.getParameterListFn()
    }

  },

  created () {
    this.getGoodsClassifyFn()
  }

}
</script>

<style lang="less" scoped>

</style>