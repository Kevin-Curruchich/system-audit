// export const myMutations = (state)=>{

// }

export const setEmployees = (state, employees) => {
  state.employees = employees;
};

export const setIsLoadingEmployees = (state, val) => {
  state.isLoadingEmployees = val;
};

export const setEmployeeStatuses = (state, val) => {
  state.employeeStatuses = val;
};

export const setEmployeeTypes = (state, val) => {
  state.employeeTypes = val;
};
