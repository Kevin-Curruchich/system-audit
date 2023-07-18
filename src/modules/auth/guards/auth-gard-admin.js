import useAuth from "@/composables/useAuth";
import userRole from "@/constants/userRole";

const isAdminUser = async (to, from, next) => {
  const { userData, logout } = useAuth();

  const ok = (await userData.value.roleId) === userRole.ADMIN;

  if (ok) {
    next();
  } else {
    next({ name: "login" });
    logout();
  }
};

export default isAdminUser;
