import express from "express";
import { checkAuthentication } from "../controllers/middlewares.js";
const { Router } = express;
const verifyAuth = Router();

verifyAuth.get("/", checkAuthentication, (req, res) => {
  res.status(200);
  res.end();
});

export default verifyAuth;
