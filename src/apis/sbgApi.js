import axios from "axios";
import apiConstants from "./apiConstants";
import store from "@/store";
import router from "../router";
// import useAuth from "@/composables/useAuth";

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
    if (
      error.response.status === 401 &&
      error.response.data.message === "TokenExpiredError"
    ) {
      const originalRequest = error.config;

      sbgApi
        .post("/refreshToken", {
          refreshToken: localStorage.getItem("sbg-admin-refresh-token"),
        })
        .then((response) => {
          store.mutate("auth/loginUser", response.data);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          return sbgApi(originalRequest);

          // localStorage.setItem(
          //   "sbg-admin-access-token",
          //   response.data.accessToken
          // );
          // localStorage.setItem(
          //   "sbg-admin-refresh-token",
          //   response.data.refreshToken
          // );
          // store.commit("auth/setAccessToken", response.data.accessToken);
          // store.commit("auth/setRefreshToken", response.data.refreshToken);

          // const config = error.config;
          // config.headers[
          //   "Authorization"
          // ] = `Bearer ${response.data.accessToken}`;
          // return sbgApi.request(config);
        })
        .catch((error) => {
          console.log({ error });
          store.commit("auth/logout");
          router.push({ name: "login" });
        });
    }
    // else {
    //   store.commit("auth/logout");
    //   router.push({ name: "login" });
    // }
    return Promise.reject(error);
  }
);

export default sbgApi;
