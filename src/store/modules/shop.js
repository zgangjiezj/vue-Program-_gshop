// 首页模块

import
 { 
  // RECEIVE_GOODS,
  // RECEIVE_RATINGS,
  // RECEIVE_INFO,
  RECEIVE_SHOP, 
  RESET_SHOP,
  ADD,
  REMOVE,
  CLEAR_SHOPCART,
 } from '../mutations_type'

import {
  // reqGoods, 
  // reqRatings,
  // reqInfo,
  reqShop,
} from '../../api/index'
import {getCartFood} from '../../utils/index'

 import Vue from 'vue'

export default{
  state:{
    // goods:{},
    // info:[],
    // ratings:[],
    shop:{}, //shop是一个对象，包含id，goods，info，ratings;shops是一个数组
    cartFoods:[],
  },
  mutations:{
     //模拟数据
  //  [RECEIVE_INFO](state,info){
  //     state.info = info   
  //   },
  //    [RECEIVE_GOODS](state,goods){
  //     state.goods = goods  
  //   },
  //   [RECEIVE_RATINGS](state,ratings){
  //     state.ratings = ratings   
  //   },
    // [RECEIVE_SHOP](state,{shop = {},cartFoods =[]}){
    //     state.shop = shop
    //     state.cartFoods = cartFoods
    //  },
     [RECEIVE_SHOP](state,{shop,cartFoods}){
      state.shop = shop
      state.cartFoods = cartFoods
     },
     [RESET_SHOP](state){
        state.shop = {}  
        state.cartFoods = []  
    },
    // 添加按钮：+号
    [ADD](state,{food}){
      if(food.count){
        food.count++    
      }else{
        // 给响应式对象添加一个响应式属性 
        Vue.set(food,'count',1)
        state.cartFoods.push(food)
      }
    },
    // 移除按钮 ： -号
    [REMOVE](state,{food}){
      if(food.count >0){
        food.count--
        if(food.count === 0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
    },
    // 清空购物车列表
    [CLEAR_SHOPCART](state){
      state.cartFoods.forEach((food) => {
         return food.count = 0
      });
      state.cartFoods = []
    }
  },
  actions:{
     // 模拟数据接口 ===》三个方法
    // async getInfo({commit},cb){
    //   const result = await reqInfo()
    //   if(result.code === 0){
    //     const info = result.data
    //     commit(RECEIVE_INFO,info)
    //   }
    //   typeof cb ==='function' && cb()
    // },
    // async getGoods({commit},cb){
    //   const result = await reqGoods()
    //   if(result.code === 0){
    //     const goods = result.data
    //     commit(RECEIVE_GOODS,goods)
    //   }
    //   typeof cb ==='function' && cb()
    // },
    // async getRating({commit},cb){
    //   const result = await reqRatings()
    //   if(result.code === 0){
    //     const ratings = result.data
    //     commit(RECEIVE_RATINGS,ratings)
    //   }
    //   typeof cb ==='function' && cb()
    // },
    async getShop({commit,state},id){
      if(id == state.shop.id){
        return
      }
      if(state.shop.id){
        commit(RESET_SHOP)

        // commit(RECEIVE_SHOP,{})
      }
      const result = await reqShop(id)
      if(result.code === 0){
        const shop  = result.data 
        // 读取sessionStorage
        const cartFoods =  getCartFood(shop)
        commit(RECEIVE_SHOP,{shop,cartFoods})
      }
    },

  // 添加购物车同步函数
    AddRemove({commit},{isAdd,food}){
      if(isAdd){
        commit(ADD,{food})
      }else{
        commit(REMOVE,{food})
      }
    }
  },
  getters:{
    totalCount(state){
      return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)    
    },
    totalPrice(state){
      return  state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price ,0)
    }
  }

}