import { computed } from "vue";
import { useStore } from "vuex";
import employeeStatus from "@/constants/employeeStatus";

export default function useEmployees() {
  //instances
  const store = useStore();

  //methods
  const requestGetEmployees = async ({
    page = 1,
    take = 10,
    search = "",
    employeeStatusId = null,
    employeeTypeId = null,
    branchId = null,
  }) => {
    await store.dispatch("employees/requestGetEmployees", {
      branchId,
      employeeStatusId,
      employeeTypeId,
      page,
      search,
      take,
    });
  };

  const requestGetEmployeeStatuses = async () => {
    await store.dispatch("employees/requestGetEmploeeStatuses");
  };

  const requestGetEmployeeTypes = async () => {
    await store.dispatch("employees/requestGetEmployeeTypes");
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case employeeStatus.ACTIVE:
        statusReturn = "success";
        break;
      case employeeStatus.INACTIVE:
        statusReturn = "danger";
        break;
      case employeeStatus.INACTIVE_PENDING_PAYMENT:
        statusReturn = "info";
        break;
    }
    return statusReturn;
  };

  return {
    employees: computed(() => store.getters["employees/getEmployees"]),
    isLoadingEmployees: computed(
      () => store.getters["employees/getIsLoadingEmployees"]
    ),
    employeeStatuses: computed(
      () => store.getters["employees/getEmployeeStatuses"]
    ),
    employeeTypes: computed(() => store.getters["employees/getEmployeeTypes"]),
    requestGetEmployees,
    requestGetEmployeeStatuses,
    requestGetEmployeeTypes,
    getStatusBadge,
  };
}
