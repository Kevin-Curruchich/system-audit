import sbgApi from "@/apis/sbgApi";

// export const myAction = async ({commit})=>{

// }

export const requestGetStudents = async ({ commit }, paramsData) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingStudents", true);
    sbgApi
      .get(`/students`, {
        params: {
          branchId: paramsData.branchId,
          page: paramsData.page,
          take: paramsData.take,
          search: paramsData.search,
        },
      })
      .then((response) => {
        commit("setStudents", response.data);
        commit("setIsLoadingStudents", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestGetEmploeeStatuses = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .get("/students/statuses")
      .then((response) => {
        commit("setStudentStatuses", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestGetSudentTypes = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .get("/students/types")
      .then((response) => {
        commit("setSudentTypes", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
