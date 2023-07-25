import axios from "axios";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState, loginToken } from "../../Redux/LoginSignUp/action";
import "./styles.css";

const intitalState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginDetails, setUserLoginDetails] = useState(intitalState);

  const session = useSelector((state) => state.auth.session);
  console.log("session:", session);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({
      ...userLoginDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postLoginData(userLoginDetails);
  };

  const postLoginData = (data) => {
    // axios.post(`http://localhost:4040/login`,data).then((res) => {
    // axios.post(`https://safe-woodland-51614.herokuapp.com/login`,data).then((res) => {
    axios
      .post(`https://appartment-manager-backend.onrender.com/login`, data)
      .then((res) => {
        // console.log('res:', res)
        const { data } = res;
        // console.log('dataLogin:', data)

        dispatch(authState(true));
        dispatch(loginToken(data));

        navigate("/");
      })
      .catch((error) => {
        alert("Please try another email or password");
        console.error(error.response.data);
      });
  };

  return (
    <Stack gap={3} as={"div"} className="login__root">
      <h1>Login</h1>
      <h3>
        Welcome <span>{session.name}</span>
      </h3>
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
