export default {
  name: "Settings",
  path: "/settings",
  component: () =>
    import(
      /* webpackChunkName: "SettingsLayout" */ "@/modules/Settings/layout/SettingsLayout.vue"
    ),
  children: [
    {
      path: "student-types",
      name: "Settings Student Types",
      component: () =>
        import(
          /* webpackChunkName: "CollectionReport" */ "@/modules/Settings/StudentTypes/views/StudentTypes.vue"
        ),
    },
    {
      path: "collection-types",
      name: "Settings Collections",
      component: () =>
        import(
          /* webpackChunkName: "CollectionReport" */ "@/modules/Settings/Collections/views/Collections.vue"
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
