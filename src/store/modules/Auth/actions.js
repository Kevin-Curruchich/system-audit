import mayApi from "@/apis/mayApi";

export const signInUser = async ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    mayApi
      .post("/auth/signin", user)
      .then((response) => {
        commit("loginUser", response.data);
        resolve({ ok: true });
      })
      .catch(() => {
        reject({ ok: false });
      });
  });
};

export const checkAuthentication = async ({ commit }) => {
  const mayAccesToken = localStorage.getItem("maypayroll-accesToken");

  if (!mayAccesToken) {
    commit("logout");
    return { ok: false, message: "No estas autorizado" };
  }
  return { ok: true };

  // try {
  //   const { data } = await mayApi.post(":lookup", { idToken });
  //   const { displayName, email } = data.users[0];

  //   const user = {
  //     name: displayName,
  //     email,
  //   };

  //   commit("loginUser", { user, idToken, refreshToken });

  //   return { ok: true };
  // } catch (error) {
  //   commit("logout");
  //   return { ok: false, message: error.response.data.error.message };
  // }
};
