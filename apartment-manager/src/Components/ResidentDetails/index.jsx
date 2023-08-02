import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchFlatDetails,
  removeResidentFromFlat,
} from "../../db/residents/action";
import {
  selectResident,
  selectTotalResident,
} from "../../db/residents/selector";

const SingleFlatDetails = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);
  const isLoggedIn = session?.token;

  const { residentInFlat } = useSelector(selectResident);
  const totalResidentInFlat = useSelector(selectTotalResident);

  const handleRemoveResidentFromFlat = (residentId) => () => {
    const newResidentList = residentInFlat
      .filter((resident) => resident.id !== residentId)
      .map((resident) => resident.id);

    dispatch(removeResidentFromFlat({ id, resident: newResidentList }));
  };

  useEffect(
    function initPage() {
      if (!id) return;
      dispatch(fetchFlatDetails(id));
    },
    [dispatch, id]
  );

  if (totalResidentInFlat === 0) {
    return <h1>Nothing to show</h1>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="people-nearby">
              {residentInFlat.map((resident) => (
                <div className="nearby-user" key={resident.id}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="user"
                        className="profile-photo-lg"
                      />
                    </div>
                    <div className="col-md-7 col-sm-7">
                      <h5>Name: {resident.name}</h5>
                      <p>Gender: {resident.gender}</p>
                      <p className="text-muted">Age: {resident.age}</p>
                    </div>
                    {isLoggedIn ? (
                      <div className="col-md-3 col-sm-3">
                        <button
                          className="btn btn-danger pull-right"
                          onClick={handleRemoveResidentFromFlat(resident.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleFlatDetails;
