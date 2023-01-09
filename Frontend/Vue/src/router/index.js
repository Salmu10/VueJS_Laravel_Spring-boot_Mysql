import { createRouter, createWebHistory } from "vue-router";
import AuthGuards from '../services/guards/AuthGuards';

const routes = [
  { path:"", redirect:{ name:"home" } },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/reserve", name: "reserve", component: () => import('../views/Reserve.vue') },
  { path: "/reserve/:filters", name: "reserve_filters", component: () => import('../views/Reserve.vue') },
  { path: "/reserve/details/:id", name: "details", component: () => import('../views/Details.vue') },
  { path: "/dashboard", name: "dashboard", component: () => import('../views/Dashboard.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/categories", name: "categories_list", component: () => import('../views/Admin/Category/Categories_list.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/categories/add", name: "category_add", component: () => import('../views/Admin/Category/CategoryAdd.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/categories/update/:id", name: "category_update", component: () => import('../views/Admin/Category/CategoryUpdate.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/tables", name: "tables_list", component: () => import('../views/Admin/Table/Tables_list.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/tables/add", name: "table_add", component: () => import('../views/Admin/Table/TableAdd.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/dashboard/tables/update/:id", name: "table_update", component: () => import('../views/Admin/Table/TableUpdate.vue'), beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: () => import('../views/Login/Login.vue'), beforeEnter: AuthGuards.noAuth, meta: { requiresAuth: true } },
  { path: "/register", name: "register", component: () => import('../views/Login/Register.vue'), beforeEnter: AuthGuards.noAuth, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;