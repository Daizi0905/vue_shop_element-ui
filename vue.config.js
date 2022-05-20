const { defineConfig } = require('@vue/cli-service')
// const { config } = require('vue/types/umd')
module.exports = defineConfig({
  transpileDependencies: true,

  // 发布模式
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor',
        jquery: '$'
      })

      config.plugin('html').tap((args) => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main.js')

      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
  }
})
