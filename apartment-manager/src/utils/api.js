import request from "./request";
import { urls } from "./urls";

export const checkSignupEmail = async (payload) => {
  console.log("payload:", payload);
  const data = request.post(urls.register, payload);
  return data;
};
