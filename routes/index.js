const express = require('express');
const router = express.Router();

console.log('router loaded');

//--- route to api
router.use('/api', require('./api'));

module.exports = router;