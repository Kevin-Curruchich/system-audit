import { createRouter, createWebHistory } from "vue-router";
import Default from "../views/dashboards/Default.vue";
import Projects from "../views/pages/profile/Projects.vue";
import General from "../views/pages/projects/General.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import NewProject from "../views/pages/projects/NewProject.vue";
import Charts from "../views/pages/Charts.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import Analytics from "../views/applications/analytics/Analytics.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/EditProduct.vue";
import ProductPage from "../views/ecommerce/ProductPage.vue";
import ProductsList from "../views/ecommerce/ProductsList.vue";
import OrderDetails from "../views/ecommerce/Orders/OrderDetails";
import OrderList from "../views/ecommerce/Orders/OrderList";
import NewUser from "../views/pages/Users/NewUser.vue";
import Settings from "../views/pages/Account/Settings.vue";
import Billing from "../views/pages/Account/Billing.vue";
import Invoice from "../views/pages/Account/Invoice.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetBasic from "../views/auth/reset/Basic.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import ResetIllustration from "../views/auth/reset/Illustration.vue";
import SignupBasic from "../views/auth/signup/Basic.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import SignupIllustration from "../views/auth/signup/Illustration.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboards/dashboard-default",
  },
  {
    path: "/dashboards/dashboard-default",
    name: "Default",
    component: Default,
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects,
  },
  {
    path: "/pages/projects/general",
    name: "General",
    component: General,
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/pages/projects/new-project",
    name: "New Project",
    component: NewProject,
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts,
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets,
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard,
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables,
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/applications/analytics",
    name: "Analytics",
    component: Analytics,
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage,
  },
  {
    path: "/ecommerce/products/products-list",
    name: "Products List",
    component: ProductsList,
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails,
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList,
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser,
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice,
  },

  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover,
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration,
  },
  {
    path: "/authentication/reset/basic",
    name: "Reset Basic",
    component: ResetBasic,
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover,
  },
  {
    path: "/authentication/reset/illustration",
    name: "Reset Illustration",
    component: ResetIllustration,
  },

  {
    path: "/authentication/signup/basic",
    name: "Signup Basic",
    component: SignupBasic,
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover,
  },
  {
    path: "/authentication/signup/illustration",
    name: "Signup Illustration",
    component: SignupIllustration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
