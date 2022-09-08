import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/SellerPage',
    name: 'SellerPage',
    component: SellerPage
  },
  
]

const router = new VueRouter({
  routes
})

export default router
