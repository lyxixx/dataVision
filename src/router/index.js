import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'
import TrendPage from '@/views/TrendPage.vue'
import MapPage from '@/views/MapPage.vue'
import RankPage from '@/views/RankPage.vue'
import HotPage from '@/views/HotPage.vue'
import StockPage from '@/views/StockPage.vue' 
import Home from '@/views/Home.vue' 
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/SellerPage',
    name: 'SellerPage',
    component: SellerPage
  },
  {
    path: '/TrendPage',
    name: 'TrendPage',
    component: TrendPage
  }, 
  {
    path: '/MapPage',
    name: 'MapPage',
    component: MapPage
  },
  {
    path: '/RankPage',
    name: 'RankPage',
    component: RankPage
  }, {
    path: '/HotPage',
    name: 'HotPage',
    component: HotPage
  },{
    path: '/StockPage',
    name: 'StockPage',
    component: StockPage
  },
  

]

const router = new VueRouter({
  routes
})

export default router
