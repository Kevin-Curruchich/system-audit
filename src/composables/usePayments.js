import { computed, ref } from "vue";
import { useStore } from "vuex";
import paymentsState from "@/constants/paymentsState";

export default function usePayments() {
  const store = useStore();

  //   computed
  const payments = computed(() => store.getters["payments/getPayments"]);
  const isLoadingPayments = computed(
    () => store.getters["payments/getIsLoadingPayments"]
  );

  //refs
  const paymentPerPage = ref([]);

  //methods
  //get
  const requestGetPayments = async (params = { page: 1, take: 10 }) => {
    await store.dispatch("payments/requestGetPayments", params);
  };

  //post
  const requestPostPayments = async (params) => {
    const response = await store.dispatch(
      "payments/requestPostPayments",
      params
    );
    return response;
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
    getPaymentsId,
    getStatus,
    getStatusBadge,
    isLoadingPayments,
    paymentPerPage,
    payments,
    requestGetPayments,
    requestPostPayments,
  };
}
