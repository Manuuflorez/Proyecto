const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//Importando rutas
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/productRoutes');
const vistasRoutes = require('./routes/vistasRoutes');
const joinsRoutes = require('./routes/joinsRoutes');
const proceduresRoutes = require('./routes/proceduresRoutes');
const functionsRoutes = require('./routes/functionsRoutes')
const exp = require('constants');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares, peticiones que llegan antes de procesarlas
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'proyecto'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/vistas', vistasRoutes);
app.use('/joins', joinsRoutes);
app.use('/procedures', proceduresRoutes);
app.use('/functions', functionsRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando el server
app.listen(app.get('port'), () =>{
    console.log("Server on http://localhost:3000/");
});