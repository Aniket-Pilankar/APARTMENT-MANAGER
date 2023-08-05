import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addResident } from "../../db/residents/action";
import "./AddResident.css";

const initialState = {
  name: "",
  gender: "",
  age: "",
};

const AddResident = () => {
  const { flatId } = useParams();
  const dispatch = useDispatch();

  const [newResident, setNewResident] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewResident({
      ...newResident,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addResident({ id: flatId, body: newResident }));

    setNewResident(initialState);
  };

  return (
    <div>
      <div className="w-25 p-3 m-auto">
        <h1>Add Resident</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="addFlat-name" className="form-label ">
              Enter Resident Name
            </label>
            <input
              type="text"
              className="form-control"
              id="addFlat-name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <select
            className="addFlat-gender mb-3"
            name="gender"
            value={newResident.gender}
            onChange={handleChange}
          >
            <option value={""}>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className="mb-3">
            <label htmlFor="addFlat-age" className="form-label">
              Enter Resident Age
            </label>
            <input
              type="number"
              className="form-control"
              id="addFlat-age"
              name="age"
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary"
            value="Add Resident to the Flat list"
          />
        </form>
      </div>
    </div>
  );
};

export default AddResident;
