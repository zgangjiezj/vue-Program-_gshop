<template>
  <div class="footer_guide ">
      <span  class='footer_item ' @click="goto('/msite')" :class="{active:$route.path === '/msite'}">
        <span class="iconfont">&#xe622;</span>
        <span>首页</span>
      </span>
      <span  class='footer_item' @click="goto('/search')" :class="{active:$route.path === '/search'}">
        <span class="iconfont">&#xe618;</span>
        <span>搜索</span>
      </span>
      <span  class='footer_item'@click="goto('/order')" :class="{active:$route.path === '/order'}">
        <span class="iconfont">&#xe606;</span>
        <span>订单</span>
      </span>
      <span  class='footer_item' @click="goto('/profile')" :class="{active:$route.path === '/profile'}">
        <span class="iconfont">&#xe649;</span>
        <span>我的</span>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
      }
    },
    methods: {
      goto(path){
        // 方案一：没有效果==》当前的path与点击的path，不相等时才跳转
        if(this.$route.path !== path){
          this.$router.push(path);
        }
        // 方案二：刷新界面==》
        
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
    .footer_guide
      top-border-1px(#e4e4e4)
      position fixed
      left 0
      bottom 0
      width 100%
      height 50px
      background-color #fff
      display flex 
      .footer_item
         display flex
         flex-direction column 
         align-items center 
         justify-content space-around
         width 25%
         color #999999
         &.active
            color #02a774
         span
          font-size 12px
          margin-top 2px
          margin-bottom 2px
         .iconfont
          font-size 22px
</style>
