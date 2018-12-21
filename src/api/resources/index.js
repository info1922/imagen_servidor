import express from 'express';
import { imagenRouter } from './imageupload/imagen.router';
import { userRouter } from './user/user.router';

export const restRouter = express.Router();
restRouter.use('/upload', imagenRouter);
restRouter.use('/users', userRouter);