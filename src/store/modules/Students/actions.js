import sbgApi from "@/apis/sbgApi";

// export const myAction = async ({commit})=>{

// }

export const requestGetStudents = async ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingStudents", true);
    sbgApi
      .get(`/students`, { params })
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

export const requestGetStudentStatuses = async ({ commit }) => {
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
    commit("setIsLoadingStudentTypes", true);
    sbgApi
      .get("/students/types")
      .then((response) => {
        commit("setSudentTypes", response.data);
        commit("setIsLoadingStudentTypes", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestPostStudent = async (_, data) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .post("/students", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
