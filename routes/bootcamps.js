const express = require('express');

// Init
const router = express.Router();

// Load controllers.
const {
  getBootcamps,
  getBootcampsRegex,
  getBootcampsRegexSelect,
} = require('../controllers/bootcamps');

// Load routes.
router.route('/').get(getBootcamps);
router.route('/regex').get(getBootcampsRegex);
router.route('/regex/select').get(getBootcampsRegexSelect);

module.exports = router;
