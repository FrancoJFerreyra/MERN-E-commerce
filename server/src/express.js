import express from 'express';
const { Router } = express;
import http from 'http';
import cors from 'cors';

import cluster from 'cluster';
import { cpus } from 'os';

import userRouter from './routers/user.routes.js';
import contentRouter from './routers/content.routes.js';
import adminRouter from './routers/admin.routes.js';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import passportFile from './business/passport.js';
import passport from 'passport';

import _loggerW from './config/winston.js';

import { config } from 'dotenv';
config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SET COOKIES
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cookieParser());
app.use(
	session({
		store: mongoStore.create({
			mongoUrl: `${process.env.DB}`,
			mongoOptions: advancedOptions,
		}),
		secret: 'shhhh',
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 600000,
		},
	})
);
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'DELETE'],
		credentials: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

//SET CLUSTER
const clusterMode = process.argv[2] == 'CLUSTER';
const numCPUs = cpus().length;

if (clusterMode && cluster.isPrimary) {
	_loggerW.info(`Num CPUs = ${numCPUs}`);
	_loggerW.info(`PID MASTER = ${process.pid}`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		_loggerW.info('Worker', worker.process.pid, 'died', new Date().toLocaleString());
		cluster.fork();
	});
} else {
	const PORT = process.env.PORT || 3000;

	app.use('/content', contentRouter);
	app.use('/user', userRouter);
	app.use('/admin', adminRouter);

	server.listen(PORT, () => {
		_loggerW.info(`Se inicio el server en el puerto: ${PORT}, PID = ${process.pid}`);
	});
	server.on('error', (error) => {
		_loggerW.error(error);
	});
}
