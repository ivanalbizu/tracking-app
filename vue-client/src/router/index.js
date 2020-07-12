import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!store.getters['auth/authenticated']) {
      next({
        path: 'signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
