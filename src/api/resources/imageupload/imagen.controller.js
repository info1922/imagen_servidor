var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());

import imagenModel from './imagen.model';
import { setTimeout } from 'timers';

/* jshint ignore:start */
export default {
    obtener(req, res) {
        return res.json({
            msg: 'Imagenes'
        });
    },
    async subir(req, res) {

        try {
            const body = req.body;
            let album = new imagenModel({
                nombre: body.nombre,
                imagen: body.imagen,
                usuario: req.usuarioActual._id
            });
            const losnombres = [];
            const imagenes = req.files;

            // Extenciones permitidas
            const extencionesValidadas = ['png', 'JPG', 'PNG', 'jpg', 'JPEG', 'jpeg'];

            if (imagenes['imagen'].length >= 2) {

                console.log('Numero de elementos: ', imagenes['imagen'].length);

                imagenes['imagen'].map((d) => {
                    // console.log('object', d);
                    const nombreO = d;
                    const nombreCortado = nombreO.name.split('.');
                    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

                    // Validar extención (-1 si no lo encuentra)
                    if (extencionesValidadas.indexOf(extencionArchivo) < 0) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Extención no valida',
                            errors: { messag: 'Las extenciones permitidas son: ' + extencionesValidadas.join(', ') }
                        });
                    }
                    // Personalizamos el nombre
                    let r = Math.random().toString(36).substring(7);
                    const nombreArchivo = `${r}-${new Date().getMilliseconds()}.${extencionArchivo}`;

                    const path = `./uploads/${nombreArchivo}`;
                    console.log(path);

                    // Mover el archivo a la carpeta
                    nombreO.mv(path, err => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                mensaje: 'Error al mover archivo',
                                errors: err
                            });
                        }
                    });

                    losnombres.push(nombreArchivo)
                });
                // console.log(losnombres);
                album.imagen = losnombres;
                // console.log(album);
                // const record = await album.save();
                // return res.status(200).json({ ok: true, record });
            } else {

                const archivo = req.files.imagen;
                const nombreCortado = archivo.name.split('.');
                const extencionArchivo = nombreCortado[nombreCortado.length - 1];

                // Validar extención (-1 si no lo encuentra)
                if (extencionesValidadas.indexOf(extencionArchivo) < 0) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Extención no valida',
                        errors: { messag: 'Las extenciones permitidas son: ' + extencionesValidadas.join(', ') }
                    });
                }

                // Personalizamos el nombre
                const nombreArchivo = `${new Date().getMilliseconds()}.${extencionArchivo}`;

                console.log(nombreArchivo);
                // Definir la carpeta
                const path = `./uploads/${nombreArchivo}`;

                // Mover el archivo a la carpeta
                archivo.mv(path, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al mover archivo',
                            errors: err
                        });
                    }
                });
                album.imagen = nombreArchivo;
            }
            // console.log(album);
            const record = await album.save();
            return res.status(200).json({ ok: true, record });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }

    }
};