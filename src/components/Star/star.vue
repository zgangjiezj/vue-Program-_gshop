<template>
   <div class="star " :class="'star-'+size">
      <span class="star-item "  v-for="(star,index) in stars" :key="index" :class='star'></span>
   </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props:{
      score:Number,
      size:Number
    },
    /**
     * stars是用来存所有span中类名on，half,off的数组，根据评分score来计算star的各类图片一共有几张
     * arr是计算后返回的新数组
     * 
     * 根据评分的算法：3.2 === 3+ 0+ 2 
     * on：看整数 ==Math.floor(score)
     * half：看小数 > 0.5 ===(score*10 - scoreInt*10) >= 5
     * off:数组长一共为5，on和half不够5个，也就是arr.length < 5时，添加进去
     */
    computed: {

      stars(){
        const {score} = this
        const arr = []
      // 向arr中添加n个on（循环）
        const scoreInt = Math.floor(score)
        for (let i = 0;i <scoreInt;i++){
          arr.push('on') 
        }
      // 向arr中添加0个或者1个half
      const scoreFloat = score*10 - scoreInt*10
       if( scoreFloat >= 5){
         arr.push('half')
       }
      // 向arr中添加n个off（循环） ===》for循环： 5-arr.length
     while (arr.length<5) {
       arr.push('off')
     }
        return arr 
      }
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
      .star //2x图 3x图
        float left
        font-size 0
        .star-item
          display inline-block
          background-repeat no-repeat
        &.star-48
          .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
              margin-right: 0
            &.on
              bg-image('./images/star48_on')
            &.half
              bg-image('./images/star48_half')
            &.off
              bg-image('./images/star48_off')
        &.star-36
          .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
              margin-right 0
            &.on
              bg-image('./images/star36_on')
            &.half
              bg-image('./images/star36_half')
            &.off
              bg-image('./images/star36_off')
        &.star-24
          .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
              margin-right 0
            &.on
              bg-image('./images/star24_on')
            &.half
              bg-image('./images/star24_half')
            &.off
              bg-image('./images/star24_off')
</style>
