const express = require('express');
const router = express.Router();

console.log('API router loaded');

router.use('/doctor',require('./doctor'));


module.exports = router;