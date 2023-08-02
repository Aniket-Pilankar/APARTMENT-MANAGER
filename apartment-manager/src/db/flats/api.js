import request from "../../utils/request";
import { urls } from "../../utils/urls";

export const getAllFlats = async (payload) => {
  const { data } = await request.get(
    urls.getAllFlats,
    payload
      ? {
          params: { page: payload.page, size: payload.size },
        }
      : undefined
  );
  return data;
};

export const getAllFlatsSorted = async ({ sortBy, page, size }) => {
  console.log("sortBy:", sortBy);
  const { data } = await request.get(urls.getAllFlatsSortBy(sortBy), {
    params: { page, size },
  });
  return data;
};
