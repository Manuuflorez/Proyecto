// proceduresRoutes.js
const express = require('express');
const router = express.Router();
const proceduresController = require('../controllers/proceduresController');

// Ruta GET para mostrar la vista
router.get('/calculate-total', proceduresController.calculateTotal);
router.get('/detallesPedido', proceduresController.detallesPedido);
router.get('/', proceduresController.list);


module.exports = router;
