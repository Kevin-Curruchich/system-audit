// export const myMutations = (state)=>{

// }

export const loginUser = (state, data) => {
  localStorage.setItem("maypayroll-accesToken", data.accesToken);
  state.user = data.user;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.status = "no-authenticated";
  localStorage.removeItem("maypayroll-accesToken");
};
