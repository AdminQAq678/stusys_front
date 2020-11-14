import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import '@/assets/icon-font/iconfont.css'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL="http://www.wocnz.club:80";
axios.defaults.baseURL="http://localhost:80";
axios.interceptors.request.use(config=>{

  config.headers.token= window.sessionStorage.getItem("token");
  console.log("token",config.headers.token);
    return config
  })

  axios.interceptors.response.use(
    response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        // console.log("ok")
        return Promise.resolve(response);
      } 
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          //  case 401:
          // 
          // alert("未登录，请先登录")
          // break;
  
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          case 403:
            console.log(" 登录过期");
            alert("登录过期");
          // 清除token
            setTimeout(()=>{
              window.sessionStorage.clear();
              window.location.href="/";
            },1000)
          
         
            break;
  
          // 404请求不存在
          case 404:
            alert("访问的网页不存在")
            break;
          // 其他错误，直接抛出错误提示
          default:
            alert("请求出错")
        }
        //return Promise.reject(error.response);
      }
    }
  );





Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
