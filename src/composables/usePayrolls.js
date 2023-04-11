import { computed, ref } from "vue";
import { useStore } from "vuex";
import payrollStateConstants from "@/constants/payrollStateConstants";

export default function usePayrolls() {
  const store = useStore();

  //   computed
  const payrolls = computed(() => store.getters["payrolls/getPayrolls"]);
  const total = computed(() => payrolls.value.length);
  const isLoadingPayrolls = computed(
    () => store.getters["payrolls/getIsLoadingPayrolls"]
  );

  //refs
  const payrollsPerPage = ref([]);

  //methods
  const requestGetPayrolls = async () => {
    await store.dispatch("payrolls/requestGetPayrolls");
    onChangePage(1);
  };

  const onChangePage = (page) => {
    const payrollsOfCurrentPage = payrolls.value.slice(
      (page - 1) * 10,
      page * 10
    );

    payrollsPerPage.value = payrollsOfCurrentPage;
  };

  const getPayrollId = (id) => {
    return id.substring(0, 8);
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case payrollStateConstants.DRAFT:
        statusReturn = "info";
        break;
      case payrollStateConstants.APPROVE:
        statusReturn = "success";
        break;
      case payrollStateConstants.CANCEL:
        statusReturn = "danger";
        break;
    }
    return statusReturn;
  };

  return {
    isLoadingPayrolls,
    onChangePage,
    payrollsPerPage,
    requestGetPayrolls,
    getPayrollId,
    total,
    getStatusBadge,
  };
}
