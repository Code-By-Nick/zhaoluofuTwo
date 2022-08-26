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
        component: () => import(/* webpackChunkName: "about" */ '@/views/LoginView'),
        meta:{
            title:'登录'
        }
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



router.beforeEach((to, from, next) =>{  //beforeEach是router的钩子函数，在进入路由前执行
    /*路由发生变化改变页面title*/
    if( to.meta.title ){    //判断是否有标题
        document.title = to.meta.title
    }
    next()  //执行进入路由，如果不写就不会进入目标页
})



export default router
