/*
包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码
*/

 import {RECEIVE_ADDRESS,RECEIVE_CATEGORY,RECEIVE_SHOPS} from './mutations_type'
 import {reqAddress,reqCategory,reqShops} from '../api/index'

export default{
   
  async getAddress({commit,state}){
    const {latitude,longitude} = state
    const result = await reqAddress(latitude,longitude)
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  async getCategorys({commit,state}){
    const result = await reqCategory()
    if(result.code === 0){
      const {categorys} = state
      commit(RECEIVE_CATEGORY,categorys)
    }
  },
  async getShops({commit,state}){
    const {latitude,longitude} = state
    const result = await reqShops({latitude,longitude})
    if(result.code === 0){
      const {shops} = result.data
      commit(RECEIVE_ADDRESS,shops)
    }
  },
}