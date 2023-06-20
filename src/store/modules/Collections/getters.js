export const getCollections = (state) => {
  return state.collections;
};
export const getIsLoadingCollections = (state) => {
  return state.isLoadingCollection;
};

export const getAssignedCollections = (state) => {
  return state.assignedCollections;
};
export const getIsLoadingAssignedCollections = (state) => {
  return state.isLoadingAssignedCollections;
};

export const getCollectionsOwedByStudent = (state) => {
  return state.collectionsOwedByStudent;
};

export const getIsLoadingCollectionsOwedByStudent = (state) => {
  return state.isLoadingCollectionsOwedByStudent;
};

export const getCollectionsByStudent = (state) => {
  return state.collectionsByStudent;
};

export const getIsLoadingCollectionsByStudent = (state) => {
  return state.isLoadingCollectionsByStudent;
};
