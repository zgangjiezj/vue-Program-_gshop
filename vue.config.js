const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
  remUnit: 37.5   //设计稿等分之后的值，等分的比例同页面rem的比例是一致的（设计稿10等分，页面也要10等分）==》结果是：设计稿中量多少px，style中写多少px
})
module.exports = {
  runtimeCompiler: true,
  lintOnSave: false, 
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
},
}