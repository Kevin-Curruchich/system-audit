import sbgApi from "@/apis/sbgApi";

export const requestGetCollections = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingCollections", true);
    sbgApi
      .get(`/collections`)
      .then((response) => {
        commit("setCollection", response.data);
        commit("setIsLoadingCollections", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
