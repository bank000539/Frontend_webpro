import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Calandar from '@/components/Calandar'
import Booking from '@/components/Booking'
import DashBoard from '@/components/DashBoard'
import Edit from '@/components/Edit'
import Approve from '@/components/Approve'
import Checkout from '@/components/Checkout'
import EquipmentForm from '@/components/EquipmentForm'
import RoomForm from '@/components/RoomForm'
import UserForm from '@/components/UserForm'
import Register from '@/components/Register'
import Equipment from '@/components/Equipment'
import User from '@/components/User'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/calandar',
      name: 'Calandar',
      component: Calandar
    },
    {
      path: '/booking/:title/:id',
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
    },
    {
      path: '/equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/equipment/:title/:id',
      name: 'EquipmentForm',
      component: EquipmentForm
    },
    {
      path: '/room/:title/:id',
      name: 'RoomForm',
      component: RoomForm
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/user/:title/:id',
      name: 'UserForm',
      component: UserForm
    }
  ]
})
