import express from 'express';
import passport from 'passport';
import imagenController from './imagen.controller';
var fileUpload = require('express-fileupload');

export const imagenRouter = express.Router();
// const google = passport.authenticate('google', { failureRedirect: '/failure' });
imagenRouter.route('/').get(fileUpload(), imagenController.obtener);
imagenRouter.route('/cargar').post(passport.authenticate('jwt'), fileUpload(), imagenController.subir);