const name = 'addGoods'

const data = function () {
  return {
    stepList: [{ title: '基本信息' }, { title: '商品参数' }, { title: '商品属性' }, { title: '商品图片' }, { title: '商品内容' }, { title: '完成' }], // 步骤条
    stepActive: 0, // 步骤条激活项
  }
}

const methods = {}

function created() {}

export default {
  name,
  data,
  methods,
  created
}
