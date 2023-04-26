// export const myGetter = ({commit})=>{
// return state
// }
export const getStudents = (state) => {
  return state.students;
};

export const getIsLoadingStudents = (state) => {
  return state.isLoadingStudents;
};

export const getStudentById = (state) => {
  return state.student;
};

export const getIsLoadingStudent = (state) => {
  return state.isLoadingStudent;
};

export const getStudentStatuses = (state) => {
  return state.studentStatuses;
};

export const getSudentTypes = (state) => {
  return state.studentTypes;
};

export const getIsLoadingStudentTypes = (state) => {
  return state.isLoadingStudentTypes;
};
