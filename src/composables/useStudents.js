import { computed, ref } from "vue";
import { useStore } from "vuex";
import studentStatus from "@/constants/studentStatus";
import studentType from "@/constants/studentType";

export default function useStudents() {
  //instances
  const store = useStore();

  //computed
  const students = computed(() => store.getters["students/getStudents"]);
  const studentsList = computed(
    () => store.getters["students/getStudentsList"]
  );
  const isLoadingStudents = computed(
    () => store.getters["students/getIsLoadingStudents"]
  );
  const studentTypes = computed(() => store.getters["students/getSudentTypes"]);
  const studentTypesTotal = ref(studentTypes.value.length);
  const isLoadingStudentTypes = computed(
    () => store.getters["students/getIsLoadingStudentTypes"]
  );

  const studentStatuses = computed(
    () => store.getters["students/getStudentStatuses"]
  );

  //methods
  const requestGetStudents = async ({ page = 1, take = 10 }) => {
    await store.dispatch("students/requestGetStudents", {
      page,
      take,
    });
  };

  const requestGetStudentsList = async () => {
    await store.dispatch("students/requestGetStudentsList");
  };

  const requestGetStudentStatuses = async () => {
    await store.dispatch("students/requestGetStudentStatuses");
  };

  const requestGetSudentTypes = async () => {
    await store.dispatch("students/requestGetSudentTypes");
  };

  //post request
  const requestPostStudent = async (student) => {
    const resp = await store.dispatch("students/requestPostStudent", student);
    return resp;
  };

  const requestPostStudentType = async (studentType) => {
    const resp = await store.dispatch(
      "students/requestPostStudentType",
      studentType
    );
    return resp;
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
    }
    return statusReturn;
  };

  const getStudentTypeName = (status) => {
    switch (status) {
      case studentType.INTERNAL:
        return "Interno";
      case studentType.EXTERNAL:
        return "Externo";
    }
  };

  return {
    getStatusBadge,
    getStudentTypeName,
    isLoadingStudents,
    isLoadingStudentTypes,
    requestGetStudents,
    requestGetStudentsList,
    requestGetStudentStatuses,
    requestGetSudentTypes,
    requestPostStudent,
    requestPostStudentType,
    students,
    studentsList,
    studentStatuses,
    studentTypes,
    studentTypesTotal,
  };
}
