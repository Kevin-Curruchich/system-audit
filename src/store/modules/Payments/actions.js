import sbgApi from "@/apis/sbgApi";

export const requestGetPayments = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingPayments", true);
    sbgApi
      .get("/collection/all")
      .then((response) => {
        commit("setPayments", response.data);
        commit("setIsLoadingPayments", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
