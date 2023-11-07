const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para mostrar la lista de productos
router.get('/', productController.list);

// Ruta para mostrar el formulario de creación de productos
router.get('/create', productController.create);

// Ruta para guardar un nuevo producto
router.post('/', productController.save);

// Ruta para mostrar el formulario de edición de un producto
router.get('/edit/:id', productController.edit);

// Ruta para actualizar un producto
router.post('/update/:id', productController.update);

// Ruta para eliminar un producto
router.get('/delete/:id', productController.delete);


module.exports = router;
