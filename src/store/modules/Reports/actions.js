import sbgApi from "@/apis/sbgApi";

export const requestDownloadCollectionHistoryByStudent = async (
  { commit },
  { studentId, params }
) => {
  return new Promise((resolve, reject) => {
    commit("setIsDownloadReportByStudent", true);
    sbgApi
      .get(`/reports/students/${studentId}`, { params, responseType: "blob" })
      .then((response) => {
        commit("setIsDownloadReportByStudent", false);
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
