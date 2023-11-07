// functionsRouter.js
const express = require('express');
const router = express.Router();
const functionsController = require('../controllers/functionsController');

router.get('/', functionsController.list); 
router.get('/calculateTotal', functionsController.calculateTotal); 
router.get('/productoMasComprado', functionsController.productoMasComprado);

module.exports = router;
