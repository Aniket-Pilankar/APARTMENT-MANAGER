export function createFlatsFactory(data) {
  return {
    id: data._id,
    role: data.ownerType,
    blockWing: data.Block,
    blockNo: data.BlockNo,
    numberOfResident: data.resident_id.length,
  };
}
