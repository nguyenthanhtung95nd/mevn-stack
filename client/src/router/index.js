import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/books/BookList.vue'
import BookCreate from '../views/books/BookCreate.vue'
import BookUpdate from '../views/books/BookUpdate.vue'
import Register from '../views/authentication/Register.vue'
import Login from '../views/authentication/Login.vue'
import * as auth from '../services/AuthService'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/book',
    name: 'book-list',
    component: BookList,
    beforeEnter: (to, from, next) => {
      // Navigation Guard protects this route. User must be logged in, else will be routed to login page
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/book/new',
    name: 'book-create',
    component: BookCreate,
    beforeEnter: (to, from, next) => {
      // Navigation Guard protects this route. User must be logged in, else will be routed to login page
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/book/:id',
    name: 'book-update',
    component: BookUpdate,
    beforeEnter: (to, from, next) => {
      // Navigation Guard protects this route. User must be logged in, else will be routed to login page
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      // Navigation Guard protects this route. User must be logged in, else will be routed to login page
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '*',
    redirect: "/"
  },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

export default router
