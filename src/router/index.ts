import { createRouter, createWebHistory } from 'vue-router'

// Import all views
import HomeView from '../views/HomeView.vue'
import GoogleLogin from '../views/GoogleLogin.vue'
import FacebookLogin from '../views/FacebookLogin.vue'
import FacebookCallback from '../views/FacebookCallback.vue'
import LineLogin from '../views/LineLogin.vue'
import LineCallback from '../views/LineCallback.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/google-login',
    name: 'GoogleLogin',
    component: GoogleLogin,
  },
  { path: '/facebook-login', name: 'FacebookLogin', component: FacebookLogin },
  { path: '/facebook-callback', name: 'FacebookCallback', component: FacebookCallback },
  {
    path: '/line-login',
    name: 'LineLogin',
    component: LineLogin,
  },
  {
    path: '/line-callback',
    name: 'LineCallback',
    component: LineCallback,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
