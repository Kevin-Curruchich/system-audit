import sbgApi from "@/apis/sbgApi";

export const requestGetQuartres = async ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingQuarters", true);
    sbgApi
      .get(`/quartes`, { params })
      .then((response) => {
        commit("setQuarters", response.data);
        commit("setIsLoadingQuarters", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestGetQuartresList = async ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .get(`/quartes/list`, { params })
      .then((response) => {
        console.log({ response });
        commit("setQuartersList", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
