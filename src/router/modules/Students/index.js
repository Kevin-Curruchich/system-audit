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
    {
      path: ":id",
      name: "Student",
      component: () =>
        import(
          /* webpackChunkName: "Student By Id" */ "@/modules/Students/views/StudentById.vue"
        ),
      props: (route) => {
        return {
          id: route.params.id,
        };
      },
    },
  ],
};
