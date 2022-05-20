import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
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
// Vue.use(axios)
Vue.prototype.axios = axios
Vue.use(NProgress)
Vue.use(echarts)
Vue.use(_)

Vue.use(ZkTable)
// Vue.component(ZkTable.name, ZkTable)

Vue.use(VueQuillEditor)



Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
