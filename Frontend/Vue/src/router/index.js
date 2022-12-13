import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path:"", redirect:{ name:"home" } },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/reserve", name: "reserve", component: () => import('../views/Reserve.vue') },
  { path: "/reserve/:filters", name: "reserve_filters", component: () => import('../views/Reserve.vue') },
  { path: "/dashboard", name: "dashboard", component: () => import('../views/Dashboard.vue') },
  { path: "/dashboard/categories", name: "categories_list", component: () => import('../views/Admin/Category/Categories_list.vue') },
  { path: "/dashboard/categories/add", name: "category_add", component: () => import('../views/Admin/Category/CategoryAdd.vue') },
  { path: "/dashboard/categories/update/:id", name: "category_update", component: () => import('../views/Admin/Category/CategoryUpdate.vue') },
  { path: "/dashboard/tables", name: "tables_list", component: () => import('../views/Admin/Table/Tables_list.vue') },
  { path: "/dashboard/tables/add", name: "table_add", component: () => import('../views/Admin/Table/TableAdd.vue') },
  { path: "/dashboard/tables/update/:id", name: "table_update", component: () => import('../views/Admin/Table/TableUpdate.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;