<template>
  <div>
    <!--  面包屑-->
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon> </el-alert>
      <div style="margin: 15px 0">
        <span>选择商品分类：</span>
        <el-cascader v-model="selectClassificationOfGoodsId" :options="classificationOfGoodsList" :props="selectClassificationOfGoodsProps" @change="handleChange"> </el-cascader>
      </div>
      <!--      tab-->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <!--        添加动态参数-->
        <el-tab-pane label="动态参数" name="many"> </el-tab-pane>
        <!--        添加静态属性-->
        <el-tab-pane label="静态属性" name="only"> </el-tab-pane>
        <div>
          <el-button type="primary" :disabled="btnDisabled" @click="addDialogVisible = true">
            {{ activeName === 'many' ? '添加参数' : '添加属性' }}
          </el-button>
        </div>
        <el-table :data="manyList" style="width: 100%">
          <el-table-column type="expand">
            <!-- 展开行 -->
            <template #default="scope">
              <el-tag closable v-for="(item, index) in scope.row.attr_vals" :key="index" @close="handleClose(index, scope.row)">{{ item }}</el-tag>
            <!-- 添加tag -->
            <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model.trim="scope.row.tagInput" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"> </el-input>
              <el-button v-else class="button-new-tag" size="small" @click.native="showInput(scope.row)">+ New Tag</el-button>
            </template>
          </el-table-column>

          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCategoriesFn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tabs>
    </el-card>
    <!--    添加对话框-->
    <el-dialog :title="activeName === 'many' ? '添加动态参数' : '添加静态属性'" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose">
      <el-form ref="form" label-width="80px">
        <el-form-item :label="activeName === 'many' ? '动态参数:' : '静态属性:'">
          <el-input v-model="addDialogForm" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParamsFn">确 定</el-button>
      </span>
    </el-dialog>
    <!--    编辑对话框-->
    <el-dialog :title="activeName === 'many' ? '编辑动态参数' : '编辑静态属性'" :visible.sync="editDialogVisible" width="30%" @close="addDialogClose">
      <el-form ref="form" label-width="80px">
        <el-form-item :label="activeName === 'many' ? '动态参数:' : '静态属性:'">
          <el-input v-model="addDialogForm" style="width: 100%"></el-input>
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
import { addParams, editParams, getGoodsClassify, getParameterList, removeCategories, editSubmitParams } from '@/config/api'

export default {
  name: 'Params',
  data() {
    return {
      selectClassificationOfGoodsId: 0, // 选择的商品分类id
      classificationOfGoodsList: [], // 商品分类列表数据
      selectClassificationOfGoodsProps: {
        // 商品分类级联选择器规则
        children: 'children',
        // emitPath: true,
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
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
      attrId: 0 // 属性 ID
      // inputVisible: false, // tag 标签的切换
      // tagInput: '', // tag 添加输入框
    }
  },

  methods: {
    // 获取商品列表数据
    async getGoodsClassifyFn() {
      // let loadingInstance = Loading.service(options)
      const res = await getGoodsClassify({
        type: 3
      })
      // console.log( res )
      // if (res.meta.status == 200) {
      this.classificationOfGoodsList = res.data
      // loadingInstance.close();
      // this.total = res.data.total
      // }
    },

    // 获取参数列表分类
    async getParameterListFn() {
      const res = await getParameterList(this.cateId, {
        sel: this.activeName
      })
      console.log(res)

      // 获取
      res.data.forEach((item) => {
        item.inputVisible = false
        item.tagInput = ''
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
      })
      this.manyList = res.data
    },

    // 选择商品分类
    async handleChange(i) {
      // console.log( i )
      // console.log(this.selectClassificationOfGoodsId)
      if (i.length < 2) {
        this.selectClassificationOfGoodsId = []
        
      }
      // 如果选中的是三级分类，添加按钮启用和存入id
      if (i.length === 3) {
        this.btnDisabled = false
        this.cateId = i[i.length - 1]
        // console.log( this.cateId )
        // 获取参数列表分类
        this.getParameterListFn()
      } else {
        this.btnDisabled = true
        this.cateId = null
        this.manyList = []
      }
    },

    //  tab 切换
    tabClick(i) {
      // console.log(i)
      console.log(this.activeName)
      this.getParameterListFn()
    },

    // 监听添加对话框关闭
    addDialogClose() {
      this.addDialogForm = ''
    },

    // 添加参数或属性
    async addParamsFn() {
      if (!this.addDialogForm) return this.$message.error('请输入内容')
      const res = await addParams(this.cateId, {
        attr_name: this.addDialogForm,
        attr_sel: this.activeName
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
    async deleteCategoriesFn(value) {
      // console.log( value )
      const result = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      console.log(result)
      if (result !== 'confirm') return
      const res = await removeCategories(this.cateId, value.attr_id)
      // console.log(res)
      if (res.meta.status !== 200) return
      this.$message.success('删除成功')
      this.getParameterListFn()
    },

    // 发送编辑参数数据请求
    async editSubmitParamsFn(attrId, attrName, attrVals) {
      const res = await editSubmitParams(this.cateId, attrId, {
        attr_name: attrName,
        attr_sel: this.activeName,
        attr_vals: attrVals.join(' ')
      })
      console.log(res);
    },

    // tag 输入框失去焦点 或者按下 enther
     handleInputConfirm(row) {
      // 如果输入的内容为空，则直接清空并返回
      if(row.tagInput.trim().length === 0) {
      row.inputVisible = false
      row.tagInput = ''
      return
      }
      // 添加tag标签
      row.attr_vals.push(row.tagInput)
      row.inputVisible = false
      row.tagInput = ''
      // 发送编辑参数数据请求
      this.editSubmitParamsFn(row.attr_id, row.attr_name, row.attr_vals)
      // this.getParameterListFn()
    },


    // tag 切换到 input
    showInput(row) {
      // row.inputVisible = true
      row.inputVisible = true
      console.log(row)
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 关闭 tag， 删除参数
    handleClose(i, row) {
      console.log(i, row);
      row.attr_vals.splice(i, 1)
      this.editSubmitParamsFn(row.attr_id, row.attr_name, row.attr_vals)
    }
  },

  created() {
    this.getGoodsClassifyFn()
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 0 10px;
}
.input-new-tag {
  width: 120px;
}
</style>
