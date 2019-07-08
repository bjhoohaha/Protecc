import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewPacket from '@/components/NewPacket'
import PacketStats from '@/components/PacketStats'
import ViewPacket from '@/components/ViewPacket'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/new',
            name: 'new-packet',
            component: NewPacket
        },
        {
            path: '/stats',
            name: 'packet-stats',
            component: PacketStats
        },
        {
            path: '/view/:number',
            name: 'view-packet',
            component: ViewPacket
        }

    ]
})