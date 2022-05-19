import { getOrdersList, queryProgress } from '@/config/api'
import { formatTime } from '@/assets/js/utils'
import citydata from './citydata'
const name = 'orders'

const data = function () {
  return {
    ordersList: [], // 订单列表
    // 查询参数
    queryInfo: {
      query: '', // 查询参数
      pagenum: 1, // 当前页码
      pagesize: 10 // 每页显示条数
    },
    total: 0, // 数据总数
    editDialogVisible: false,  // 编辑对话框
    // 编辑表单
    editForm: {
      address1: [],
      address2: ''
    },
    progressDialogVisible: false,// 物流对话框
    progressInfo: [],  // 物流信息
    // 编辑表单验证
    editRules: {
      address1: [
        { required: true, message: '请选择省市区/县', trigger: 'blur' }
      ],
      address2: [
        { required: true, message: '请输入详细地址', trigger: 'blur' }
      ],
    },
    citydata   // 导入citydata
  }
}

const methods = {
  async getOrdersListFn() {
    const res = await getOrdersList(this.queryInfo)
    // console.log(res);
    if (res.meta.status !== 200) return
    this.ordersList = res.data.goods
    this.ordersList.forEach(item => {
      item.create_time = formatTime(new Date(item.create_time).getTime(), 'Y-M-D h:m:s')
    });
    this.total = res.data.total
  },

  // 搜索
  search() {
    // console.log('hello')
  },

  // 监听页码变化
  handleCurrentChange(i) {
    console.log(i)
    this.queryInfo.pagenum = i
    this.getOrdersListFn()
  },

  // 编辑
  showEditDialogVisible(row) {
    this.editDialogVisible = true
  },

  // 监听编辑对话框关闭
  editDialogVisibleClose() {
    this.editForm.address1 = []
    this.editForm.address2 = ''
  },

  // 展示显示物流对话框
  async showProgressDialog() {
    this.progressDialogVisible = true
    const res  = await queryProgress('1106975712662')
    console.log(res);
    if (res.meta.status !== 200) return
    this.progressInfo = res.data
  }
}

function created() {
  this.getOrdersListFn()
}

export default {
  name,
  data,
  methods,
  created
}
