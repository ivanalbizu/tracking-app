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
      title: 'Home Page - Tracker App',
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
    meta: {
      title: 'Login - Tracker App',
    }
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue'),
    meta: {
      title: 'Stats Page - Tracker App',
      requiresAuth: true
    }
  },
  {
    path: '/track',
    name: 'track',
    component: () => import(/* webpackChunkName: "track" */ '../views/Track.vue'),
    meta: {
      requiresAuth: true,
      title: 'Tracking Page - Tracker App',
    }
  },
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue'),
    meta: {
      requiresAuth: true,
      title: 'Personal Config Page - Tracker App',
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true,
      requiresRoleAdmin: true,
      title: 'Personal Config Page - Tracker App',
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
      next({path: 'signin'})
    } else {
      if (to.matched.some(route => route.meta.requiresRoleAdmin)) {
        if (store.getters['auth/user'].role != 'ADMIN') {
          next({path: '/'})
        } else {
          next()
        }
      }
      next()
    }
  } else {
    next()
  }
});

export default router
