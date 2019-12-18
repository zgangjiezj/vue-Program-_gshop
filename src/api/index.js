/**
 * 包含n个接口请求函数的模块===》每次发请求只调用它,实际上调用的是ajax.js
 * 
 */

//   问题1：/index_category ===》写这样的地址，请求的是当前前台应用的地址 8080，没有对应的而资源返回

 import ajax from './ajax.js'

//  export const baseURL= '/api',

// 1、根据经纬度获取位置详情 ==params参数，自己手动传
export const reqAddress = (latitude,longitude) =>ajax.get(`/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqCategory = () =>ajax('/index_category',{
  // token验证
  headers:{
     needCheck:true
  }
})

// 3、根据经纬度获取商铺列表 ===>接收多个数据可以用对象解构赋值传参
export const reqShops = ({latitude,longitude}) =>ajax('/shops',{
  params:{latitude,longitude},
   // token验证
  headers:{
    needCheck:true
 }
})

// 4、发送短信验证码
export const reqCode = (phone) =>ajax.get('/sendcode',{params:{phone}})

// 5、手机号验证码登陆
export const reqSmsLogin = ({phone,code}) =>ajax.post('/login_sms',{phone,code})

// 6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) =>ajax.post('/login_pwd',{name,pwd,captcha})

// 7、自动登陆
export const reqAutoLogin = () =>ajax.get('/auto_login')

// 8、发请求===》mock数据
export const reqInfo = () =>ajax('/info')
export const reqRatings = () =>ajax('/ratings')
export const reqGoods = () =>ajax('/goods')