import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
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
  return response
})

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
