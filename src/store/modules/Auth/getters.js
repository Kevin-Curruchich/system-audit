// export const myGetter = ({commit})=>{
// return state
// }

export const currentState = (state) => {
  return state.status;
};

export const username = (state) => {
  return state.user?.name || "";
};

export const userData = (state) => {
  return state.user;
};
