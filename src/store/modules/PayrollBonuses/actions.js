import mayApi from "@/apis/mayApi";

export const requestGetPayrollBonuses = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingPayrollBonuses", true);
    mayApi
      .get("/payroll-bonuses/all")
      .then((response) => {
        commit("setPayrollBonuses", response.data);
        commit("setIsLoadingPayrollBonuses", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
