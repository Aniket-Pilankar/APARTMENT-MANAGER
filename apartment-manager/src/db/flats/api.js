import axios from "axios";
import request from "../../utils/request";
import { urls } from "../../utils/urls";

export const getAllFlats = async ({ page, size }) => {
  const { data } = await request.get(urls.getAllFlats, {
    params: { page, size },
  });
  return data;
};

export const getAllFlatsSorted = async ({ sortBy, page, size }) => {
  console.log("sortBy:", sortBy);
  const { data } = await request.get(urls.getAllFlatsSortBy(sortBy), {
    params: { page, size },
  });
  return data;
};
