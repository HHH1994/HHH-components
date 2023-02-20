const path = require('path');
module.exports = {
    publicPath:'./',
    outputDir:'dist',
    lintOnSave:false, // 关闭eslint检查
    // webpack配置
    chainWebpack : config =>{},
    configureWebpack:{
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        }
    },
    // vueloader配置
    productionSourceMap:false,
    // css相关配置
    css:{
        loaderOptions:  {
            sass: {
                prependData: '@import "@/assets/scss/base.scss";',
            }
        }
    },
    // webpack-dev-server相关配置
    devServer:{
        open:true,
        host:'localhost',
        port:8888,
        https:false,
        hot:true
    }
}