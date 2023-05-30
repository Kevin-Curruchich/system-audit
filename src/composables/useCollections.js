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

  const collectionsByStudent = computed(
    () => store.getters["collections/getCollectionsByStudent"]
  );

  const isLoadingCollectionsByStudent = computed(
    () => store.getters["collections/getIsLoadingCollectionsByStudent"]
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

  const requestGetCollectionsOwedByStudent = async (studentId) => {
    const resp = await store.dispatch(
      "collections/requestGetCollectionsOwedByStudent",
      studentId
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
    assignedCollections,
    collectionId,
    collections,
    collectionsByStudent,
    isLoadingAssignedCollections,
    isLoadingCollections,
    isLoadingCollectionsByStudent,
    requestGetAssignedCollections,
    requestGetCollections,
    requestGetCollectionsOwedByStudent,
    requestPostCollectionStudent,
  };
}
