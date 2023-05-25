import { useCallback } from "react";
import Header from "./Header";
import serverRequest from "../api/serverRequest";
import { handleError } from "../utils/handleErrors";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";
import Unauthorized from "./Unauthorized";
import useFetch from "../customHooks/useFetch";
import UseTimer from "../customHooks/useTimer";
import EmptyCart from "./EmptyCart";
import CartControls from "./CartControls";

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

  const handleQuantity = useCallback(
    (e) => {
      const quantity = e.target.value;
      const id = e.target.dataset.id;
      const newQuantitiesPrice = obtainedData.map((prod) => {
        if (prod._id === id) {
          return { ...prod, quantity: quantity };
        }
        return prod;
      });
      setObtainedData(newQuantitiesPrice);
    },
    [obtainedData]
  );

  const handleRemove = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await serverRequest.delete(`/content/cart/${e.target.dataset.id}`);
        const newCart = obtainedData.filter((product) => product._id !== e.target.dataset.id);
        setObtainedData(newCart);
      } catch (error) {
        handleError(error, setIsAuthorized);
      }
    },
    [obtainedData]
  );

  const handleBuyClick = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await serverRequest.get("/content/cart/buy");
        setObtainedData([]);
      } catch (error) {
        handleError(error, setIsAuthorized);
      }
    },
    [setObtainedData]
  );

  const handleDeleteClick = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await serverRequest.get("/content/cart/empty");
        setObtainedData([]);
        // alert('carrito vaciado con exito');
      } catch (error) {
        handleError(error, setIsAuthorized);
      }
    },
    [setObtainedData]
  );

  const products = (
    <>
      <CartItems products={obtainedData} handleQuantity={handleQuantity} handleRemove={handleRemove} />
      <CartControls handleBuyClick={handleBuyClick} handleDeleteClick={handleDeleteClick} total={total} />
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
