<template>
  <div
    v-if="layout === 'custom'"
    class="position-absolute w-100 min-height-300 top-0"
    :style="{
      'background-image': 'url(' + image + ')',
      'background-position-y': '50%',
    }"
  >
    <span class="mask bg-success opacity-6"></span>
  </div>
  <div
    v-show="layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${darkMode ? 'bg-trasnparent' : 'bg-success'}`"
  />
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-4"
    :class="` ${sidebarType} ${
      isRTL ? 'fixed-end me-3 rotate-caret' : 'fixed-start ms-3'
    } ${layout === 'landing' ? 'bg-transparent shadow-none' : ''}`"
  >
    <perfect-scrollbar>
      <div class="sidenav-header">
        <i
          id="iconSidenav"
          class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
          aria-hidden="true"
        ></i>
        <router-link class="m-0 navbar-brand" to="/">
          <img
            :src="
              layout === 'landing' || darkMode || sidebarType === 'bg-default'
                ? logoWhite
                : logo
            "
            class="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span class="ms-2 font-weight-bold">MayPayroll</span>
        </router-link>
      </div>
      <hr class="mt-0 horizontal dark" />
      <sidenav-list />
    </perfect-scrollbar>
  </aside>
</template>
<script>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import SidenavList from "./SidenavList.vue";

import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    SidenavList,
    PerfectScrollbar,
  },
  data() {
    return {
      logo: "https://mayfer.dev/wp-content/uploads/2020/10/logo3.png",
      logoWhite: "https://mayfer.dev/wp-content/uploads/2020/10/logo3.png",
      image: "https://source.unsplash.com/1280x720/?city",
    };
  },
  computed: {
    ...mapState(["layout", "isRTL", "sidebarType", "darkMode"]),
  },
  beforeUnmount() {
    this.$store.state.image;
  },
};
</script>
<style scoped>
.ps {
  height: 100%;
}

.navbar-vertical.navbar-expand-xs {
  overflow-y: hidden;
}
</style>
