import useAuth from "@/composables/useAuth";

const isAuthenticatedGuard = async (to, from, next) => {
  const { checkAuthentication } = useAuth();

  const { ok } = await checkAuthentication();

  if (ok) next();
  else next({ name: "login" });
};

export default isAuthenticatedGuard;
