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
      component: () =>
        import(
          /* webpackChunkName: "Payments" */ "@/modules/Payments/views/Payments.vue"
        ),
    },
    // {
    //   path: ":id",
    //   name: "entry",
    //   component: () =>
    //     import(/* webpackChunkName: "EntryView" */ "../views/EntryView.vue"),
    //   props: (route) => {
    //     return {
    //       id: route.params.id,
    //     };
    //   },
    // },
  ],
};
