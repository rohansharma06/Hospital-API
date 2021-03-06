const express = require('express');
const router = express.Router();

console.log('API router loaded');

router.use('/doctor', require('./doctor'));
router.use('/patients', require('./patients'));
router.use('/reports', require('./reports'));

module.exports = router;