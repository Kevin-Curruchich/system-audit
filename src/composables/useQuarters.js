import { computed } from "vue";
import { useStore } from "vuex";

const useQuarters = () => {
  const store = useStore();

  //getters
  const quarters = computed(() => store.getters["quarters/getQuarters"]);
  const isLoadingQuarters = computed(
    () => store.getters["quarters/getIsLoadingQuarters"]
  );

  const quartersList = computed(
    () => store.getters["quarters/getQuartersList"]
  );

  //methods
  const requestGetQuartres = async (params = { page: 1, take: 10 }) => {
    const resp = await store.dispatch("quarters/requestGetQuartres", params);
    return resp;
  };

  const requestGetQuartresList = async () => {
    const resp = await store.dispatch("quarters/requestGetQuartresList");
    return resp;
  };

  return {
    quarters,
    isLoadingQuarters,
    requestGetQuartres,
    requestGetQuartresList,
    quartersList,
  };
};

export default useQuarters;
