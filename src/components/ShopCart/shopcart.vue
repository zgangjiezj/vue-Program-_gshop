<template>
<!-- 底部购物车-->
<!-- 数据：根据goods显示 -->
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleShow">
        <div class="logo-wrapper">
          <div class="logo"  :class="{hightlight:totalCount>0}">
            <i class="iconfont icon-shopping_cart " :class="{hightlight:totalCount>0}"></i>
          </div>
            <!-- 总数量不是必须显示 ：就是上面的数字-->
          <div class="num" v-if="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price " :class="{hightlight:totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click="toggleShow">
        <div class="pay " :class="payClass">
          {{payText}}
        </div>
      </div>
    </div>
    <transition name='move'>
       <div class="shopcart-list" v-show="ShopcartListShow">
         <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearShopcart">清空</span>
        </div>
      <div class="list-content" ref="food">
        <ul >
          <li class="food" v-for="(food,index) in cartFoods" :key="food.name">
            <span class="name">{{food.name}}</span>
            <div class="price"><span>￥{{food.price}}</span></div>
            <div class="cartcontrol-wrapper">
              <div class="cartcontrol">

                 <CartControl :food='food'/>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
   <transition name='fade'>
       <div class="list-mask" v-show="ShopcartListShow" @click="toggleShow"></div>
   </transition>
</div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import {MessageBox} from 'mint-ui'
import {CLEAR_SHOPCART} from '../../store/mutations_type'
  export default {
    // 购物车列表：涉及到的数据==》foods，count，因此用到goods ===》1、getters里双层遍历，编码简单，效率低
          // 2、state 里定义空的购物车数组，手动控制  ==》mutation的方法中：count从0变1，count=1添加到购物车数组中；count从1变0，count=0,将food从购物车数组中移除，下标用indexOf求  
          // 3、组件中直接mapState读取 
    // 购物车中总数量/总价格:计算属性==》数组累加： reduce（遍历统计的同步回调函数(preTotal,food)=>preTotal+food.count，统计的初始值0）
          // 1、计算属性：总数量：累加购物车数组的count， ； 总价格：累加购物车数组中每一件商品的价格，累加 
          //  2、组件中模板中使用
    //起步价与配送费用：在info里，从vuex中取出，数据动态显示
    // 总数量> 0，动态显示类名，产生高亮效果
    //结算的位置：有三种文本：￥20元起送，还差￥10元起送，去结算，对应三种类名三种样式的变化；三种文本变化与总价格和起步价有关
    //          依赖数据都是：totalPrice，minPrice
    //         1）动态类名，显示样式==》比较二者大小，确定类名--》三元表达式
    //         2）动态文本：比较二者大小，显示数值
    // 遍历购物车数组动态显示列表，列表的显示与隐藏：绑定事件，只有当购物车列表中总数量>0,才改变状态 且添加过渡（move-enter-active,move-leave-active;move-enter,move-leave-to）
        // 
          //  class= content-left：绑定监听，开
          //  class=content-right：绑定监听,关
          //  class="list-mask" ：绑定监听,关

    // bug：购物车列表里内容清空了，还在显示框 ==》isShow和listShow双重控制同为true和false，设置计算属性listShow：当总数量=0,隐藏
    //      购物车列表可以滑动：isShow为true时，创建scroll对象
    //      多次点击购物车，点击添加选项，创建了多个scroll对象==》应用单例模式：只有当不存在此对象时才创建，创建对象后保存对象
    //      购物车出现，再让其隐藏，再打开，滑动的样式没了--》原因是用了v-if来控制显示隐藏，把样式隐藏，但是此时scroll对象已经创建，而且做了控制只创建一次，所以再打开时样式已经没有了
    // 购物车的清空功能：用mintUI的MesageBox==》清空：更新state中的购物车数组的数据（vuex来清空--》遍历购物车数组，将count变为0;再重置购物车数组）
    // 刷新保持购物项：

// 面试：v-if，v-show什么场景用？何时用？联系实际用，什么效果用到了，怎么解决了
  data(){
    return {
      isShow :false
    }
  },

// 计算属性必须要有return
computed: {
    ...mapState({
      cartFoods : state=>state.shop.cartFoods,
      info: state=>state.shop.shop.info || {}
    }),
    ...mapGetters(['totalCount','totalPrice']),
    // 
    payText(){
      let {totalPrice} = this
      let {minPrice} = this.info
      if( totalPrice ===0 ){
        return `￥${minPrice}元起送`
      }else if(totalPrice < minPrice){
        const chazhi = minPrice - totalPrice
        return `还差￥${chazhi}元起送`
      }else{
         return '去结算'
      }
    },
    payClass(){
      let {totalPrice} = this
      let {minPrice} = this.info
      return totalPrice - minPrice >= 0 ? 'enough' :'not-enouch'
    },
    ShopcartListShow(){
      // 购物车内容清空，不显示列表
       if(this.totalCount === 0){
         this.isShow = false
       }
      // 滑动:购物车列表里有内容
      if(this.isShow){
        this.$nextTick(()=>{
           if(!this.scroll){
             this.scroll = new BScroll(this.$refs.food,{
              click:true
           })
          }else{
            this.scroll.refresh()
       }
        })          
      }
       return this.isShow
    }, 
  },
  methods: {
    toggleShow(){
      if(this.totalCount >0){
        this.isShow = ! this.isShow
      }
    },
    clearShopcart(){
      MessageBox.confirm('确定要清空吗?').then(
        () => {
          // 将购物车数组清空 ==》存在vuex中，vuex自己清空
          this.$store.commit(CLEAR_SHOPCART)

      });
      
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all 1s
      &.move-enter, &.move-leave-to
        opacity 0  
        transform  translateY(0) 
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
 
</style>
