require ('dotenv').config();

const express = require("express");
const path = require("path");
const cors = require ('cors');
const methodOverride = require('method-override');

const app = express();

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use(cors());

const productsApiRouter = require('./src/routers/products.js');;
const usersApiRouter= require('./src/routers/users.js')

// API routes
app.use ( '/products', productsApiRouter);
app.use ( '/users', usersApiRouter);

app.listen(process.env.PORT || 3040, () => {
    console.log("Servidor corriendo en el puerto 3040");
})


