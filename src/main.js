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
  //console.log(config);
    return config
  })
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
