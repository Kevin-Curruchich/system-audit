export default {
  name: "Collections",
  path: "/collections",
  component: () =>
    import(
      /* webpackChunkName: "CollectionsLayout" */ "@/modules/Collections/layout/CollectionsLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "Collections List",
      component: () =>
        import(
          /* webpackChunkName: "Collections" */ "@/modules/Collections/views/Collections.vue"
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
