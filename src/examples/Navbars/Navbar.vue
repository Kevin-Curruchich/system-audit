<template>
  <nav
    id="navbarBlur"
    :class="`${
      !isNavFixed
        ? 'navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none'
        : `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none position-sticky ${
            darkMode ? 'bg-default' : 'bg-white'
          } left-auto top-2 z-index-sticky`
    } ${isRTL ? 'top-0 position-sticky z-index-sticky' : ''}`"
    v-bind="$attrs"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        v-if="userIsAdmin"
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />
      <div
        class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none"
        :class="isRTL ? 'me-3' : ''"
      >
        <a
          v-if="userIsAdmin"
          href="#"
          class="p-0 nav-link text-body"
          @click.prevent="navbarMinimize"
        >
          <div class="sidenav-toggler-inner">
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
          </div>
        </a>
      </div>
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <!-- <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="isRTL ? 'أكتب هنا...' : 'Type here...'"
            />
          </div> -->
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <!-- <router-link
              :to="{ name: 'Signin Basic' }"
              class="px-0 nav-link font-weight-bold"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 text-dark' : 'text-white'
              "
              target="_blank"
            >
              <i class="fa fa-user" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">يسجل دخول</span>
              <span v-else class="d-sm-inline d-none">Sign In</span>
            </router-link> -->
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              id="iconNavbarSidenav"
              href="#"
              class="p-0 nav-link text-white"
              @click.prevent="navbarMinimize"
            >
              <div class="sidenav-toggler-inner">
                <i
                  :class="`sidenav-toggler-line ${
                    isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
                  }`"
                ></i>
                <i
                  :class="`sidenav-toggler-line ${
                    isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
                  }`"
                ></i>
                <i
                  :class="`sidenav-toggler-line ${
                    isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
                  }`"
                ></i>
              </div>
            </a>
          </li>
          <li class="d-flex align-items-center">
            <span class="text-white"
              ><b> {{ userData?.userName }}</b></span
            >
          </li>
          <li class="d-flex align-items-center">
            <!-- create a button to logout -->
            <el-button style="margin-left: 10px" circle @click="logout">
              <i class="fa fa-sign-out"></i>
            </el-button>
          </li>
          <!-- <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link" @click="toggleConfigurator">
              <i
                :class="`cursor-pointer fa fa-cog fixed-plugin-button-nav ${
                  !isNavFixed || darkMode ? 'text-white' : 'opacity-8 text-dark'
                }`"
              ></i>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import useAuth from "@/composables/useAuth";
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Navbar",
  components: {
    Breadcrumbs,
  },
  setup() {
    const { userData, userIsAdmin, logout } = useAuth();

    return {
      userData,
      logout,
      userIsAdmin,
    };
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState(["isRTL", "isNavFixed", "darkMode"]),
    currentRouteName() {
      return this.$route.name;
    },
    currentDirectory() {
      let dir = this.$route.path.split("/")[1];
      return dir.charAt(0).toUpperCase() + dir.slice(1);
    },
  },
  created() {
    this.minNav;
  },
  beforeUpdate() {
    this.toggleNavigationOnMobile();
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),
    toggleNavigationOnMobile() {
      if (window.innerWidth < 1200) {
        this.navbarMinimize();
      }
    },
  },
};
</script>
