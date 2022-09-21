import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList];

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/dashboard/base'
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404'
  }
];

export const allRoutes = [...defaultRouterList, ...asyncRouterList];

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

export default router;
