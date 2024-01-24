import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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