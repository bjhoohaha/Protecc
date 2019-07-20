import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import NewPacket from '@/components/NewPacket'
import PacketStats from '@/components/PacketStats'
import ViewPacket from '@/components/ViewPacket'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import { FirebaseInit } from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // test route
    {
      path: '/HelloWorld',
      name: 'hello-world',
      component: HelloWorld
    },
    // both path / and /home will reach dashboard
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      alias: '/home',
      meta: {
        requiresAuth: true
      }
    },
    // route to start and stop new packets
    {
      path: '/new',
      name: 'new-packet',
      component: NewPacket
    },
    // route to collect stats and data analytics
    {
      path: '/stats',
      name: 'packet-stats',
      component: PacketStats,
      meta: {
        requiresAuth: true
      }
    },
    // route to view more packet information
    {
      path: '/view/:id',
      name: 'view-packet',
      component: ViewPacket,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    }
  ]
})

const auth = FirebaseInit.auth

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // console.log(requiresAuth)
  // console.log(currentUser)
  // console.log(!!currentUser)
  // next()
  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
