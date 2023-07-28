import request from "../../utils/request";
import { urls } from "../../utils/urls";

export const checkSignupEmail = async (payload) => {
  const data = request.post(urls.register, payload);
  return data;
};

export const login = async (payload) => {
  const response = await request.post(urls.login, payload);
  return response.data;
};
