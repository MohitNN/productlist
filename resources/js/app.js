window.Vue = require('vue').default;
Vue.use(require('vue-moment'));
import vueDebounce from 'vue-debounce'
import Vue from "vue";
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Login from "./components/auth/login.vue"
import Signup from "./components/auth/signup.vue"
import Product from "./components/product/product.vue"
import NOTPage from "./components/product/NOFound.vue"
import store from './store';
import Vuex from 'vuex'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Toast)
Vue.use(BootstrapVue)
Vue.use(vueDebounce)

const routes = [
    { path: '/login', component: Login, name: 'login', meta: { requiresAuth: false } },
    { path: '/register', component: Signup, name: 'signup', meta: { requiresAuth: false } },
    { path: '/product', component: Product, name: 'product', meta: { requiresAuth: true } },
    { path: '*', name: 'NotFound', redirect: '/404' },
    { path: '/404', name: '404', component: NOTPage }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(async(to, from, next) => {
    const isLoggedIn = store.state.auth.authenticated
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const { path, name, params } = to
    if (isLoggedIn && ['login', 'signup'].includes(name)) {
        return next('/product')
    } else if (requiresAuth && !isLoggedIn) {
        return next('/login')
    }
    return next()
})

import App from './components/layout/app.vue'
const app = new Vue({
    router,
    store,
    VueRouter,
    render: h => h(App),
}).$mount('#app')
