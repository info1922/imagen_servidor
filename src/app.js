const express = require('express');
import mongoose from 'mongoose';

import { restRouter } from './api/resources';
import { devConfig } from './config/env/development';
import { setGlobalMiddleware } from './middlewares/global-middleware';
// Conección con la base de datos
/* jshint ignore:start */
async function coneccion() {
    await mongoose.connect(`mongodb://localhost:27017/${devConfig.database}`, { useNewUrlParser: true });
    console.log('Bd en linea');

}

coneccion().catch(error => console.log('Error al conectar la bd', error));

const app = express();
const PORT = devConfig.port;

// global middleware
setGlobalMiddleware(app);


var auto = ['azul', 'negro', 'amarillo', 'rojo'];

app.use('/api', restRouter);


// Route
app.get('/', (req, res) => {
    auto.map((d) => {
        console.log(d);
    });
    res.json({
        msg: 'Welcome to upload file'
    });
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});