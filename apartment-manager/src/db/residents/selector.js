export const selectResident = (state) => {
  const { resident } = state.db;

  const residentInFlat = [];

  if (!resident.byId) {
    return {
      residentInFlat,
    };
  }

  for (const people of Object.values(resident.byId)) {
    residentInFlat.push(people);
  }

  return {
    residentInFlat,
  };
};

export const selectTotalResident = (state) => state.db.resident.total;
