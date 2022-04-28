import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        //异步路由
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/home/Home')
    },
    {
        path: '/cartList',
        name: 'CartList',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/cartList/CartList')
    },
    {
        path: '/shop/:id',
        name: 'Shop',
        component: () =>
            import ( /* webpackChunkName: "shop" */ '../views/shop/Shop')
    },
    {
        path: '/orderConfirmation/:id',
        name: 'OrderConfirmation',
        component: () =>
            import ( /* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
    },
    {
        path: '/orderList',
        name: 'OrderList',
        component: () =>
            import ( /* webpackChunkName: "OrderList" */ '../views/orderList/OrderList')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/register/Register'),
        beforeEnter(to, from, next) {
            //路由校验 如果登录了就不能转换到登录页面
            const { isLogin } = localStorage;
            isLogin ? next({ name: 'Home' }) : next();
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/login/Login'),
        beforeEnter(to, from, next) {
            //路由校验 如果登录了就不能转换到登录页面
            const { isLogin } = localStorage;
            isLogin ? next({ name: 'Home' }) : next();
        }
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     route level code-splitting
    //     this generates a separate chunk (about.[hash].js) for this route
    //     which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const { isLogin } = localStorage;
    const { name } = to;
    const isLoginOrRegister = (name === "Login" || name === "Register");
    (isLogin || isLoginOrRegister) ? next(): next({ name: 'Login' });
})
export default router