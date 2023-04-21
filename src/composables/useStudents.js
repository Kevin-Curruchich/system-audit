import { computed } from "vue";
import { useStore } from "vuex";
import studentStatus from "@/constants/studentStatus";

export default function useStudents() {
  //instances
  const store = useStore();

  //computed
  const students = computed(() => store.getters["students/getStudents"]);
  const isLoadingStudents = computed(
    () => store.getters["students/getIsLoadingStudents"]
  );
  const studentTypes = computed(() => store.getters["students/getSudentTypes"]);
  const studentStatuses = computed(
    () => store.getters["students/getStudentStatuses"]
  );

  //methods
  const requestGetStudents = async ({ page = 1, take = 10, search = "" }) => {
    await store.dispatch("students/requestGetStudents", {
      page,
      search,
      take,
    });
  };

  const requestGetStudentStatuses = async () => {
    await store.dispatch("students/requestGetEmploeeStatuses");
  };

  const requestGetSudentTypes = async () => {
    await store.dispatch("students/requestGetSudentTypes");
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case studentStatus.ACTIVE:
        statusReturn = "success";
        break;
      case studentStatus.INACTIVE:
        statusReturn = "danger";
        break;
      case studentStatus.INACTIVE_PENDING_PAYMENT:
        statusReturn = "info";
        break;
    }
    return statusReturn;
  };

  return {
    students,
    isLoadingStudents,
    studentStatuses,
    studentTypes,
    requestGetStudents,
    requestGetStudentStatuses,
    requestGetSudentTypes,
    getStatusBadge,
  };
}
