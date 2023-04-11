import mayApi from "@/apis/mayApi";

export const requestGetPayrolls = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingPayrolls", true);
    mayApi
      .get(`/payrolls`)
      .then((response) => {
        commit("setPayrolls", response.data);
        commit("setIsLoadingPayrolls", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
