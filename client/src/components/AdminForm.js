import React from "react";
import { Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import FormRender from "./FormRender";
import { newProductsError, productInitialValues } from "../formikParameters";

const AdminForm = ({ addedProduct = {}, handleSubmit, toUpdate }) => {
  const renderAdminForm = ({ errors, values }) => (
    <Form className="col-sm-10 col-md-8">
      <div className="d-flex flex-column">
        <label htmlFor="title" className="ps-2">
          Title
        </label>
        <Field className="form-control" type="text" id="title" name="title" placeholder="Adidas All Star" value={values.title} />
        {toUpdate ? null : (
          <ErrorMessage
            name="title"
            component={() => (
              <div>
                <p className="text-danger pt-2 ps-2">{errors.title}</p>
              </div>
            )}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="description" className="ps-2">
          Description
        </label>
        <Field className="form-control" type="description" autoComplete="on" id="description" name="description" placeholder="Zapatillas adidas superstar unisex" value={values.description} />
        {toUpdate ? null : (
          <ErrorMessage
            name="description"
            component={() => (
              <div>
                <p className="text-danger pt-2 ps-2">{errors.description}</p>
              </div>
            )}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="img" className="ps-2">
          Image
        </label>
        <Field className="form-control" type="img" autoComplete="on" id="img" name="img" placeholder="Image url" value={values.img} />
        {toUpdate ? null : (
          <ErrorMessage
            name="img"
            component={() => (
              <div>
                <p className="text-danger pt-2 ps-2">{errors.img}</p>
              </div>
            )}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="price" className="ps-2">
          Price
        </label>
        <Field className="form-control" type="price" autoComplete="on" id="price" name="price" placeholder="Price" value={values.price} />
        {toUpdate ? null : (
          <ErrorMessage
            name="price"
            component={() => (
              <div>
                <p className="text-danger pt-2 ps-2">{errors.price}</p>
              </div>
            )}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="stock" className="ps-2">
          Stock
        </label>
        <Field className="form-control" type="stock" autoComplete="on" id="stock" name="stock" placeholder="5" value={values.stock} />
        {toUpdate ? null : (
          <ErrorMessage
            name="stock"
            component={() => (
              <div>
                <p className="text-danger pt-2 ps-2">{errors.stock}</p>
              </div>
            )}
          />
        )}
      </div>
      <div className="text-center pt-4">
        <button type="submit" className="btn btn-primary">
          {`${toUpdate ? "Update" : "Submit"}`}
        </button>
      </div>
    </Form>
  );
  return (
    <>
      <div>
        <FormRender renderForm={renderAdminForm} onSubmit={handleSubmit} errors={toUpdate ? "" : newProductsError} initialValues={productInitialValues}>
          {toUpdate ? null : (
            <Link className="btn btn-primary" to="/home">
              Go to home
            </Link>
          )}
        </FormRender>
      </div>
      {Object.keys(addedProduct).length > 0 ? (
        <div>
          <div>
            <h2>Added product</h2>
          </div>
          <div className="row m-0">
            <ProductCard product={addedProduct} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminForm;
