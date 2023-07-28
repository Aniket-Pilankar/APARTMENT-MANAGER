export const selectAllFlats = (state) => {
  const { flats } = state.db;
  const result = [];

  for (const flatId of flats.order) {
    result.push(flats.byId[flatId]);
  }

  console.log("result:", result);
  return { allFlats: result };
};

export const selectTotalFlatPages = (state) => state.db.flats.total;
