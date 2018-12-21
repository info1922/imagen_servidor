const express = require('express');
const bodyParser = require('body-parser');
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
// import session from ''
import { configureJWTStrategy } from './passport-jwt';
import User from '../api/resources/user/user.model';
import { devConfig } from '../config/env/development';


export const setGlobalMiddleware = (app) => {
    app.use(logger('dev'));
    app.use(passport.initialize());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // app.use(session({
    //     secret: devConfig.secret,
    //     resave: false,
    //     saveUninitialized: true
    // }));

    app.use(passport.initialize({ userProperty: 'usuarioActual' }));
    // app.use(passport.session());
    configureJWTStrategy();

    // req.session.user = {userId}
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // extract the userId from session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(null, user);
        });
    });

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
};