import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'
import TrendPage from '@/views/TrendPage.vue'

Vue.use(VueRouter)

const routes = [
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
  
  
]

const router = new VueRouter({
  routes
})

export default router
