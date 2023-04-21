// export const myGetter = ({commit})=>{
// return state
// }
export const getStudents = (state) => {
  return state.students;
};

export const getIsLoadingStudents = (state) => {
  return state.isLoadingStudents;
};

export const getStudentStatuses = (state) => {
  return state.studentStatuses;
};

export const getSudentTypes = (state) => {
  return state.sudentTypes;
};
