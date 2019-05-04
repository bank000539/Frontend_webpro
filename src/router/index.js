import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Calandar from '@/components/Calandar'
import Booking from '@/components/Booking'
import DashBoard from '@/components/DashBoard'
import Edit from '@/components/Edit'
import Approve from '@/components/Approve'
import Checkout from '@/components/Checkout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/calandar',
      name: 'Calandar',
      component: Calandar
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/dashboard/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/dashboard/approve',
      name: 'Approve',
      component: Approve
    },
    {
      path: '/dashboard/checkout',
      name: 'Checkout',
      component: Checkout
    }
  ]
})
