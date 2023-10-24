import useAuth from "@/composables/useAuth";
import userRole from "@/constants/userRole";

const isAcademicUser = async (to, from, next) => {
  const { userData, logout } = useAuth();

  const ok = (await userData.value.roleId) === userRole.ACADEMIC;

  if (ok) {
    next();
  } else {
    next({ name: "login" });
    logout();
  }
};

export default isAcademicUser;
