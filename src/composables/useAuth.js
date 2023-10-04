import { computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import userRole from "../constants/userRole";

const useAuth = () => {
  const router = useRouter();

  //computed
  const authStatus = computed(() => store.getters["auth/currentState"]);
  const username = computed(() => store.getters["auth/username"]);
  const userData = computed(() => store.getters["auth/userData"]);
  const userIsAdmin = computed(() => userData.value?.roleId === userRole.ADMIN);

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signInUser", user);
    return resp;
  };

  const signUpUser = async (user) => {
    const resp = await store.dispatch("auth/signUpUser", user);
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
    authStatus,
    username,
    userData,
    userIsAdmin,
    signUpUser,
  };
};

export default useAuth;
