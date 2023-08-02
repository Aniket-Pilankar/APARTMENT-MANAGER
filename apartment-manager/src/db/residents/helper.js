export function createResidentFactory({ resident }) {
  const { _id, gender, name, age } = resident;

  return {
    id: _id,
    gender,
    name,
    age,
  };
}

export function getResident({ residentInFlat, newResident: resident }) {
  const newMember = createResidentFactory({ resident });
  const newList = [...residentInFlat, newMember].map((resident) => resident.id);
  return newList;
}
