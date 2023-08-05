import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthSession } from "../../db/auth/selector";
import { tryLogin } from "../../db/auth/action";
import "./styles.css";

const intitalState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginDetails, setUserLoginDetails] = useState(intitalState);

  const session = useSelector(selectAuthSession);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({
      ...userLoginDetails,
      [name]: value,
    });
  };

  async function getPromise() {
    return new Promise((res, rej) =>
      dispatch(tryLogin({ ...userLoginDetails, res, rej }))
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedInSuccessfully = await getPromise();

    if (isLoggedInSuccessfully) {
      setUserLoginDetails(intitalState);
      navigate("/");
    }
  };

  return (
    <Stack gap={3} as={"div"} className="login__root">
      <h1>Login</h1>
      {session?.name && (
        <h3>
          Welcome <span>{session?.name}</span>
        </h3>
      )}
      <div className="w-25 p-3 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="login-email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              aria-describedby="emailHelp"
              name="email"
              value={userLoginDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              name="password"
              value={userLoginDetails.password}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value={"Submit"} />
        </form>
      </div>
    </Stack>
  );
};

export default Login;
