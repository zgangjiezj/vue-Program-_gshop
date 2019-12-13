import Vue from 'vue'
import VueRouter from 'vue-router'
import Miste from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
      mode: 'history',
      routes: [
          {
            path: '/miste',
            component: Miste
          },
          {
            path: '/order',
            component: Order
          },
          {
            path: '/profile',
            component: Profile
          },
          {
            path: '/search',
            component: Search
          },

          // {
          //   path: '/home', // path最左边的/代表项目根路径
          //   component: Home,
          //   children: [ // 注册子路由
          //     {
          //         path: '/home/news',
          //         component: News
          //     },
          //   ]
          // },
          // 自动重定向的路由
          {
            path: '/',
            redirect: '/mister'
          }
        ]  
      })