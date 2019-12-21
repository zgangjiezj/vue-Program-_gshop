/* 
使用mockjs提供mock接口数据
*/
import Mock from 'mockjs'
import data from './data.json'
// import shop from '../store/modules/shop.js'
import shops from './shops.json'

// Mock.mock('/api/goods',{code:0,data:data.goods})
// Mock.mock('/api/ratings',{code:0,data:data.ratings})
// Mock.mock('/api/info',{code:0,data:data.info})

// 根据请求id参数返回对应的商家数据
Mock.mock(/^\/api\/shop\/\d+$/,function (options) {
  // 得到id
  const id = options.url.substring(10);
  // 根据id，获取shop
  const shop= shops.find(shop=>shop.id == id)
  // 返回一个动态的数据
  return Mock.mock({code:0,data:shop || shops[0]})

})