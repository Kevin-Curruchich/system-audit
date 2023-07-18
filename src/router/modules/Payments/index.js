import isAdminUser from "@/modules/auth/guards/auth-gard-admin.js";

export default {
  name: "Payments",
  path: "/payments",
  component: () =>
    import(
      /* webpackChunkName: "PaymentsLayout" */ "@/modules/Payments/layout/PaymentsLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "Payments List",
      beforeEnter: [isAdminUser],
      component: () =>
        import(
          /* webpackChunkName: "Payments" */ "@/modules/Payments/views/Payments.vue"
        ),
    },
    {
      path: ":id",
      name: "Invoice",
      component: () =>
        import(
          /* webpackChunkName: "Invoice" */ "@/modules/Payments/views/Invoice.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
        };
      },
    },
  ],
};
