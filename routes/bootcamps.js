const express = require('express');

// Init
const router = express.Router();

// Load controllers.
const { getBootcamps } = require('../controllers/bootcamps');

// Load routes.
router.route('/').get(getBootcamps);

module.exports = router;
