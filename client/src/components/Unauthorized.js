import React from "react";
import Spinner from "./Spinner";

const Unauthorized = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-danger">
          You need login to see this page. Redirecting...
        </h1>
      </div>
    </>
  );
};

export default Unauthorized;
