import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

// import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
// Vue.component(ZkTable.name, ZkTable)

import axios from 'axios'
import {Message} from "element-ui";
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
Vue.prototype.axios = axios
// axios 请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  // 请求头设置
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
// axios 响应拦截器
axios.interceptors.response.use(response => {
  // console.log(response)
  if (response.data.meta.status != 200) Message.error(response.data.meta.msg)
  return response
},error => {
  console.log(error)
  return Promise.reject(error.response)  // 返回接口错误信息
})

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
