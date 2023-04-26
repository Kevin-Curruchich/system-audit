import { computed } from "vue";
import { useStore } from "vuex";

export default function useStudent() {
  //instances
  const store = useStore();

  //computed
  const student = computed(() => store.getters["students/getStudentById"]);
  const isLoadingStudent = computed(
    () => store.getters["students/getIsLoadingStudent"]
  );

  //methods
  const requestGetStudentById = async (id) => {
    const resp = await store.dispatch("students/requestGetStudentById", id);
    return resp;
  };

  return {
    student,
    isLoadingStudent,
    requestGetStudentById,
  };
}
