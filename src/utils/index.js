
import Vue from 'vue'
// 保存指定商家的购物车数据到sessionStorage
// shopId_key: {foodId1: count1, foodId2: count2}

export function saveCartFood(shopId,cartFoods) {
  //  得到对象{foodId1: count1, foodId2: count2}
  const CartCount = cartFoods.reduce((pre,food)=>{
    pre[food.id] = food.count 
     return pre 
  },{})
  // 将对象保存到sessionStrage

  sessionStorage.setItem(shopId+'_key',JSON.stringify(CartCount))
}

// 读取sessionStorage中的cartCounts, 生成并返回一个cartFoods 
export function getCartFood(shop) {
   const cartFoods = []
// 读取
   const cartCounts = JSON.parse(sessionStorage.getItem(shop.id+'_key')) || {}
// 生成
   shop.goods.forEach((good)=>{
      good.foods.forEach((food)=>{
         const count = cartCounts[food.id] 
         if(count >0){
           Vue.set(food,'count',count)
           cartFoods.push(food)
         }
      })
   })
// 返回
   return cartFoods  
}

