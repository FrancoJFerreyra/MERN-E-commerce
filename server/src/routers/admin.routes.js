import express from 'express';
import { checkAuthentication, checkAdmin } from '../controllers/middlewares.js';
import { adminAddProds, adminDeleteProd, adminUpdateProd } from '../controllers/adminCtrl.js';
const { Router } = express;
const adminRouter = Router();

adminRouter.post('/add_product', checkAuthentication, checkAdmin, adminAddProds);
adminRouter.delete('/delete_product/:id', checkAuthentication, checkAdmin, adminDeleteProd);
adminRouter.put('/update_product/:id', checkAuthentication, checkAdmin, adminUpdateProd);

export default adminRouter;
