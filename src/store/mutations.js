/**
包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码
*/

import
 {RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER
  } from './mutations_type'

export default{
   [RECEIVE_ADDRESS](state,address){
     state.address = address
      },
      [RECEIVE_CATEGORY](state,categorys){
        state.categorys = categorys
      },
      [RECEIVE_SHOPS](state,shops){
        state.shops = shops   
    },
      [RECEIVE_TOKEN](state,token){
        state.token = token   
      },
      [RECEIVE_USER](state,user){
        state.user = user   
    },
    [RESET_TOKEN](state){
      state.token = ''   
    },
    [RESET_USER](state){
      state.user = {}   
    },

}