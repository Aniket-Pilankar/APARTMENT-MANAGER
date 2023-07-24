import { setError } from "../Redux/App/action";
import { store } from "../Redux/store";
import request from "./request";

export default function registerInterceptors() {
  // Add a request interceptor
  request.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  request.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("error:", error);
      if (error.response) {
        const message =
          error.response.data.message ||
          "Some error occured, please try after sometime. If the issue persists, please contact us.";

        store.dispatch(setError(message));
      }

      return Promise.reject(error);
    }
  );
}
