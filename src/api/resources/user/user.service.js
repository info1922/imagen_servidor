import Joi from 'joi';
import bcryptjs from 'bcryptjs';

export default {


    validateSignup(body) {

        // Validar los datos capturados
        const schema = Joi.object().keys({
            nombre: Joi.string().min(5),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,33}$/),
            role: Joi.number().integer(),
        });

        const { value, error } = Joi.validate(body, schema);

        if (error) {
            return { error };
        }
        return { value };
    },

    // Encriptar el password
    encryptPassword(text) {
        const salt = bcryptjs.genSaltSync(10);
        return bcryptjs.hashSync(text, salt);
    },

    // Compara password con password de la bd
    comparePassword(text, encryptedPass) {
        return bcryptjs.compareSync(text, encryptedPass);
    },

    validateLogin(body) {

        // Validar los datos capturados
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { value, error } = Joi.validate(body, schema);

        if (error) {
            return { error };
        }

        return { value };
    }
};