import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div>
      <div className="text-center pt-4">
        <h2>Cart it's empty</h2>
      </div>
      <div className="text-center pt-3">
        <Link to="/home" className="btn btn-primary">
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
