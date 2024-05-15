import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from "./routes";

//history模式，刷新可能无法访问
// const routerHistory = createWebHistory('/sim-dashboard')
const router = createRouter({
  //import.meta.env: vite.config中配置的基本信息
  // hash模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: routerHistory,
  routes
})

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, _, next) => {
  // 返回 false 以取消导航
  next();
});

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => { });

export default router
