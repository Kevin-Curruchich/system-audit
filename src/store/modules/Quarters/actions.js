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

export const requestGetQuartresByStudent = async ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .get(`/quartes/student/${id}`)
      .then((response) => {
        commit("setQuartersByStudent", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

//post
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

//put
export const requestPutQuarters = async (_, { data, id }) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .put(`/quartes/${id}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
