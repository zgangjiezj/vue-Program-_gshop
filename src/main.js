import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'

import router from './router/index'
import store from './store/store'

import Header from './components/Header/Header.vue'
import Star from './components/Header/Header.vue'
import * as API from './api'
import i18n from './i18n'


// 将API挂载到原型对象上
Vue.property.$API = API

Vue.config.productionTip = false

// 全局注册Header组件
Vue.component('Header',Header)
Vue.component('Star',Star)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
