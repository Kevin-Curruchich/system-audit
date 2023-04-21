import { computed, ref } from "vue";
import { useStore } from "vuex";
import paymentsState from "@/constants/paymentsState";

export default function usePayments() {
  const store = useStore();

  //   computed
  const collections = computed(() => store.getters["payments/getPayments"]);
  const total = computed(() => collections.value.length);
  const isLoadingTable = computed(
    () => store.getters["payments/getIsLoadingPayments"]
  );

  //refs
  const paymentPerPage = ref([]);

  //methods
  const requestGetPayments = async () => {
    await store.dispatch("payments/requestGetPayments");
    onChangePage(1);
  };

  const onChangePage = (page) => {
    const currentPage = collections.value.slice((page - 1) * 10, page * 10);

    paymentPerPage.value = currentPage;
  };

  const getPaymentsId = (id) => {
    return id.substring(0, 8);
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case paymentsState.DRAFT:
        statusReturn = "info";
        break;
      case paymentsState.APPROVE:
        statusReturn = "success";
        break;
      case paymentsState.CANCEL:
        statusReturn = "danger";
        break;
    }
    return statusReturn;
  };

  const getStatus = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case paymentsState.DRAFT:
        statusReturn = "Borrador";
        break;
      case paymentsState.APPROVE:
        statusReturn = "Aprobada";
        break;
      case paymentsState.CANCEL:
        statusReturn = "Cancelada";
        break;
    }
    return statusReturn;
  };

  return {
    isLoadingTable,
    onChangePage,
    paymentPerPage,
    requestGetPayments,
    getPaymentsId,
    total,
    getStatusBadge,
    getStatus,
  };
}
