import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tryLogout } from "../../db/auth/action";
import { Link } from "react-router-dom";
import { selectAuthSession } from "../../db/auth/selector";

const Navbar = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectAuthSession);

  const handleUserLogout = () => {
    dispatch(tryLogout());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            APARTMENT MANAGER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {session?.token ? (
                <>
                  <button
                    type="button "
                    className="btn btn-secondary p-1"
                    onClick={handleUserLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/signUp"} className="nav-link">
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {session?.token ? (
              <li className="nav-item">
                <Link to={"/addFlats"} className="nav-link">
                  Add Flats
                </Link>
              </li>
            ) : (
              <li className="nav-item">Register Yourself To Add Flats</li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
