// joinsRouter.js
const express = require('express');
const router = express.Router();
const joinsController = require('../controllers/joinsController');

router.get('/', joinsController.list);

module.exports = router;
