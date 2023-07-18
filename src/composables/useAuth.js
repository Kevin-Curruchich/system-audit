import { computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

const useAuth = () => {
  const router = useRouter();

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signInUser", user);
    return resp;
  };

  const checkAuthentication = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");
    return resp;
  };

  const logout = () => {
    router.push({ name: "login" });
    store.commit("auth/logout");
  };

  return {
    checkAuthentication,
    loginUser,
    logout,

    authStatus: computed(() => store.getters["auth/currentState"]),
    username: computed(() => store.getters["auth/username"]),
    userData: computed(() => store.getters["auth/userData"]),
  };
};

export default useAuth;
