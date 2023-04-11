import axios from "axios";
import apiConstants from "./apiConstants";
import useAuth from "@/composables/useAuth";

const mayApi = axios.create({ baseURL: apiConstants.API });

mayApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("maypayroll-accesToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor to handle errors and dispatch logout action

mayApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const { logout } = useAuth();
      logout();
    }
    return Promise.reject(error);
  }
);

export default mayApi;
