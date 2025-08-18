const express = require('express');

const { InfoController } = require('../../controllers'); // By default from controller index.js is imported.
const emailRoutes = require('./email-router');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/tickets', emailRoutes)

module.exports = router;