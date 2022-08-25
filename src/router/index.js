import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/LoginView')
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {path: '/5-2', component: () => import('@/components/ValuableList')},
            {path: '/5-3', component: () => import('@/components/VisitingEnterprises')},
            {path: '/101', component: () => import('@/components/TestTable')},
            {path: '/102', component: () => import('@/components/TestSelect')}
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
