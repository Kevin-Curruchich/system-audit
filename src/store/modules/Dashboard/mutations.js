export const setIsLoadingDashboard = async (state, val) => {
  state.isFetchingDashboard = val;
};

export const setDashboardData = async (state, data) => {
  state.dashboardData = data;
};
