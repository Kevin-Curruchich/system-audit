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

  return {
    isDownlodReportByStudent,
    requestDownloadCollectionHistoryByStudent,
    isDownloadingReportByYear,
    requestDownloadCollectionHistoryByYear,
  };
};

export default useReports;
