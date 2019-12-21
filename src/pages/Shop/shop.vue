<template>
  <div>
      <ShopHeader></ShopHeader>
      <div class='tab'>
        <div class="tab-item">
          <router-link :to="`/shop/${id}/goods`" replace>点餐2</router-link>
        </div>
          <div class="tab-item">
          <router-link :to="`/shop/${id}/rating`" replace>评价</router-link>
        </div>
          <div class="tab-item">
          <router-link :to="`/shop/${id}/info`" replace>商家</router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopHeader from '../../components/shopHeader/shopHeader'
import {mapState} from 'vuex'
import {saveCartFood} from '../../utils/index'

  export default {
    name :'Shop',
    
    props:['id'],
    computed: {
      ...mapState({
        shop: state =>state.shop
      })
    },

    mounted() {
      
      // this.$store.dispatch('getInfo')
      // this.$store.dispatch('getGoods')
      // this.$store.dispatch('getRating')
      const id = this.id
      this.$store.dispatch('getShop',id)

      window.addEventListener('unload',function () {
          const shopId = this.shop.shop.id
          const cartFoods =  this.shop.cartFoods
          saveCartFood(shopId,cartFoods)
      })
    },

    beforeDestroy() {
      const shopId = this.shop.shop.id
      const cartFoods = this.shop.cartFoods
      console.log('-----')
      saveCartFood(shopId,cartFoods)
    },
    components:{
      ShopHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
 
</style>
