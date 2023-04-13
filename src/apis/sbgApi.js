import axios from "axios";
import apiConstants from "./apiConstants";
import useAuth from "@/composables/useAuth";

const sbgApi = axios.create({ baseURL: apiConstants.API });

sbgApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sbg-admin-access-token");
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

sbgApi.interceptors.response.use(
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

export default sbgApi;
