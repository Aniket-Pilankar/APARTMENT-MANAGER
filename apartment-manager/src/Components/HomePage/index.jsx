import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIsUserLoggedIn } from "./helper";
import { selectAuthSession } from "../../db/auth/selector";
import { selectAllFlats, selectTotalFlatPages } from "../../db/flats/selector";
import { fetchFlatBySort, fetchFlats } from "../../db/flats/action";
import { Button, Form } from "react-bootstrap";
import { urls } from "../../utils/urls";

const HomePage = () => {
  const dispatch = useDispatch();

  const [page, setpage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [size, setsize] = useState(5);
  const sortByRefValue = useRef(0);
  const isPageOnceLoaded = useRef(false);

  const session = useSelector(selectAuthSession);
  const { allFlats } = useSelector(selectAllFlats);
  const totalPages = useSelector(selectTotalFlatPages);

  const isLoggedIn = getIsUserLoggedIn(session);

  const handlePageNumber = (value) => {
    setpage((prev) => prev + value);
  };

  async function getPromise(pageNo, sortBy) {
    return new Promise((res, rej) =>
      dispatch(
        fetchFlatBySort({
          sortBy: sortByRefValue.current,
          page: pageNo,
          size,
          res,
        })
      )
    );
  }

  const nextPage = (value) => async () => {
    const pageNo = page + value;
    if (pageNo > totalPages) return;

    handlePageNumber(value);

    if (sortByRefValue.current === 0) {
      dispatch(fetchFlats({ page: pageNo, size }));
    } else {
      await getPromise(pageNo);
    }
  };

  const prevPage = (value) => async () => {
    const pageNo = page + value;
    if (pageNo <= 0) return;

    handlePageNumber(value);

    if (sortByRefValue.current === 0) {
      dispatch(fetchFlats({ page: pageNo, size }));
    } else {
      await getPromise(pageNo);
    }
  };

  const handleChange = async (e) => {
    const sortBy = e.target.value;
    sortByRefValue.current = sortBy;
    setpage(1);
    await getPromise(page);
  };

  useEffect(
    function initPage() {
      if (isPageOnceLoaded.current) return;
      dispatch(fetchFlats({ page, size }));
      isPageOnceLoaded.current = true;
    },
    [dispatch, page, size]
  );

  return (
    <div>
      <h2>Flat Details</h2>
      <div
        className=" mx-auto d-flex justify-content-between"
        style={{ width: "70%" }}
      >
        <div aria-label="Page navigation example m-auto">
          <ul className="pagination">
            <li className="page-item">
              <Button variant="primary" onClick={prevPage(-1)}>
                Previous
              </Button>{" "}
            </li>
            <li className="page-item">
              <Button variant="primary" onClick={nextPage(1)}>
                Next
              </Button>{" "}
            </li>
          </ul>
        </div>

        <Form.Select
          aria-label="Default select example"
          onChange={handleChange}
          size="sm"
          style={{ width: "auto" }}
        >
          <option value={0} disabled={sortByRefValue.current !== 0}>
            Sort block number
          </option>
          <option value={1}>Ascending</option>
          <option value={-1}>Descending</option>
        </Form.Select>

        <div aria-label="Page navigation example m-auto">
          <ul className="pagination">
            <li className="page-item page-link">Total Pages</li>
            <li className="page-item page-link">{totalPages}</li>
          </ul>
        </div>
      </div>
      <table className="table  w-50 m-auto table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Sr no</th>
            <th scope="col">Role</th>
            <th scope="col">Block</th>
            <th scope="col">Wing</th>
            <th scope="col">Number of Resident</th>
            <th scope="col">Resident Details</th>
            {isLoggedIn ? <th scope="col">Add Resident</th> : null}
          </tr>
        </thead>
        <tbody>
          {allFlats.map((flat, index) => (
            <tr key={flat.id}>
              <td>{index + 1}</td>
              <td>{flat.role}</td>
              <td>{flat.blockNo}</td>
              <td>{flat.blockWing}</td>
              <td>{flat.numberOfResident}</td>
              <td>
                <Link to={urls.getFlatsById(flat.id)}>
                  <button type="button" className="btn btn-info">
                    Info
                  </button>
                </Link>
              </td>
              {isLoggedIn && (
                <td>
                  <Link to={`/addResident/${flat.id}`}>
                    <button type="button" className="btn btn-warning">
                      Add
                    </button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
