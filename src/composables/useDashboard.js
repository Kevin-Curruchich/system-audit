import { computed } from "vue";
import { useStore } from "vuex";

const useDashboard = () => {
  const store = useStore();

  //getters

  const isLoadingDashboard = computed(
    () => store.getters["dashboard/getIsLoadingDashboard"]
  );

  const dashboardData = computed(
    () => store.getters["dashboard/getDashboardData"]
  );

  //methods
  const requestGetDashboard = () => {
    const resp = store.dispatch("dashboard/requestGetDashboard");
    return resp;
  };

  return {
    dashboardData,
    isLoadingDashboard,
    requestGetDashboard,
  };
};

export default useDashboard;
