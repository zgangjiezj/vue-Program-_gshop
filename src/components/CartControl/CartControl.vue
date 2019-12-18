<template>
 <div class="cartcontrol">
   <!-- 数量和+号，在选的情况下才存在 -->
  <div class="iconfont icon-remove_circle_outline"></div>
  <div class="cart-count">1</div>
  <div class="iconfont icon-add_circle"></div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    //  更新数据后界面不变:新添加的属性，没有数据绑定==》count的问题
    //  food在goods中，数据goods在哪，更新goods的方法就在哪 ==》goods在vuex中，因此要定义在actions中，vuex的一套
    // throttle:实现节流,节流函数只产生一个，回调函数里的this
  
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
 
</style>
