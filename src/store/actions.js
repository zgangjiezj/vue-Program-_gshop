/*
包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码
*/

//  import {RECEIVE_ADDRESS,
//   RECEIVE_CATEGORY,
//   RECEIVE_SHOPS,
//   RECEIVE_TOKEN,
//   RECEIVE_USER,
//   RESET_TOKEN,
//   RESET_USER,
//   RECEIVE_GOODS,
//   RECEIVE_RATINGS,
//   RECEIVE_INFO,
//   ADD,
//   REMOVE
// } from './mutations_type'

//  import {
//   reqAddress,
//   reqCategory,
//   reqShops,
//   reqAutoLogin, 
//   reqGoods, 
//   reqRatings,
//   reqInfo,
// } from '../api/index'


export default{
   
  // async getAddress({commit,state}){
  //   const {latitude,longitude} = state
  //   const result = await reqAddress(latitude,longitude)
  //   if(result.code === 0){
  //     const address = result.data
  //     commit(RECEIVE_ADDRESS,address)
  //   }
  // },
  // async getCategorys({commit}){
  //   const result = await reqCategory()
  //   if(result.code === 0){
  //     const categorys = result.data
  //     commit(RECEIVE_CATEGORY,categorys)
  //   }
  // },
  // async getShops({commit,state}){
  //   const {latitude,longitude} = state
  //   const result = await reqShops({latitude,longitude})
  //   if(result.code === 0){
  //     const shops = result.data
  //     commit(RECEIVE_SHOPS,shops)
  //   }
  // },
  // // 将user/token保存到state中
  // saveUser({commit},user){
  //   const token = user.token
  //   // 将token保存到localStorage
  //   localStorage.setItem('token_id',token)
  //   delete user.token 
  //   commit(RECEIVE_TOKEN,token)
  //   commit(RECEIVE_USER,user)
  // },

  // // 自动登录
  // async autoLogin({commit,state}){
  //   if(state.token && !state.user._id){
  //     const result = await reqAutoLogin()
  //     if(result.code === 0){
  //       const user = result.data
  //       commit(RECEIVE_USER,user)
  //     }
  //   }
  // },
  // // 清除数据
  // layout({commit}){
  //   // 清除local中的token
  //   localStorage.removeItem('token_id')
  //   // 将state中的user和token重置
  //   commit(RESET_TOKEN)
  //   commit(RESET_USER)
  // },

//   // 模拟数据接口 ===》三个方法
//   async getInfo({commit},cb){
//     const result = await reqInfo()
//     if(result.code === 0){
//       const info = result.data
//       commit(RECEIVE_INFO,info)
//     }
//     typeof cb ==='function' && cb()
//   },
//   async getGoods({commit},cb){
//     const result = await reqGoods()
//     if(result.code === 0){
//       const goods = result.data
//       commit(RECEIVE_GOODS,goods)
//     }
//     typeof cb ==='function' && cb()
//   },
//   async getRating({commit},cb){
//     const result = await reqRatings()
//     if(result.code === 0){
//       const ratings = result.data
//       commit(RECEIVE_RATINGS,ratings)
//     }
//     typeof cb ==='function' && cb()
//   },

// // 添加购物车同步函数
//   AddRemove({commit},{isAdd,food}){
//     if(isAdd){
//       commit(ADD,{food})
//     }else{
//       commit(REMOVE,{food})
//     }
//   }




}