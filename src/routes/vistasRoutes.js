// vistasRoutes.js
const express = require('express');
const router = express.Router();
const vistasController = require('../controllers/vistasController');

router.get('/', vistasController.list);

module.exports = router;
