// 1.
// import * as echarts from 'echarts'
import { getReports } from '@/config/api'
// import _ from 'lodash'
const name = 'reports'

const data = function () {
  return {
    options: {
      title: {
        text: '用户来源'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#E9EEF3'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ]
    }
  }
}

const methods = {
  getReportsFn() {}
}

function created() {}

// 页面的元素渲染完毕
async function mounted() {
  console.log('hello')
  // // 3. 基于准备好的dom，初始化echarts实例
  // var myChart = echarts.init(document.getElementById('main'))
  var myChart = echarts.init(document.getElementById('main'))


  // 4.  指定图表的配置项和数据

  const res = await getReports()
  console.log(res)
  if (res.meta.status !== 200) return
  // this.reportList = res.data

  const result = Object.assign( this.options, res.data)

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(result)
}

export default {
  name,
  data,
  methods,
  created,
  mounted
}
