import React from "react";
import { useNavigate } from "react-router-dom";
import image_notFound from "./notFoundImage.jpg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={image_notFound} alt="Error Page Not Found" width={"50%"} />
      <br />
      <br />
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Go To Home Page
      </button>
    </div>
  );
};

export default NotFound;
