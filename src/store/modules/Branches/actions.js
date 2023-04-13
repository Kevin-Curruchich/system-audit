import sbgApi from "@/apis/sbgApi";

// export const myAction = async ({commit})=>{

// }

export const requestGetBranches = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("setIsLoadingBranches", true);
    sbgApi
      .get("/branches")
      .then((response) => {
        commit("setBranches", response.data);
        commit("setIsLoadingBranches", false);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
