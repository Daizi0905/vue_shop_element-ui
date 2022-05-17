import { getGoodsList, deleteGoods } from "@/config/api"
import { formatTime } from "@/assets/js/utils"
const name = 'goods_list'

const data = function() {
  return {
    goodsList: [], // 商品列表数据
    goodsListTotal: 0, // 商品列表总数
    goodsParams: {
      query: '', // 搜索商品输入框
      pagenum: 1, // 当前页码数
      pagesize: 10 // 每页显示条数
    }
  }
}

const methods = {
  // 获取商品列表数据
  async getGoodsListFn() {
    const res = await getGoodsList(this.goodsParams)
    console.log(res);
    if (res.meta.status !== 200) return
    res.data.goods.forEach(item => {
      // console.log(new Date(item.add_time));

      item.add_time = formatTime(new Date(item.add_time).getTime(), 'Y-M-D h:m:s')
    });

    // var time = new Date(res.data.goods[0].add_time)
    // console.log(time);//当前时间
		// 	console.log(time.getFullYear()+"年");//年份
		// 	console.log(time.getMonth()+1+"月");//月份
		// 	console.log(time.getDate()+"日");//几号
		// 	console.log("周"+time.getDay());//星期几

    this.goodsList = res.data.goods
    this.goodsListTotal = res.data.total
  },

  // 改变页码
  handleCurrentChange(i) {
    console.log(i);
    this.goodsParams.pagenum = i
    this.getGoodsListFn()
  },

  // 删除商品
  async deleteGoodsFn(id) {
    const result = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(err => err)
    // console.log(result);
    if (result === 'confirm') {
      const res = await deleteGoods(id)
      console.log(res);
      if (res.meta.status !== 200) return
      this.$message.success('删除成功！')
      this.getGoodsListFn()
    }
  },

  // 前往添加商品
  goAddGoods() {
    this.$router.push('addGoods')
  }
}

function created() {
  this.getGoodsListFn()
}

export default {
  name,
  data,
  methods,
  created
}