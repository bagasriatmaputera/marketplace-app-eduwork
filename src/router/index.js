import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '@/views/UserView.vue'
import UserAddView from '@/views/UserAddView.vue'
import UserUpdateView from '@/views/UserUpdateView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductAddView from '@/views/ProductAddView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CategoryAddView from '@/views/CategoryAddView.vue'
import CategoryUpdateView from '@/views/CategoryUpdateView.vue'
import ProductUpdateView from '@/views/ProductUpdateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/user/user-add',
      name: 'userAdd',
      component: UserAddView,
    },
    {
      path: '/user/:userId',
      name: 'userUpdate',
      component: UserUpdateView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/product/product-add',
      name: 'productAdd',
      component: ProductAddView,
    },
    {
      path: '/product/:productId',
      name: 'productUpdate',
      component: ProductUpdateView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/category/category-add',
      name: 'categoryAdd',
      component: CategoryAddView,
    },
    {
      path: '/category/:categoryId',
      name: 'categoryUpdate',
      component: CategoryUpdateView,
    },
  ],
})

export default router
