import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

// 动态引入：
const Msite = () =>import( '../pages/Msite/Msite.vue')
const Order = () =>import( '../pages/Order/Order')
const Profile = () =>import( '../pages/Profile/Profile.vue')
const Search = () =>import( '../pages/Search/Search.vue')


import Login from '../pages/Login/login.vue'
import Shop from '../pages/Shop/shop.vue'
import Goods from '../pages/Shop/goods.vue'
import Rating from '../pages/Shop/rating.vue'
import Info from '../pages/Shop/info.vue'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
      mode: 'history',
      routes: [
          {
            path: '/msite',
            // 简化写法，直接把函数写在里面
            component:  () =>import( '../pages/Msite/Msite.vue'),
            meta:{
              isShowFooter:true,
            }
          },
          {
            path: '/order',
            component: Order,
            meta:{
              isShowFooter:true,
            }
          },
          {
            path: '/profile',
            component: Profile,
            meta:{
              isShowFooter:true,
            }
          },
          {
            path: '/search',
            component: Search,
            meta:{
              isShowFooter:true,
            }
          },
          {
            path: '/login',
            component: Login
          },
          {
            path: '/shop/:id',
            props:true,
            component: Shop,
        //默认路径以/shop开始
            children:[
              {
                path:'goods',
                component:Goods
              },
              {
                path:'ratings',
                component:Rating
              },
              {
                path:'info',
                component:Info
              },
              {
                path:'',
               redirect:'goods'
              },
            ]
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
            redirect: '/msite'
          }
        ]  
      })