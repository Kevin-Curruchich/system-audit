import useAuth from "@/composables/useAuth";
import userRole from "@/constants/userRole";

const isAdminUser = async (to, from, next) => {
  const { userData, logout } = useAuth();

  const ok = (await userData.value.roleId) === userRole.ADMIN;
  const ok2 = (await userData.value.roleId) === userRole.ACADEMIC;

  if (ok) {
    next();
  }
  if (ok2) {
    next();
  } else {
    next({ name: "login" });
    logout();
  }
};

export default isAdminUser;
