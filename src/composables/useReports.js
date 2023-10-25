import { computed } from "vue";
import { useStore } from "vuex";

const useReports = () => {
  const store = useStore();

  //getters
  const isDownlodReportByStudent = computed(
    () => store.getters["reports/getIsDownloadReportByStudent"]
  );

  const isDownloadingReportByYear = computed(
    () => store.getters["reports/getIsDownloadingReportByYear"]
  );

  const isDownloadingStudentsPersonalData = computed(
    () => store.getters["reports/getIsDownloadingStudentsPersonalData"]
  );

  //methods
  const requestDownloadCollectionHistoryByStudent = (id, params) => {
    const resp = store.dispatch(
      "reports/requestDownloadCollectionHistoryByStudent",
      { studentId: id, params }
    );
    return resp;
  };

  const requestDownloadCollectionHistoryByYear = (params) => {
    const resp = store.dispatch(
      "reports/requestDownloadCollectionHistoryByYear",
      { params }
    );
    return resp;
  };

  const requestDownloadStudentsPersonalData = () => {
    const resp = store.dispatch("reports/requestDownloadStudentsPersonalData");
    return resp;
  };

  return {
    isDownlodReportByStudent,
    requestDownloadCollectionHistoryByStudent,
    isDownloadingReportByYear,
    requestDownloadCollectionHistoryByYear,
    isDownloadingStudentsPersonalData,
    requestDownloadStudentsPersonalData,
  };
};

export default useReports;
