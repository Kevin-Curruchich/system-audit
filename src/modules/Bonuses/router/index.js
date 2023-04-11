export default {
  name: "bonuses",
  path: "/bonuses",
  component: () =>
    import(/* webpackChunkName: "BonusLayout" */ "../layout/BonusLayout.vue"),
  children: [
    {
      path: "",
      name: "bonuses-list",
      component: () =>
        import(/* webpackChunkName: "Payrolls" */ "../views/Bonuses.vue"),
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
