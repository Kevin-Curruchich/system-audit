import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import auth from "./modules/Auth";
import students from "./modules/Students";
import collections from "./modules/Collections";
import payments from "./modules/Payments";
import quarters from "./modules/Quarters";

export default createStore({
  state: {
    hideConfigButton: true,
    isPinned: true,
    showConfig: false,
    isRTL: false,
    color: "",
    sidebarType: "bg-white",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    bootstrap,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = false;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector("#app");

      if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        sidenav_show.classList.contains("g-sidenav-hidden")
      ) {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      } else if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        sidenav_show.classList.contains("g-sidenav-pinned")
      ) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else if (
        sidenav_show.classList.contains("g-sidenav-show") &&
        window.innerWidth < 1200
      ) {
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    setSidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleDefaultLayout(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("setSidebarType", payload);
    },
  },
  modules: {
    auth,
    students,
    collections,
    payments,
    quarters,
  },
});
