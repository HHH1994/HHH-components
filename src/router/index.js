import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const  baseRoutes  = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index'),
    children: [
      {
        path: '/Input',
        name: 'Input',
        meta: {
          desc: '输入框'
        },
        component: () => import('@/pages/Input.vue')
      },
      {
        path: '/Editor',
        name: 'Editor',
        meta: {
          desc: '编辑器'
        },
        component: () => import('@/pages/Editor.vue')
      },
      {
        path: '/Form',
        name: 'Form',
        meta: {
          desc: '表单'
        },
        component: () => import('@/pages/Form.vue')
      },
      {
        path: '/Linkage',
        name: 'Linkage',
        meta: {
          desc: '多级联动'
        },
        component: () => import('@/pages/Liandong.vue')
      }
    ]
  }
];

export const asyncRoutes = [];

const routes = baseRoutes.concat(asyncRoutes)
export default new Router({
  mode: 'hash',
  routes
});