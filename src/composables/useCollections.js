import { computed, ref } from "vue";
import { useStore } from "vuex";
import collectionStateConstants from "@/constants/collectionStateConstants";

export default function useCollection() {
  const store = useStore();

  //   computed
  const collections = computed(
    () => store.getters["collections/getCollections"]
  );
  const total = computed(() => collections.value.length);
  const isLoadingCollections = computed(
    () => store.getters["collections/getIsLoadingCollections"]
  );

  //refs
  const collectionsPerPage = ref([]);

  //methods
  const requestGetCollections = async () => {
    await store.dispatch("collections/requestGetCollections");
    onChangePage(1);
  };

  const onChangePage = (page) => {
    const collectionsOfCurrentPage = collections.value.slice(
      (page - 1) * 10,
      page * 10
    );

    collectionsPerPage.value = collectionsOfCurrentPage;
  };

  const collectionId = (id) => {
    return id.substring(0, 8);
  };

  const getStatusBadge = (status) => {
    let statusId = status;
    let statusReturn = "";
    switch (statusId) {
      case collectionStateConstants.DRAFT:
        statusReturn = "info";
        break;
      case collectionStateConstants.APPROVE:
        statusReturn = "success";
        break;
      case collectionStateConstants.CANCEL:
        statusReturn = "danger";
        break;
    }
    return statusReturn;
  };

  return {
    isLoadingCollections,
    onChangePage,
    collectionsPerPage,
    requestGetCollections,
    collectionId,
    total,
    getStatusBadge,
  };
}
