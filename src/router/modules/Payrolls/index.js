export default {
  name: "payrolls",
  path: "/payrolls",
  component: () =>
    import(
      /* webpackChunkName: "PayrollLayout" */ "@/modules/Payrolls/layout/PayrollLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "payrolls-list",
      component: () =>
        import(
          /* webpackChunkName: "Payrolls" */ "@/modules/Payrolls/views/Payrolls.vue"
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
