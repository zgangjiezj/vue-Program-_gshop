<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftUL">
        <!-- current动态显示 -->
        <li class="menu-item " 
        v-for="(good,index) in goods" :key="good.name" 
        :class="{current: index === currentIndex}" 
         @click="clickItem(index)"
        >
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref="rightTop">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul >
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率1{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now" >￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <Food/>
</div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import Food from '../../components/Food/food'


  export default {
    data(){
      return{
         scrollY:0,
         tops:[],   
      }
    },
    computed: {
      ...mapState(['goods']),
      currentIndex(){
        const {scrollY,tops} = this
        const index = tops.findIndex((top,index)=> scrollY >= top && scrollY < tops[index+1])
        if(index !== this.index && this.leftBScroll){
          this.index = index
          const li = this.$refs.leftUL.children[index]
          this.leftBScroll.scrollToElement(li,300)
        }
        return index
      }
    },
    methods: {

      _initScroll(){
         this.leftBScroll = new BScroll(this.$refs.left,{
          //  配置对象
          click:true
         })
         this.rightBScroll = new BScroll(this.$refs.right,{
          //  配置对象
           click:true,
           probeType: 1
         })
         this.rightBScroll.on('scroll',({x,y})=>{
            this.scrollY = Math.abs(y)
         })
         this.rightBScroll.on('scrollEnd',({x,y})=>{
            this.scrollY = Math.abs(y)
        })

      },

      _initTop(){
        const tops  = []
        let  top = 0
         tops.push(top)
       const lis = Array.prototype.slice.call(this.$refs.rightTop.children)
       lis.forEach((li)=>{
         top += li.clientHeight
         tops.push(top)
       })
      //  更新tops
       this.tops = tops
      },

      clickItem(index){
        // 
        const top = this.tops[index]
        this.scrollY = top,
        // 让右侧列表滑动到对应位置
        this.rightBScroll.scrollTo(0,-top,300)


      },
    },
    watch: {
      goods(){
         this.$nextTick(()=>{
           this._initScroll()
           this._initTop()
         })
      }
    },
    components:{
      Food
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px

</style> 
 
