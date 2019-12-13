/* 
对axio进行2次封装一个能发ajax请求的函数

   一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
  // 4. 配置请求超时的时间
  timeout:20000,
  baseURL:'/api'
});

instance.interceptors.request.use(function (config) {
//3. 对post请求参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
     // JSON: {name: 'tom', pwd: '123'} ==>urlencode: name=tom&pwd=123
  const {methods,data} = config;
  if( data && data instanceof Object){
    config.data = qs.stringify(data);
  }
  return config;
});

instance.interceptors.response.use(function (response) {
  console.log(response.data)
  // 2. 异步请求成功的数据不是response, 而是response.data
  return response.data;

}, function (error) {
  alert(error.message)
  // 1. 统一处理请求异常 ===>返回一个pedding状态的promise，中断promise链
  return new Promise(()=>{})
})

export default instance