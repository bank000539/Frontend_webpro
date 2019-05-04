import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Calandar from '@/components/Calandar'
import Booking from '@/components/Booking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
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
    }
  ]
})
