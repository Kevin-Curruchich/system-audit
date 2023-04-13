import sbgApi from "@/apis/sbgApi";

// export const myAction = async ({commit})=>{

// }

export const requestGetEmployees = async ({ commit }, paramsData) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingEmployees", true);
    sbgApi
      .get(`/employees`, {
        params: {
          branchId: paramsData.branchId,
          page: paramsData.page,
          take: paramsData.take,
          search: paramsData.search,
          employeeStatusId: paramsData.employeeStatusId,
          employeeTypeId: paramsData.employeeTypeId,
        },
      })
      .then((response) => {
        commit("setEmployees", response.data);
        commit("setIsLoadingEmployees", false);
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
      .get("/employees/statuses")
      .then((response) => {
        commit("setEmployeeStatuses", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const requestGetEmployeeTypes = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    sbgApi
      .get("/employees/types")
      .then((response) => {
        commit("setEmployeeTypes", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
