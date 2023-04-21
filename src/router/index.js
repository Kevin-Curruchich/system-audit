import { createRouter, createWebHistory } from "vue-router";
import isAuthenticatedGuard from "../modules/auth/guards/auth-gard.js";
import Default from "../views/dashboards/Default.vue";
import StudentsRouter from "./modules/Students";
import StudentTypesRouter from "./modules/StudentTypes";
import Collections from "./modules/Collections/index.js";
import Payments from "./modules/Payments";
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
    path: "/students",
    beforeEnter: [isAuthenticatedGuard],
    ...StudentsRouter,
  },
  {
    path: "/student-types",
    beforeEnter: [isAuthenticatedGuard],
    ...StudentTypesRouter,
  },
  {
    path: "/collections",
    beforeEnter: [isAuthenticatedGuard],
    ...Collections,
  },
  {
    path: "/payments",
    beforeEnter: [isAuthenticatedGuard],
    ...Payments,
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
