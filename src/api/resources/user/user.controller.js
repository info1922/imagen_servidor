import userService from "./user.service";
import User, { USER_ROLE } from "./user.model";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { devConfig } from "../../../config/env/development";

/* jshint ignore:start */
export default {
    async signup(req, res) {

        try {

            // Mandamos el cuerpo de la peticion al servicio
            const { value, error } = userService.validateSignup(req.body);
            // console.log(req.body);
            // Verificamos si existe un error
            if (error) {
                console.error(error);
                return res.status(400).json({ mensaje: error });
            }

            const encryptPass = userService.encryptPassword(value.password);

            // Verificamos si ya esta registrado el correo
            const existeUser = await User.findOne({ 'local.email': value.email });
            if (existeUser) {
                return res.status(500).json({ mensaje: 'Ya existe un usuario con este correo' });
            }

            // console.log('Value: ', value);
            // const user = await User.create(value);
            const user = await new User();
            user.local.email = value.email;
            user.local.password = encryptPass;
            user.nombre = value.nombre;
            user.imagen = value.imagen;
            user.role = value.role || USER_ROLE;

            await user.save();


            return res.status(200).json({ mensaje: 'Usuario creado', user })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: error });
        }
    },

    async login(req, res) {
        try {

            // Mandamos el cuerpo de la peticion al servicio
            const { value, error } = userService.validateSignup(req.body);

            // Verificamos si existe un error
            if (error) {
                console.error(error);
                return res.status(400).json({ mensaje: error });
            }

            // Buscamos en el registro local
            const user = await User.findOne({ 'local.email': value.email });
            // console.log(user);

            if (!user) {
                return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
            }

            const matched = userService.comparePassword(value.password, user.local.password);

            if (!matched) {
                return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
            }

            // Generamos el token
            const token = jwt.sign({ id: user._id }, devConfig.secret, { expiresIn: '1d' });
            // console.log(token);
            return res.status(200).json({ user, token });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensaje: error });
        }
    },
    async test(req, res) {
        console.log(req);
        return res.json({ req: req.usuarioActual, mensaje: 'ok' });
    }
}