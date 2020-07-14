const express = require('express');
const router = express.Router();
const doctor_api_controller = require('../../controller/api/doctors_api_controller');

console.log('doctor API router loaded');

//---- routing to doctor registeration
router.post('/register', doctor_api_controller.register);

//---- routing to doctor login 
router.post('/login', doctor_api_controller.login);

module.exports = router;