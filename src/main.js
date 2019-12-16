import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'

import router from './router/index'
import store from './store/store'

import Header from './components/Header/Header.vue'
import Star from './components/Header/Header.vue'

Vue.config.productionTip = false

// 全局注册Header组件
Vue.component('Header',Header)
Vue.component('Star',Star)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
