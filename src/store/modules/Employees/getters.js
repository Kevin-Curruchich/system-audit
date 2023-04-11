// export const myGetter = ({commit})=>{
// return state
// }
export const getEmployees = (state) => {
  return state.employees;
};

export const getIsLoadingEmployees = (state) => {
  return state.isLoadingEmployees;
};

export const getEmployeeStatuses = (state) => {
  return state.employeeStatuses;
};

export const getEmployeeTypes = (state) => {
  return state.employeeTypes;
};
