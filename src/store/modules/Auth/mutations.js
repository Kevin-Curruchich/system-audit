// export const myMutations = (state)=>{

// }

export const loginUser = (state, data) => {
  localStorage.setItem("sbg-admin-access-token", data.accessToken);
  localStorage.setItem("sbg-admin-refresh-token", data.refreshToken);
  state.user = data.user;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.status = "no-authenticated";
  localStorage.removeItem("sbg-admin-access-token");
  localStorage.removeItem("sbg-admin-refresh-token");
};
