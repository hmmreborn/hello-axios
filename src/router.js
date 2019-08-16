import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Contacts from './views/Contacts'
Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'axios',
          name: 'axios',
          component: () => import('./views/AxiosDemo.vue')
        },
        {
          path: 'test',
          name: 'test',
          component: () => import('./views/AxiosTest.vue')
        },
        {
          path: 'example',
          name: 'example',
          component: () => import('./views/AxiosExample.vue')
        },
        {
          path: 'instance',
          name: 'instance',
          component: () => import('./views/AxiosInstance.vue')
        },
        {
          path: 'cancel',
          name: 'cancel',
          component: () => import('./views/AxiosCancel.vue')
        }
      ]
    }
  ]
})
