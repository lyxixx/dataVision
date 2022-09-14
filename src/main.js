import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/css/global.less'
import './assets/font/iconfont.css'
axios.defaults.baseURL ='http://127.0.0.1:8888/api/'
Vue.prototype.$http =axios   // 使用  this.$http
// 全局echarts挂载到vue原型对象上   this，$echarts
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

