import { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import serverRequest from "../api/serverRequest";
import { Link } from "react-router-dom";
import ModalUpdate from "./ModalUpdate";
import { handleError } from "../utils/handleErrors";

const HomeContent = ({ listOfProducts = [], admin, setIsAuthorized }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const allProducts = listOfProducts.map((product) => {
    if (product._id === updatedProduct._id) {
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  const handleShowModal = useCallback(
    (e) => {
      const product = listOfProducts.filter((prod) => prod._id === e.target.dataset.id);
      setUpdatedProduct(product[0]);
      setShowModal(true);
    },
    [listOfProducts]
  );

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await serverRequest.post(`/content/cart/${e.target.dataset.id}`);
      alert("Producto agregado");
    } catch (error) {
      handleError(error, setIsAuthorized);
    }
  };

  const handleRemoveDB = async (e) => {
    e.preventDefault();
    try {
      const remove = await serverRequest.delete(`/admin/delete_product/${e.target.dataset.id}`);
      console.log(remove);
    } catch (error) {
      handleError(error, setIsAuthorized);
    }
  };

  return (
    <div className="container-xxl home__container">
      <ModalUpdate show={showModal} setShow={setShowModal} product={updatedProduct} setUpdatedProduct={setUpdatedProduct} />
      <div className="text-center">
        <h1>MERN Stack e-commerce</h1>
      </div>
      <div className="home__container--productsList">
        <div>
          <h2>Products</h2>
        </div>
        <div className="container-md productsList__container">
          <div className="row productList__item--container">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product}>
                {admin ? (
                  <>
                    <button type="submit" onClick={handleRemoveDB} data-id={product._id} className="btn btn-danger">
                      Remove
                    </button>
                    <button type="button" onClick={handleShowModal} data-id={product._id} className="btn btn-light">
                      Update
                    </button>
                  </>
                ) : (
                  <button type="submit" onClick={handleAddToCart} data-id={product._id} className="btn btn-primary">
                    Add to cart
                  </button>
                )}
              </ProductCard>
            ))}
          </div>
        </div>
        {admin ? (
          <div className="text-end">
            <Link to="/add_product">
              <i className="fa-solid fa-plus p-4 addProduct__icon"></i>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomeContent;
