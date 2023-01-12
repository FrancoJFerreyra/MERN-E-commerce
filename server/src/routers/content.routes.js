import express from 'express';
const { Router } = express;
import { checkAuthentication } from '../controllers/middlewares.js';
import {
	getProducts,
	getUserData,
	getCart,
	addProductsToCart,
	removeProduct,
	buyCart,
	emptyCart,
} from '../controllers/contentCtrl.js';

const contentRouter = Router();

contentRouter.get('/products', checkAuthentication, getProducts);

contentRouter.get('/profile', checkAuthentication, getUserData);

contentRouter.get('/cart', checkAuthentication, getCart);

contentRouter.route('/cart/:id').post(addProductsToCart).delete(checkAuthentication, removeProduct);

contentRouter.get('/cart/buy', checkAuthentication, buyCart);

contentRouter.get('/cart/empty', checkAuthentication, emptyCart);

export default contentRouter;
