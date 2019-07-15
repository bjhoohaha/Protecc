import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import NewPacket from '@/components/NewPacket'
import PacketStats from '@/components/PacketStats'
import ViewPacket from '@/components/ViewPacket'

Vue.use(Router)

export default new Router({
  routes: [
    // test route
    // {
    //   path: '/HelloWorld',
    //   name: 'hello-world',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
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
      component: PacketStats
    },
    // route to view more packet information
    {
      path: '/view/:id',
      name: 'view-packet',
      component: ViewPacket,
      props: true
    }
  ],
  mode: 'history'
})
