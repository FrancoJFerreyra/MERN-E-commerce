import productMongoContainer from "../daos/productsDao.js";
import _loggerW from "../config/winston.js";

const adminAddProds = async (req, res) => {
  const product = req.body;
  _loggerW.info(JSON.stringify(product));
  const addedProduct = await productMongoContainer.save(product);
  res.status(201);
  res.send(addedProduct);
};
const adminDeleteProd = async (req, res) => {
  const id = req.params.id;
  const deleteProd = await productMongoContainer.deleteProdDB(id);
  res.status(202);
  res.send(deleteProd);
};

const adminUpdateProd = (req, res) => {
  const idProd = req.params.id;
  const updatedProd = req.body;
  const updated = productMongoContainer.updateProdDB(idProd, updatedProd);
  res.status(201);
  res.send(updated);
};
export { adminAddProds, adminDeleteProd, adminUpdateProd };
