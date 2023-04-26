// export const myMutations = (state)=>{

// }

export const setStudents = (state, students) => {
  state.students = students;
};

export const setIsLoadingStudents = (state, val) => {
  state.isLoadingStudents = val;
};

export const setStudentById = (state, student) => {
  state.student = student;
};

export const setIsLoadingStudent = (state, val) => {
  state.isLoadingStudent = val;
};

export const setStudentStatuses = (state, val) => {
  state.studentStatuses = val;
};

export const setSudentTypes = (state, val) => {
  state.studentTypes = val;
};

export const setIsLoadingStudentTypes = (state, val) => {
  state.isLoadingStudentTypes = val;
};
