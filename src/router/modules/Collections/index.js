export default {
  name: "Collections",
  path: "/collections",
  component: () =>
    import(
      /* webpackChunkName: "CollectionsLayout" */ "@/modules/AssignedCollection/layout/CollectionsLayout"
    ),
  children: [
    {
      path: "",
      name: "Collections List",
      component: () =>
        import(
          /* webpackChunkName: "Collections" */ "@/modules/AssignedCollection/views/AssignedCollection"
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
