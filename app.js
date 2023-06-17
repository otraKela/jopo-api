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

const whitelist = ['http://localhost:3000', 'https://jopo-react.netlify.app']

app.use(cors(whitelist));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos
  next();
});

const productsApiRouter = require('./src/routers/products.js');;
const usersApiRouter= require('./src/routers/users.js')

// API routes
app.use ( '/products', productsApiRouter);
app.use ( '/users', usersApiRouter);

currentPort = process.env.PORT || 3040;

app.listen(currentPort, () => {
    console.log("Servidor corriendo en el puerto " +  currentPort);
})


