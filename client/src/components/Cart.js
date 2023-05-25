import React from "react";
import Header from "./Header";
import serverRequest from "../api/serverRequest";
import { handleError } from "../utils/handleErrors";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Unauthorized from "./Unauthorized";
import useFetch from "../customHooks/useFetch";
import UseTimer from "../customHooks/useTimer";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const navigate = useNavigate();
  const show = UseTimer();

  const { isAuthorized, setIsAuthorized, obtainedData, setObtainedData } = useFetch("/content/cart");

  const total = obtainedData.reduce((acc, current) => {
    if (current.quantity) {
      return acc + current.price * current.quantity;
    }
    return acc + current.price;
  }, 0);

  const handleQuantity = (e) => {
    const quantity = e.target.value;
    const id = e.target.dataset.id;
    const newQuantitiesPrice = obtainedData.map((prod) => {
      if (prod._id === id) {
        return { ...prod, ["quantity"]: quantity };
      }
      return prod;
    });
    setObtainedData(newQuantitiesPrice);
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await serverRequest.delete(`/content/cart/${e.target.dataset.id}`);
      const newCart = obtainedData.filter((product) => product._id !== e.target.dataset.id);
      setObtainedData(newCart);
    } catch (error) {
      handleError(error, setIsAuthorized);
    }
  };

  const handleBuyClick = async (e) => {
    e.preventDefault();
    try {
      await serverRequest.get("/content/cart/buy");
      setObtainedData([]);
    } catch (error) {
      handleError(error, setIsAuthorized);
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await serverRequest.get("/content/cart/empty");
      setObtainedData([]);
      // alert('carrito vaciado con exito');
    } catch (error) {
      handleError(error, setIsAuthorized);
    }
  };

  const products = (
    <>
      <div className="row m-0">
        {obtainedData.map((product) => (
          <ProductCard key={product._id} product={product} quantity={1} handleQuantity={handleQuantity}>
            <button type="submit" onClick={handleRemove} data-id={product._id} className="btn btn-danger">
              Remove
            </button>
          </ProductCard>
        ))}
      </div>
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
    </>
  );

  return (
    <>
      {isAuthorized ? (
        <>
          <Header />
          <div className="container-xxl">
            <div className="text-center">
              <h1>Cart</h1>
            </div>
            {show ? obtainedData.length > 0 ? products : <EmptyCart /> : null}
          </div>
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Cart;
