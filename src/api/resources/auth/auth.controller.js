import jwt from 'jsonwebtoken';

import { devConfig } from '../../../config/env/development';

/* jshint ignore:start */
export default {

    async test(req, res) {
        console.log(req.usuarioActual);
        return res.json({ mensaje: 'ok' });
    },

    sendJWTToken(req, res) {
        console.log('Secret: ', devConfig.secret);
        const token = jwt.sign({ id: req.usuarioActual._id }, devConfig.secret, {
            expiresIn: '1d',
        });
        res.status(200).json({ mensaje: 'Google :D', token });
    },
    authenticate(req, res) {
        return res.send(true);
    },
    logout(req, res) {
        req.logout(); // remove the session and remove req.currentUser;
        return res.json({ success: true });
    },

};