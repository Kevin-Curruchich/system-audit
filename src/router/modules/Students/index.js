export default {
  name: "students",
  path: "/students",
  component: () =>
    import(
      /* webpackChunkName: "StudentsLayouts" */ "@/modules/Students/layout/StudentsLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "List of Students",
      component: () =>
        import(
          /* webpackChunkName: "StudentsList" */ "@/modules/Students/views/Students.vue"
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
