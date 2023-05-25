import React from "react";

const CartControls = ({ total, handleBuyClick, handleDeleteClick }) => {
  return (
    <div className="text-center">
      <div className="pb-3 pt-3">
        <h6>Total = {total} usd</h6>
      </div>
      <div className="pb-4">
        <button type="submit" onClick={handleBuyClick} className="btn btn-success">
          Buy cart
        </button>
        <button type="submit" onClick={handleDeleteClick} className="btn btn-danger">
          Empty cart
        </button>
      </div>
    </div>
  );
};

export default CartControls;
