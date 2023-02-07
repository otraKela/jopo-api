const express = require("express");
const path = require("path");
const cors = require ('cors');

const app = express();

app.use(cors());

const productsApiRouter = require('./src/routers/products.js');;
const usersApiRouter= require('./src/routers/users.js')

// API routes
app.use ( '/products', productsApiRouter);
app.use ( '/users', usersApiRouter);

// app.use((req, res, next) =>{
//     res.status(404).render("notFound")
// })

app.listen(process.env.PORT || 3040, () => {
    console.log("Servidor corriendo en el puerto 3040");
})


