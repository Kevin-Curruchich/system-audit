import { computed } from "vue";
import { useStore } from "vuex";

export default function useCollection() {
  const store = useStore();

  //   computed
  const collections = computed(
    () => store.getters["collections/getCollections"]
  );
  const isLoadingCollections = computed(
    () => store.getters["collections/getIsLoadingCollections"]
  );

  const assignedCollections = computed(
    () => store.getters["collections/getAssignedCollections"]
  );
  const isLoadingAssignedCollections = computed(
    () => store.getters["collections/getIsLoadingAssignedCollections"]
  );

  //methods
  //gets
  const requestGetCollections = async () => {
    await store.dispatch("collections/requestGetCollections");
  };

  const requestGetAssignedCollections = async (params) => {
    const resp = await store.dispatch(
      "collections/requestGetAssignedCollections",
      params
    );

    return resp;
  };

  //post
  const requestPostCollectionStudent = async (params) => {
    const resp = await store.dispatch(
      "collections/requestPostCollectionStudent",
      params
    );

    return resp;
  };

  const collectionId = (id) => {
    return id.substring(0, 8);
  };

  return {
    isLoadingCollections,
    requestGetCollections,
    collectionId,
    collections,
    assignedCollections,
    isLoadingAssignedCollections,
    requestGetAssignedCollections,
    requestPostCollectionStudent,
  };
}
