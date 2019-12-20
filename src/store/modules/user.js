// 首页模块

import
 { 
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER,
 } from '../mutations_type'

import {
  reqAutoLogin, 
} from '../../api/index'

export default{
  state:{
    user:{},
    token:localStorage.getItem('token_id'),
  },
  mutations:{
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
  },
  actions:{
    // 将user/token保存到state中
    saveUser({commit},user){
      const token = user.token
      // 将token保存到localStorage
      localStorage.setItem('token_id',token)
      delete user.token 
      commit(RECEIVE_TOKEN,token)
      commit(RECEIVE_USER,user)
    },

    // 自动登录
    async autoLogin({commit,state}){
      if(state.token && !state.user._id){
        const result = await reqAutoLogin()
        if(result.code === 0){
          const user = result.data
          commit(RECEIVE_USER,user)
        }
      }
    },
    // 清除数据
    layout({commit}){
      // 清除local中的token
      localStorage.removeItem('token_id')
      // 将state中的user和token重置
      commit(RESET_TOKEN)
      commit(RESET_USER)
    },
  },
  getters:{
    
  }

}