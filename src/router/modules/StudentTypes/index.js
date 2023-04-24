export default {
  name: "",
  path: "/student-types",
  component: () =>
    import(
      /* webpackChunkName: "StudentsLayouts" */ "@/modules/StudentTypes/layout/StudentTypesLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "Student Types",
      component: () =>
        import(
          /* webpackChunkName: "StudentsList" */ "@/modules/StudentTypes/views/StudentTypes.vue"
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
