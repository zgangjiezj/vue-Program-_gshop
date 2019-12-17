<template>
    <div>
      <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqAddress} from './api/index'
  export default {

     //发请求,返回数据
        // async mounted() {
        //   // const result = await reqAddress(116.36867,40.10038)  
        // },
    mounted() {
      this.$store.dispatch('getAddress') //获取地址
      this.$store.dispatch('autoLogin')  //自动登录
    },
  
    components:{   
      FooterGuide
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
