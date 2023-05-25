import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import serverRequest from "../api/serverRequest";
import AdminForm from "./AdminForm";

const ModalUpdate = ({ show, setShow, product, setUpdatedProduct }) => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [alertEmpty, setAlertEmpty] = useState(false);

  //Tengo que condicionar el contenido para cuando sea satisfactorio el update, en caso de error mostrar un error

  const handleSubmit = async (values, { resetForm }) => {
    const fieldValues = Object.values(values);
    if (fieldValues.join("").length === 0) {
      setAlertEmpty(true);
      return;
    }
    const newValues = Object.keys(values).reduce((acc, current) => (values[current] ? { ...acc, [current]: values[current] } : acc), {});
    try {
      await serverRequest.put(`/admin/update_product/${product._id}`, newValues);
      setUpdatedProduct({ ...product, ...newValues });
      resetForm();
      // setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update {product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminForm handleSubmit={handleSubmit} toUpdate={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
