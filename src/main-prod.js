import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'

// test
import axios from 'axios'
// 导入NProgress对应的文件，加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as echarts from 'echarts'
import _ from 'lodash'


// import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


// test
Vue.prototype.axios = axios
Vue.use(NProgress)
Vue.use(echarts)
Vue.use(_)


Vue.use(ZkTable)
// Vue.component(ZkTable.name, ZkTable)

Vue.use(VueQuillEditor)


// import {Message} from "element-ui";
// axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// Vue.prototype.axios = axios
// // axios 请求拦截器
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   // 请求头设置
//   config.headers.Authorization = localStorage.getItem('token')
//   return config
// })
// // axios 响应拦截器
// axios.interceptors.response.use(response => {
//   // console.log(response)
//   if (response.data.meta.status != 200) Message.error(response.data.meta.msg)
//   return response
// },error => {
//   console.log(error)
//   return Promise.reject(error.response)  // 返回接口错误信息
// })

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
