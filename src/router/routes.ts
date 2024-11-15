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
            cName: '基本图像',
            component: () => import('@/views/threeJs/components/three01.vue')
          },
          {
            path: '/threeJs/three02',
            name: 'threeJs/three02',
            cName: '鼠标操作',
            component: () => import('@/views/threeJs/components/three02.vue')
          },
          {
            path: '/threeJs/three03',
            name: 'threeJs/three03',
            cName: '鼠标+动画',
            component: () => import('@/views/threeJs/components/three03.vue')
          },
          {
            path: '/threeJs/three04',
            name: 'threeJs/three04',
            cName: '模块化',
            component: () => import('@/views/threeJs/components/three04.vue')
          },
          {
            path: '/threeJs/three05',
            name: 'threeJs/three05',
            cName: '纹理材质',
            component: () => import('@/views/threeJs/components/three05.vue')
          },
          {
            path: '/threeJs/three06_1',
            name: 'threeJs/three06_1',
            cName: '导入模型1',
            component: () => import('@/views/threeJs/components/three06_1.vue')
          },
          {
            path: '/threeJs/three06',
            name: 'threeJs/three06',
            cName: '导入模型2',
            component: () => import('@/views/threeJs/components/three06.vue')
          },
          {
            path: '/threeJs/three07',
            name: 'threeJs/three07',
            cName: '模型+动画',
            component: () => import('@/views/threeJs/components/three07.vue')
          },
        ]
      },
      {
        path: '/layUI',
        name: 'layUI',
        cName: 'layUI案例',
        redirect: "/layUI/test01",
        children: [
          {
            path: '/layUI/test01',
            name: 'layUI/test01',
            cName: '基本操作1',
            component: () => import('@/views/layui/components/test01.vue')
          },
          {
            path: '/layUI/test02',
            name: 'layUI/test02',
            cName: '基本操作2',
            component: () => import('@/views/layui/components/test02.vue')
          },
        ]
      },
      {
        path: '/echarts',
        name: 'echarts',
        cName: 'echarts案例',
        redirect: "/echarts/test01",
        children: [
          {
            path: '/echarts/test01',
            name: 'echarts/test01',
            cName: '图像1',
            component: () => import('@/views/echarts/components/test01.vue')
          },
          {
            path: '/echarts/test02',
            name: 'echarts/test02',
            cName: '图像2',
            component: () => import('@/views/echarts/components/test02.vue')
          },
        ]
      },
      {
        path: '/about',
        name: 'about',
        cName: '关于',
        component: () => import('@/views/about/index.vue')
      },
    ]
  }
];
