import request from "../../utils/request";
import { urls } from "../../utils/urls";

export const fetchFlatById = async (id) => {
  const { data } = await request.get(urls.getFlatsById(id));
  return data;
};

export const updateResidentFromFlat = async ({ id, residents }) => {
  const { data } = await request.patch(urls.getFlatsById(id), {
    resident_id: residents,
  });
  return data;
};

export const addResident = async (payload) => {
  const { data } = await request.post(urls.addResident, payload);
  return data;
};

export const getAllResident = async () => {
  const { data } = await request.get(urls.addResident);
  return data;
};
