import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkSignupEmail } from "../../Redux/auth/action";
import { urls } from "../../utils/urls";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  async function getPromise() {
    return new Promise((res, rej) =>
      dispatch(checkSignupEmail({ ...userDetails, res, rej }))
    );
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await getPromise();
      setUserDetails(initialState);
      alert(`${response.name} you have been successfully sign-in`);
      navigate(urls.login);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-25 p-3 m-auto">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="signUp-name" className="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="signUp-name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="signUp-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="signUp-email"
            aria-describedby="emailHelp"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUp-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="signUp-password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value={"Submit"} />
      </form>
    </div>
  );
};

export default SignUp;
