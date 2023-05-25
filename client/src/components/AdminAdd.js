import { useState, useEffect } from "react";
import Header from "./Header";
import serverRequest from "../api/serverRequest";
import AdminForm from "./AdminForm";
import { useNavigate } from "react-router-dom";

const AdminAddForm = () => {
  const [addedProduct, setAddedProduct] = useState({});
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await serverRequest.get("/verify_auth/");
      } catch (error) {
        setUnauthorized(true);
        navigate("/");
      }
    })();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    resetForm();
    try {
      await serverRequest.post("/admin/add_product", values);
      setAddedProduct(values);
      alert("Agregado con exito.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header admin={true} />
      <div className="container-xxl">
        <div className="text-center">
          <h1>Add new product</h1>
        </div>
        <AdminForm handleSubmit={handleSubmit} addedProduct={addedProduct} toUpdate={false} />
      </div>
    </>
  );
};

export default AdminAddForm;
