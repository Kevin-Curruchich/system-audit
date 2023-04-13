<template>
  <div
    id="sidenav-collapse-main"
    class="collapse navbar-collapse w-auto h-auto h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          :to="{ name: 'Dashboard' }"
          mini-icon="D"
          text="Dashboard"
        >
          <template #icon>
            <i class="ni ni-world text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          :to="{ name: 'List of Students' }"
          mini-icon="E"
          text="Estudiantes"
        >
          <template #icon>
            <i class="fas fa-users text-secondary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          :to="{ name: 'Student Types' }"
          mini-icon="TE"
          text="Tipo de Estudiante"
        >
          <template #icon>
            <i class="fas fa-user-tag text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          :to="{ name: 'Collections List' }"
          mini-icon="P"
          text="Cobros"
        >
          <template #icon>
            <i class="fas fa-wallet text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          :to="{ name: 'Payments List' }"
          mini-icon="B"
          text="Pagos"
        >
          <template #icon>
            <i
              class="fas fa-money-bill-wave-alt text-success text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          Utilidades
        </h6>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse
          collapse-ref="pagesExamples"
          nav-text="Reportes"
          :class="getRoute() === 'pages' ? 'active' : ''"
        >
          <template #icon>
            <i class="fas fa-file-alt text-warning text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <sidenav-item
                :to="{ name: 'payrolls-reports' }"
                mini-icon="Pl"
                text="Planilllas"
              />
              <sidenav-item
                :to="{ name: 'bonuses-reports' }"
                mini-icon="Gn"
                text="Bonificacion"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
  <!-- <div class="mt-3 sidenav-footer">
    <sidenav-card
      :card="{
        title: 'Need Help?',
        description: 'Please check our docs',
        links: [
          {
            label: 'Documentation',
            route:
              'https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/',
            color: 'dark',
          },
          {
            label: 'Buy now',
            route:
              'https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=vadp',
            color: 'success',
          },
        ],
      }"
    />
  </div> -->
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
// import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCollapseItem from "./SidenavCollapseItem.vue";

export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    // SidenavCollapse,
    // SidenavCollapseItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
<style>
.navbar-vertical.navbar-expand-xs .navbar-collapse {
  overflow: hidden !important;
}
</style>
