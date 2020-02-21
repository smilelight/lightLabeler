import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ping from '@/views/Ping.vue'
import Flask from '@/views/Flask.vue'
import Item from '@/views/Item.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ping',
    name: 'ping',
    component: Ping
  },
  {
    path: '/flask',
    name: 'flask',
    component: Flask
  },
  {
    path: '/projects/:project_name/item',
    name: 'item',
    component: Item
  },
  {
    path: '/projects/:project_name/project',
    name: 'project',
    component: Project
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/vue-container',
    name: 'vue-container',
    component: () => import('@/views/Vue-Container.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
