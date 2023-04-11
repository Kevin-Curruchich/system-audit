export default {
  name: "employees",
  path: "/employees",
  component: () =>
    import(
      /* webpackChunkName: "EmployeesLayouts" */ "@/modules/Employees/layout/EmployeeLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "employees-list",
      component: () =>
        import(
          /* webpackChunkName: "EmployeeList" */ "@/modules/Employees/views/Employees.vue"
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
