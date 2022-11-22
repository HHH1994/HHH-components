import Vue from 'vue';
import Router from 'vue-router';
import {pageRouterConfig} from './pageConfig';

Vue.use(Router);

const componentRouter = pageRouterConfig.map(config => {
  return {
    path: `/${config.name}`,
    name: config.name,
    meta: {
      desc: config.desc
    },
    component: () => import(`@/pages/${config.name}.vue`)
  }
})

export const  baseRoutes  = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index'),
    children: componentRouter
  }
];

const originRouterPush = Router.prototype.push;
Router.prototype.push = function() {
  originRouterPush.call(this, ...arguments).catch(() => {})
}

export const asyncRoutes = [];

const routes = baseRoutes.concat(asyncRoutes)
export default new Router({
  mode: 'hash',
  routes
});