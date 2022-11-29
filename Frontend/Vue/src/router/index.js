import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path:"", redirect:{ name:"home" } },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/reserve", name: "reserve", component: () => import('../views/Reserve.vue') },
  { path: "/dashboard", name: "dashboard", component: () => import('../views/Dashboard.vue') },
  { path: "/dashboard/categories", name: "categories_list", component: () => import('../views/Admin/Category/Categories_list.vue') },
  { path: "/dashboard/tables", name: "tables_list", component: () => import('../views/Admin/Table/Tables_list.vue') },
  { path: "/dashboard/categories/update/:id", name: "category_update", component: () => import('../views/Admin/Category/CategoryUpdate.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;