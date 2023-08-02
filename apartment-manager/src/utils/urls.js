// chnage * to original path one backend is done

export const urls = Object.freeze({
  register: "/register",
  login: "/login",
  getAllFlats: "/flat",
  getAllFlatsSortBy: (sortBy) => `/flat/sortBy/${sortBy}`,
  getFlatsById: (id) => `/flat/${id}`,
  addResident: "/resident",
});
