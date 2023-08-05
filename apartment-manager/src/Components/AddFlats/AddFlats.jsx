import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createFlat } from "../../db/flats/action";
import { fetchAllResident } from "../../db/residents/action";

const initialState = {
  ownerType: "",
  Block: "",
  BlockNo: "",
  resident_id: "",
};

const AddFlats = () => {
  const [addFlatData, setAddFlatData] = useState(initialState);
  const [allResidentList, setAllResidentList] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFlatData({
      ...addFlatData,
      [name]: value,
    });
  };
  console.log("addFlatData:", addFlatData);

  const createFlatPromise = async () => {
    return new Promise((res, rej) => {
      return dispatch(createFlat({ ...addFlatData, res }));
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await createFlatPromise();
      alert("Flat created Successfully");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getPromise = useCallback(async () => {
    return new Promise((res, rej) => {
      return dispatch(fetchAllResident({ res }));
    });
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const result = await getPromise();
      setAllResidentList(result);
    })();
  }, [getPromise]);

  return (
    <div>
      <div className="w-25 p-3 m-auto">
        <h1>Add Flats</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="addFlat-ownerType" className="form-label ">
              Enter Owner Type
            </label>
            <input
              type="text"
              className="form-control"
              id="addFlat-ownerType"
              name="ownerType"
              onChange={handleChange}
              placeholder="Owner or Tenant"
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="addFlat-Block" className="form-label">
              Enter Block Type
            </label>
            <input
              type="text"
              className="form-control"
              id="addFlat-Block"
              name="Block"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addFlat-BlockNo" className="form-label">
              Enter Block Number
            </label>
            <input
              type="number"
              className="form-control"
              id="addFlat-BlockNo"
              name="BlockNo"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="resident_id"
              value={addFlatData.resident_id}
              onChange={handleChange}
              style={{ width: "auto" }}
            >
              <option value={""}>Enter Resident to add to Flat</option>
              {allResidentList.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name} ({e.gender})
                </option>
              ))}
            </select>
          </div>

          <input
            type="submit"
            className="btn btn-primary"
            value={"Add FLat to the list"}
          />
        </form>
      </div>
    </div>
  );
};

export default AddFlats;
