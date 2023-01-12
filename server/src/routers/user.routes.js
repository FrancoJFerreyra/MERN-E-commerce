import passport from 'passport';
import { postLogin, newUserRegister, logout } from '../controllers/login&registerCtrl.js';
import { checkAuthentication } from '../controllers/middlewares.js';
import express from 'express';
const { Router } = express;

const userRoutes = Router();

userRoutes.post('/login', passport.authenticate('login'), postLogin);

userRoutes.post('/register', newUserRegister);

userRoutes.get('/logout', checkAuthentication, logout);

export default userRoutes;
