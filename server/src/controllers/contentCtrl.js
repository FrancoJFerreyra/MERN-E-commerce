import userMongoContainer from "../daos/userDao.js";
import productMongoContainer from "../daos/productsDao.js";
import { sendEmail, mailOptions } from "../msjs/nodemailer.js";
import _loggerW from "../config/winston.js";

const deleteCartProducts = async (id) => {
  return await userMongoContainer.emptyCart(id);
};

const getProducts = async (req, res) => {
  try {
    const products = await productMongoContainer.listAll();
    if (req.user.role == 2) {
      const admin = req.user.role;
      res.send({ admin, products });
    } else {
      console.log(products);
      res.send({ products });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
};

const getUserData = (req, res) => {
  const { avatar, email, direction, username, lastname, age, phone } = req.user;
  res.send([
    {
      avatar,
      email,
      direction,
      username,
      lastname,
      age,
      phone,
    },
  ]);
};

const getCart = async (req, res) => {
  const userDoc = await userMongoContainer.getOneDoc(req.user.id);
  const cart = userDoc.cart;
  res.send(cart);
};

const addProductsToCart = async (req, res) => {
  const prodId = req.params.id;
  const prodDoc = await productMongoContainer.getOneDoc(prodId);
  const addProd = userMongoContainer.addProd(prodDoc, req.user.id);
  res.send(addProd);
};

const removeProduct = async (req, res) => {
  const prodId = req.params.id;
  const deleteProd = await userMongoContainer.deleteCartProd(
    prodId,
    req.user.id
  );
  res.send(deleteProd);
};

const emptyCart = async (req, res) => {
  res.send(deleteCartProducts(req.user.id));
};

const buyCart = async (req, res) => {
  const userId = req.user.id;
  const { cart, email, username, phone } = await userMongoContainer.getOneDoc(
    userId
  );
  const subject = `Nuevo pedido de ${username}, email: ${email}. `;
  mailOptions.subject = subject;
  mailOptions.html += `
    <table>
    <tr>${cart.map((product) => `<td>${product.title}</td>`)}</tr>
    <tr>${cart.map((product) => `<td>${product.price}</td>`)}</tr>
    <tr><td><p>Total: ${cart.reduce(
      (acc, current) => acc + current.price,
      0
    )}</p></td></tr>
  </table>
	    `;
  sendEmail(mailOptions);
  _loggerW.info("Email enviado");
  res.send(deleteCartProducts(userId));
};

export {
  getProducts,
  getUserData,
  getCart,
  addProductsToCart,
  removeProduct,
  buyCart,
  emptyCart,
};
