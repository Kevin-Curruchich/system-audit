import { createRouter, createWebHistory } from "vue-router";
import isAuthenticatedGuard from "../modules/auth/guards/auth-gard.js";
import Default from "../views/dashboards/Default.vue";
import EmployeesRouter from "./modules/Employees";
import PayrollsRouter from "./modules/Payrolls";
import BonusesRouter from "./modules/Bonuses";
import ReportsRouter from "./modules/Reports";
import Illustration from "../modules/auth/views/Illustration.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: Illustration,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: [isAuthenticatedGuard],
    component: Default,
  },
  {
    path: "/employees",
    beforeEnter: [isAuthenticatedGuard],
    ...EmployeesRouter,
  },
  {
    path: "/payrolls",
    beforeEnter: [isAuthenticatedGuard],
    ...PayrollsRouter,
  },
  {
    path: "/bonuses",
    beforeEnter: [isAuthenticatedGuard],
    ...BonusesRouter,
  },
  {
    path: "/reports",
    beforeEnter: [isAuthenticatedGuard],
    ...ReportsRouter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
