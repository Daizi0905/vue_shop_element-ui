import { getGoodsClassify, getParameterList, addGoods } from '@/config/api'
import _ from 'lodash'
const name = 'addGoods'

const data = function () {
  return {
    stepList: [{ title: '基本信息' }, { title: '商品参数' }, { title: '商品属性' }, { title: '商品图片' }, { title: '商品内容' }, { title: '完成' }], // 步骤条
    stepActive: '0', // 步骤条激活项
    addGoodsForm: {
      // 添加商品表单
      goods_name: '', // 商品名称
      goods_cat: [], // 商品分类的数组
      goods_price: 0, // 价格
      goods_number: 0, // 数量
      goods_weight: 0, // 重量
      goods_introduce: '', // 介绍
      pics: [], // 上传的图片临时路径
      goods_introduce: '', // 商品的详情描述
      attrs: [], // 商品的参数（数组），包含 `动态参数` 和 `静态属性`
    },
    goodsClassifyList: [], // 商品分类列表
    cateProps: {
      // 商品分类级联选择器
      label: 'cat_name',
      value: 'cat_id',
      children: 'children',
      expandTrigger: 'hover'
    },
    manyTableList: [], // 动态参数列表数据
    onlyTableList: [], // 静态属性列表
    uploadUrl: 'https://lianghj.top:8888/api/private/v1/upload', // 图片上传的地址
    headersObj: { Authorization: localStorage.getItem('token') }, // 图片上传的请求头
    goodsPtcUrl: '',  //' 预览图片的地址
    previewDialog: false,  // 图片预览对话框
    rules: {
      // 表单验证
      goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
      goods_price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' },
        { type: 'number', message: '商品价格必须为数字值', trigger: 'blur' }
      ],
      goods_weight: [
        { required: true, message: '请输入商品重量', trigger: 'blur' },
        { type: 'number', message: '商品重量必须为数字值', trigger: 'blur' }
      ],
      goods_number: [
        { required: true, message: '请输入商品数量', trigger: 'blur' },
        { type: 'number', message: '商品数量必须为数字值', trigger: 'blur' }
      ],
      goods_cat: [{ required: true, message: '请输入商品数量', trigger: 'blur' }]
    }
  }
}

const methods = {
  // 点击tab
  async handleClick(i) {
    // console.log(i.index);
    // 商品参数
    if (i.index == 1) {
      const res = await getParameterList(this.addGoodsForm.goods_cat[2], { sel: 'many' })
      // console.log(res)
      if (res.meta.status !== 200) return
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
      })
      this.manyTableList = res.data
      // 商品属性
    } else if (i.index == 2) {
      const res = await getParameterList(this.addGoodsForm.goods_cat[2], { sel: 'only' })
      if (res.meta.status !== 200) return
      console.log(res)
      this.onlyTableList = res.data
    }
  },

  // 获取商品分类列表
  async getGoodsClassifyFn() {
    const res = await getGoodsClassify()
    console.log(res)
    if (res.meta.status !== 200) return
    this.goodsClassifyList = res.data
  },

  // 选择商品分类列表
  handleChange(i) {
    console.log(i)
    // this.addGoodsForm.goods_cat = i.join(',')
    if (i.length !== 3) {
      this.addGoodsForm.goods_cat = []
    }
    console.log(this.addGoodsForm.goods_cat)
  },

  // 将要触发 tab 切换
  beforeTabLeave(activeName, oldActiveName) {
    // console.log(activeName, oldActiveName)
    if (this.stepActive === '0' && this.addGoodsForm.goods_cat.length == 0) {
      this.$message.error('请选择商品分类')
      return false
    }
  },

  // 处理图片预览效果
  handlePreview(file) {
    console.log(file);
    this.goodsPtcUrl = file.response.data.url
    this.previewDialog = true
  },

  // 处理移除图片的操作
  handleRemove(file) {
    // console.log(file);
    const filePath = file.response.data.tem_path
    const index = this.addGoodsForm.pics.findIndex(item => item.pic === filePath)
    this.addGoodsForm.pics.splice(index, 1)
    console.log(this.addGoodsForm);
  },

  // 图片上传成功后
  uploadSuccess(response) {
    // console.log(response)
    // this.addGoodsForm.pics =
    const picInfo = { pic: response.data.tmp_path }
    this.addGoodsForm.pics.push(picInfo)
    // console.log(this.addGoodsForm);
  },

  // 添加商品
  addGoods() {
    console.log(this.addGoodsForm);
    this.$refs.addeFormRef.validate(async valid => {
      // console.log(valid);
      if (!valid) return this.$message.error('请填写必要的商品信息！')
      // this.addGoodsForm.goods_cat = this.addGoodsForm.goods_cat.join(',')
      // console.log(this.addGoodsForm);
      // 深拷贝
      const form = JSON.parse(JSON.stringify(this.addGoodsForm))
      // const form = _.cloneDeep(this.addGoodsForm)
      form.goods_cat = this.addGoodsForm.goods_cat.join(',')
      // 处理动态参数
      this.manyTableList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(' ')
        }
        this.addGoodsForm.attrs.push(newInfo)
      })
      // 处理静态属性
      this.onlyTableList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
        form.attrs = this.addGoodsForm.attrs
        this.addGoodsForm.attrs.push(newInfo)
      })
      // console.log(form);
      const res = await addGoods(form)
      console.log(res);
      if (res.meta.status !== 201) return
      // this.$message.success('添加成功！')
      this.$router.push('/goods')
    })
    
  }
}

function created() {
  this.getGoodsClassifyFn()
}

export default {
  name,
  data,
  methods,
  created
}
