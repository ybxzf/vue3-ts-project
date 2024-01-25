// import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

export const routes: any = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    redirect: "/piniaTest",
    component: Home,
    children: [
      {
        path: '/piniaTest',
        name: 'piniaTest',
        cName: 'pinia测试',
        component: () => import('@/views/piniaTest/index.vue')
      },
      {
        path: '/threeJs',
        name: 'threeJs',
        cName: 'three.js案例',
        redirect: "/threeJs/three01",
        // component: () => import('@/views/threeJs/index.vue'),
        children: [
          {
            path: '/threeJs/three01',
            name: 'threeJs/three01',
            cName: '案例1',
            component: () => import('@/views/threeJs/components/three01.vue')
          },
          {
            path: '/threeJs/three02',
            name: 'threeJs/three02',
            cName: '案例2',
            component: () => import('@/views/threeJs/components/three02.vue')
          },
        ]
      },
      {
        path: '/about',
        name: 'about',
        cName: '关于',
        component: () => import('@/views/AboutView.vue')
      },
    ]
  }
];
