const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const patients_api_controller = require('../../controller/api/patients_api_controller'); 

console.log('API Pathents router loaded');

router.post('/register', passport.authenticate('jwt', {session:false}), patients_api_controller.register);
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patients_api_controller.create_report);

module.exports = router;