/* 
对axio进行2次封装一个能发ajax请求的函数

   一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
6.loading
*/

import axios from 'axios'
import qs from 'qs'
import { Indicator,Toast,MessageBox } from 'mint-ui';
import store from '../store/store'
import router from '../router/index'

const instance = axios.create({
  // 4. 配置请求超时的时间
  timeout:20000,
  baseURL:'/api'
});

instance.interceptors.request.use(function (config) {
// 6.当需要显示加载提示框时，调用 open 方法
    Indicator.open();
//3. 对post请求参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
     // JSON: {name: 'tom', pwd: '123'} ==>urlencode: name=tom&pwd=123
  const {data} = config;
  if( data && data instanceof Object){
    config.data = qs.stringify(data);
  }
// 5. 通过请求头携带token数据
    const token  = store.state.token 
    if(token){
      config.headers['Authorization'] = token
    }else{
      const needCheck = config.headers.needCheck
      if(needCheck){
        throw new Error('没有登录，不能请求！')
      }
    }
  return config;
});

instance.interceptors.response.use(function (response) {
  Indicator.close();
  console.log(response.data)
  // 2. 异步请求成功的数据不是response, 而是response.data
  return response.data;

}, function (error) {
  // 6.loading
  Indicator.close();
  
  // 处理错误
  const response = error.response
  if(!response){
    const path = router.currentRoute.path
    if(path!== '/login'){
      router.replace('/login')
      Toast(error.message)
    }
  }else{
    if(error.response.status === 401){
      const path = router.currentRoute.path
      if(path !== '/login'){
        store.dispatch('logout')
        router.replace('/login')
        Toast(error.response.data.message || '登录失败，请重新登录！')
      }
    }else if(error.response.status === 404){
      MessageBox('提示','访问的资源不存在！')
    }else{
      MessageBox('提示','请求出错：'+error.message)
    }
  }
  // 1. 统一处理请求异常 ===>返回一个pedding状态的promise，中断promise链
  return new Promise(()=>{})
})

export default instance