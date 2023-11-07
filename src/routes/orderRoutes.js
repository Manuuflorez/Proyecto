//orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta para mostrar la lista de órdenes
router.get('/', orderController.list);

// Ruta para mostrar el formulario de creación de órdenes
router.get('/create', orderController.create);

// Ruta para guardar una nueva orden
router.post('/', orderController.save);

// Ruta para eliminar una orden
router.get('/delete/:id', orderController.delete);

module.exports = router;
