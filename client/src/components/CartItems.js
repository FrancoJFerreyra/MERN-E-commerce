import React from "react";
import ProductCard from "./ProductCard";

const CartItems = ({ products, handleRemove, handleQuantity }) => {
  return (
    <div className="row m-0">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} quantity={1} handleQuantity={handleQuantity}>
          <button type="submit" onClick={handleRemove} data-id={product._id} className="btn btn-danger">
            Remove
          </button>
        </ProductCard>
      ))}
    </div>
  );
};

export default CartItems;
