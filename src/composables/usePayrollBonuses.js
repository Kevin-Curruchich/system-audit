import { computed, ref } from "vue";
import { useStore } from "vuex";
import bonusesState from "@/constants/bonusesState";

export default function usePayrolls() {
  const store = useStore();

  //   computed
  const payrolls = computed(
    () => store.getters["payrollBonuses/getPayrollBonuses"]
  );
  const total = computed(() => payrolls.value.length);
  const isLoadingTable = computed(
    () => store.getters["payrollBonuses/getIsLoadingPayrollBonuses"]
  );

  //refs
  const payrollBonusesPerPage = ref([]);

  //methods
  const requestGetPayrollBonuses = async () => {
    await store.dispatch("payrollBonuses/requestGetPayrollBonuses");
    onChangePage(1);
  };

  const onChangePage = (page) => {
    const currentPage = payrolls.value.slice((page - 1) * 10, page * 10);

    payrollBonusesPerPage.value = currentPage;
  };

  const getPayrollBonusesId = (id) => {
    return id.substring(0, 8);
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case bonusesState.DRAFT:
        statusReturn = "info";
        break;
      case bonusesState.APPROVE:
        statusReturn = "success";
        break;
      case bonusesState.CANCEL:
        statusReturn = "danger";
        break;
    }
    return statusReturn;
  };

  const getStatus = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case bonusesState.DRAFT:
        statusReturn = "Borrador";
        break;
      case bonusesState.APPROVE:
        statusReturn = "Aprobada";
        break;
      case bonusesState.CANCEL:
        statusReturn = "Cancelada";
        break;
    }
    return statusReturn;
  };

  return {
    isLoadingTable,
    onChangePage,
    payrollBonusesPerPage,
    requestGetPayrollBonuses,
    getPayrollBonusesId,
    total,
    getStatusBadge,
    getStatus,
  };
}
