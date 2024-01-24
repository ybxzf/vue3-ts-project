// import { RouteRecordRaw } from "vue-router";
import HomeView from '@/views/HomeView.vue'

export const routes: any = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  }
  ,
  {
    path: '/piniaTest',
    name: 'piniaTest',
    component: () => import('@/views/PiniaTestView.vue')
  }
];