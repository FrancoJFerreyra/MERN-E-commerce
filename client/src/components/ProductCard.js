import React from "react";

const ProductCard = ({ product, children, quantity, handleQuantity }) => {
  const optionsList = [...Array(product.stock).keys()].map((n) => (
    <option key={n}>{n + 1}</option>
  ));

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="card">
        <img src={product.img} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <ul className="pb-2 ps-3">
            <li>{product.description}</li>
            <li>Price: {product.price}usd</li>
            {quantity ? (
              <li>
                <label className="input-group-text" htmlFor="quantity">
                  Quantity
                </label>
                <select
                  data-id={product._id}
                  onChange={handleQuantity}
                  className="form-select"
                >
                  {optionsList}
                </select>
              </li>
            ) : (
              <li>Stock: {product.stock}</li>
            )}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
