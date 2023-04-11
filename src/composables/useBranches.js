import { computed } from "vue";
import { useStore } from "vuex";

export default function useBranches() {
  const store = useStore();

  const getBranches = async () => {
    await store.dispatch("branches/requestGetBranches");
  };

  return {
    branches: computed(() => store.getters["branches/getBranches"]),
    isLoadingBranches: computed(
      () => store.getters["branches/getIsLoadingBranches"]
    ),
    getBranches,
  };
}
