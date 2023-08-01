import { computed } from "vue";
import { useStore } from "vuex";

const useReports = () => {
  const store = useStore();

  //getters
  const isDownlodReportByStudent = computed(
    () => store.getters["reports/getIsDownloadReportByStudent"]
  );

  //methods
  const requestDownloadCollectionHistoryByStudent = (id, params) => {
    const resp = store.dispatch(
      "reports/requestDownloadCollectionHistoryByStudent",
      { studentId: id, params }
    );
    return resp;
  };

  return {
    isDownlodReportByStudent,
    requestDownloadCollectionHistoryByStudent,
  };
};

export default useReports;
