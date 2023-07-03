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
        commit("setQuartersList", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestPostQuarters = async (_, data) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .post(`/quartes`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
